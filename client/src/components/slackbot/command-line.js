import { recastAPIservice } from './recastai/recastAPI-service';
import { createRepository, createRepositoryIssue } from './gitbot/gitbot-controller';
import { createReminder } from './reminder/reminder-controller';
import { createTodolistTask } from './todolist/todolist-controller';
import { createCalendarEvent } from './calendar/calendar-controller';
import { createOtherbot } from './otherbot/otherbot-controller';

export const hitEnter = function (e) {
  if (e.keyCode === 13) { // checks whether the pressed key is "Enter"
  // calling recast api
    recastAPIservice(e.target.value).then((recastResponse) => {
      console.log(`command-line-cotroller.js  recastResponse slug= ${recastResponse.intents[0].slug}`);
      const currentdate = new Date();
      const creatDate = `${currentdate.getDate()}/${
        currentdate.getMonth() + 1}/${
        currentdate.getFullYear()}`;
      const creatTime = `${
        currentdate.getHours()}:${
        currentdate.getMinutes()}:${
        currentdate.getSeconds()}`;
      if (recastResponse.intents[0].slug === 'create-git-repo') {
        const widgetData = {
          id: '2',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          repositoryName: recastResponse.entities.git_repo[0].value,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };

        // save createRepository widget state to database code --> calling gitbot-controller
        createRepository(widgetData);
      }
      if (recastResponse.intents[0].slug === 'create-git-issue') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          repositoryName: recastResponse.entities.git_repo[0].value,
          issueName: recastResponse.entities.git_issue[0].value,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };
        // save createIssue widget state to database code --> calling gitbot-controller
        createRepositoryIssue(widgetData);
      }
      if (recastResponse.intents[0].slug === 'reminder') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          reminderTime: recastResponse.entities.time[0].value,
          reminderDate: recastResponse.entities.date[0].value,
          remindeeUser: recastResponse.entities.user[0].raw,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };
        // save reminder widget state to database code --> calling todolist-controller
        createReminder(widgetData);
      }
      if (recastResponse.intents[0].slug === 'todolist') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          task: recastResponse.entities.taskname[0].value,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };
        // save to-do-list widget state to database code --> calling todolist-controller
        createTodolistTask(widgetData);
      }
      if (recastResponse.intents[0].slug === 'calendar-schedule') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          calendarEvent: recastResponse.entities.calendarevent[0].value,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };
        // save calendar-schedule widget state to database code --> calling calendar-controller
        createCalendarEvent(widgetData);
      }
      if (recastResponse.intents[0].slug === 'otherbot') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          widgetName: recastResponse.intents[0].slug,
          channelName: recastResponse.entities.channelname[0].raw,
          targetUser: recastResponse.entities.user[0].value,
          userId: '',
          creatDate,
          creatTime,
          botResponse: '',
        };
        // save calendar-schedule widget state to database code --> calling calendar-controller
        createOtherbot(widgetData);
      }
    }).catch((err) => {
      console.log(err, 'error in command-line-controller.js ...');
    });
  }
};
