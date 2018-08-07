import { database } from '../../../../../firebase/firebase';
const firebase = require('firebase');

// function to save otherbot into firebase database -- firebase
export const createOtherbotService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = database.ref(`SlackXT/slackbot/${widgetData.userId}/otherbot`).push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    channelName: widgetData.channelName,
    targetUser: widgetData.targetUser,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    currentdateTime: widgetData.currentdateTime,
    botResponse: widgetData.botResponse,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    console.log('otherbot saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});

// function to update slack response for otherbot to firebase database -- firebase
export const updateSlackBotOtherbotResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/otherbot/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);
};
