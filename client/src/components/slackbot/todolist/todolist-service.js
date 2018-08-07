const firebase = require('firebase');

// function to save to-do-list task data into firebase database -- firebase
export const createTodolistService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = firebase.database().ref('SlackXT/slackbot/todolist').push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    task: widgetData.task,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    botResponse: widgetData.botResponse,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    console.log('to-do-list task saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});

// function to update slack response for to-do-list task to firebase database -- firebase
export const updateSlackBotTodolistResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/todolist/${updateCollectionKey}`] = widgetData;
  return firebase.database().ref().update(updates);
};
