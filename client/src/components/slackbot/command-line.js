import { recastAPIservice } from './recastai/recastAPI-service';
import { createRepository, createRepositoryIssue } from './gitbot/gitbot-controller';
import { createReminder } from './reminder/reminder-controller';
import { createTodolistTask, openTodolist } from './todolist/todolist-controller';
import { createCalendarEvent } from './calendar/calendar-controller';
import { createOtherbot } from './otherbot/otherbot-controller';
import { openReminder } from './reminder/reminder-controller';
import { openCalendar } from './calendar/calendar-controller';
import { botDonotHaveAnswer } from './todolist/todolist-view';

export const hitEnter = function (e) {
  // calling recast api
    recastAPIservice(e).then((recastResponse) => {
      const user = JSON.parse(window.localStorage.getItem("current_user"));
      const currentdateTime = new Date();
      const creatDate = `${currentdateTime.getDate()}/${
        currentdateTime.getMonth() + 1}/${
        currentdateTime.getFullYear()}`;
      const creatTime = `${
        currentdateTime.getHours()}:${
        currentdateTime.getMinutes()}:${
        currentdateTime.getSeconds()}`;
      if(recastResponse.intents.length > 0){
        if (recastResponse.intents[0].slug === 'create-git-repo') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            repositoryName: recastResponse.entities.git_repo[0].value,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
          };

          // save createRepository widget state to database code --> calling gitbot-controller
          createRepository(widgetData);
        }
        if (recastResponse.intents[0].slug === 'create-git-issue') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            repositoryName: recastResponse.entities.git_repo[0].value,
            issueName: recastResponse.entities.git_issue[0].value,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
          };
          // save createIssue widget state to database code --> calling gitbot-controller
          createRepositoryIssue(widgetData);
        }
        if (recastResponse.intents[0].slug === 'reminder') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            reminderTime: recastResponse.entities.time[0].value,
            reminderDate: recastResponse.entities.date[0].value,
            remindeeUser: recastResponse.entities.user[0].raw,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
            reminderSent: 'No',
          };
          // save reminder widget state to database code --> calling todolist-controller
          createReminder(widgetData);
        }
        if (recastResponse.intents[0].slug === 'todolist') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            task: recastResponse.entities.taskname[0].value,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
            taskCompleted: 'unchecked',
          };
          // save to-do-list widget state to database code --> calling todolist-controller
          createTodolistTask(widgetData);
        }
        if (recastResponse.intents[0].slug === 'calendar-schedule') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            calendarEvent: recastResponse.entities.calendarevent[0].value,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
          };
          // save calendar-schedule widget state to database code --> calling calendar-controller
          createCalendarEvent(widgetData);
        }
        if (recastResponse.intents[0].slug === 'otherbot') {
          const widgetData = {
            id: '',
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            channelName: recastResponse.entities.channelname[0].raw,
            targetUser: recastResponse.entities.mail[0].value,
            userId: user.user.userName,
            creatDate: creatDate,
            creatTime: creatTime,
            currentdateTime: currentdateTime.toString(),
            botResponse: '',
          };
          // save calendar-schedule widget state to database code --> calling calendar-controller
          createOtherbot(widgetData);
        }
        if (recastResponse.intents[0].slug === 'open-todolist') {
          const openWidgetType = {
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            userId: user.user.userName,
          };
          // open todolist modal --> calling todolist-controller
          openTodolist(openWidgetType);
        }
        if (recastResponse.intents[0].slug === 'open-reminder') {
          const openWidgetType = {
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            userId: user.user.userName,
          };
          // open reminder modal --> calling reminder-controller
          openReminder(openWidgetType);
        }
        if (recastResponse.intents[0].slug === 'open-calendar') {
          const openWidgetType = {
            commandEntered: e,
            widgetName: recastResponse.intents[0].slug,
            userId: user.user.userName,
          };
          // open calendar modal --> calling reminder-controller
          openCalendar(openWidgetType);
        }
        // if non of the conditions matched
        else {
          const createWidgetEle = document.getElementById('messageBody');
          const newRepowidget = document.createElement('div');
          newRepowidget.innerHTML = botDonotHaveAnswer(e,        
          `I did not get, please use diffetent sentence. Or search on Google`);
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
        }
      } else {
        const createWidgetEle = document.getElementById('messageBody');
          const newRepowidget = document.createElement('div');
          newRepowidget.innerHTML = botDonotHaveAnswer(e,        
          `I did not get, please use diffetent sentence.`, `Click Here to find on Google`);
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      }
    }).catch((err) => {
      console.log(err, 'error in command-line-controller.js ...');
    });
};
