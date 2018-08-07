import { updateSlackBotReminderResponse, createReminderService } from './reminder-service';
import { reminderCreateMsg } from './reminder-view';

// function to create reminder
export const createReminder = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service function to create reminder in firebase database
  createReminderService(widgetData).then((firebaseRemindRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseRemindRes.id !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = reminderCreateMsg(
        `Sure, I will remind (<a href='#'>${widgetData.remindeeUser}</a>)
         at ${widgetData.reminderDate} ${widgetData.reminderTime}`,
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createRepoWidgetEle.appendChild(newRepowidget);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      // update firebase database with slackbot response for reminder
      updateSlackBotReminderResponse(widgetData,
        `Sure I will remind (${widgetData.remindeeUser}) 
      at ${widgetData.reminderDate} ${widgetData.reminderTime}`);
    } else {
      errorOrSuccDiv.innerHTML = reminderCreateMsg('Reminder cannot be set due to technical issue.',
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered);
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      // update firebase database with slackbot response for reminder
      updateSlackBotReminderResponse(widgetData,
        'Reminder cannot be set due to technical issue.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating reminder in firebase database..');
  });
};
