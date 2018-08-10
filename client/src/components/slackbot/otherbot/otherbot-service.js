const firebase = require('firebase');
import database from '../../../../../firebase/firebase';

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

  if (collectionKey !== '') {
    widgetData.id = collectionKey;
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

// function to get all team list from firebase database -- firebase
export const getAllTeamsService = () => new Promise((resolve, reject) => {
  database.ref('teams').once('value')
  .then((snapshot) => {
    const teamListData = snapshot.val();
    if (teamListData !== '') {
      resolve(teamListData);
    } else {
      reject(new Error(`Error occured while retrieving all team list from firebase database.`));
      console.log('There is error while retrieving all team list from firebase database...');
    }
  });
});
