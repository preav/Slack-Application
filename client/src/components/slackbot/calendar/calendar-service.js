import { database } from '../../../../../firebase/firebase';
const firebase = require('firebase');

// function to save calendar event into firebase database -- firebase
export const createCalendarEventService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = database
  .ref(`SlackXT/slackbot/${widgetData.userId}/calendar`).push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    calendarEvent: widgetData.calendarEvent,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    currentdateTime: widgetData.currentdateTime,
    botResponse: widgetData.botResponse,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    console.log('calendar event saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});

// function to update slack response for calendar event to firebase database -- firebase
export const updateSlackBotCalendarResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/calendar/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);
};

// function to get user's calendar list from firebase database -- firebase
export const getCalendarForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}/calendar`).once('value')
  .then((snapshot) => {
    const calendarListData = snapshot.val();
    if (calendarListData !== '') {
      console.log('calendar list retrieved successfully...', calendarListData);
      resolve(calendarListData);
    } else {
      reject(new Error(`Error occured while retrieving calendar list for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving calendar list from firebase database...');
    }
  });
});