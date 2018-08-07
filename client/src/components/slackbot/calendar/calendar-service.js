const firebase = require('firebase');

// function to save calendar event into firebase database -- firebase
export const createCalendarEventService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = firebase.database().ref('SlackXT/slackbot/calendar').push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    calendarEvent: widgetData.calendarEvent,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
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
  updates[`SlackXT/slackbot/calendar/${updateCollectionKey}`] = widgetData;
  return firebase.database().ref().update(updates);
};
