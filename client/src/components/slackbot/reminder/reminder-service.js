import { config } from '../../../../../firebase/firebase';

const firebase = require('firebase');

firebase.initializeApp(config);
// function to savereminder data into firebase database -- firebase
export const createReminderService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = firebase.database().ref('SlackXT/slackbot/reminder').push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    reminderTime: widgetData.reminderTime,
    reminderDate: widgetData.reminderDate,
    remindeeUser: widgetData.remindeeUser,
    userId: widgetData.userId,
    postedOn: widgetData.postedOn,
    botResponse: widgetData.botResponse,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    console.log('reminder saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});
