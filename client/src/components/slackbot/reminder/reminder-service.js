const firebase = require('firebase');
import database from '../../../../../firebase/firebase';

// firebase.initializeApp(config);
// function to save reminder data into firebase database -- firebase
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
    reminderSent: widgetData.reminderSent,
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

// function to get reminders list for an user from firebase database -- firebase
export const getReminderForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}/reminder`).once('value')
  .then((snapshot) => {
    const userReminderListData = snapshot.val();
    if (userReminderListData !== '') {
      console.log('reminder list retrieved successfully...', userReminderListData);
      resolve(userReminderListData);
    } else {
      reject(new Error(`Error occured while retrieving reminder list for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving reminder list from firebase database...');
    }
  });
});

// function to get all reminders list from firebase database -- firebase
export const getReminderForAllUsersService = () => new Promise((resolve, reject) => {
  database.ref('SlackXT/slackbot').once('value')
  .then((snapshot) => {
    const reminderListData = snapshot.val();
    if (reminderListData !== '') {
      resolve(reminderListData);
    } else {
      reject(new Error(`Error occured while retrieving all reminder list from firebase database.`));
      console.log('There is error while retrieving all reminder list from firebase database...');
    }
  });
});


// function to save reminder data into firebase database -- firebase
export const saveReminderSent = widgetData => new Promise((resolve, reject) => {
  const currentdateTime = new Date().toString();

  let widgetDataTemp = {
    botResponse:widgetData.botResponse,
    commandEntered: widgetData.commandEntered,
    currentdateTime: currentdateTime,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    id: widgetData.id,
    remindeeUser: widgetData.remindeeUser,
    reminderDate:widgetData.reminderDate,
    reminderTime:widgetData.reminderTime,
    userId: widgetData.userId,
    widgetName:"remindersent",
}

  const collectionKey = 
  database.ref(`SlackXT/slackbot/${widgetDataTemp.userId}/remindersent`).push(widgetDataTemp).getKey();

  const updateCollectionKey = widgetData.id;
  widgetData.reminderSent = 'Yes';
  
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/reminder/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    //widgetData.currentdateTime = new Date();
    console.log('reminder saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});