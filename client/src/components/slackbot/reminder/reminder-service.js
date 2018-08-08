const firebase = require('firebase');
import { database } from '../../../../../firebase/firebase';

// firebase.initializeApp(config);
// function to savereminder data into firebase database -- firebase
export const createReminderService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = database.ref(`SlackXT/slackbot/${widgetData.userId}/reminder`).push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    reminderTime: widgetData.reminderTime,
    reminderDate: widgetData.reminderDate,
    remindeeUser: widgetData.remindeeUser,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    currentdateTime: widgetData.currentdateTime,
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

// function to update slack response for reminder to firebase database -- firebase
export const updateSlackBotReminderResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/reminder/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);
};

// function to get user's reminder list from firebase database -- firebase
export const getReminderForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}/reminder`).once('value')
  .then((snapshot) => {
    const reminderListData = snapshot.val();
    if (reminderListData !== '') {
      console.log('reminder list retrieved successfully...', reminderListData);
      resolve(reminderListData);
    } else {
      reject(new Error(`Error occured while retrieving reminder list for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving reminder list from firebase database...');
    }
  });
});
