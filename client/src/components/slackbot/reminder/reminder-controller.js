import { updateSlackBotReminderResponse, createReminderService } from './reminder-service';
import { createReminderResponse, showErrorMsg } from './reminder-view';

// function to create reminder
export const createReminder = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service function to create repository in github
  createReminderService(widgetData).then((firebaseRemindRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseRemindRes.id !== '') {
      errorOrSuccDiv.innerHTML = showErrorMsg(`Repository (${widgetData.repositoryName}) 
        already exists on your account.`, widgetData.postedOn, widgetData.commandEntered);
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
    } else {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = createReminderResponse(widgetData.repositoryName,
        widgetData.id, widgetData.postedOn, widgetData.commandEntered);
      createRepoWidgetEle.appendChild(newRepowidget);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      // update firebase database with slackbot response for reminder
      updateSlackBotReminderResponse(widgetData,
        `Slack has created repository (${widgetData.repositoryName}) in your github account`);
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating reminder in firebase database..');
  });
};
