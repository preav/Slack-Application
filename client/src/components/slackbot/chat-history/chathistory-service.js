import database from '../../../../../firebase/firebase';

const firebase = require('firebase');

//firebase.initializeApp(config);

// function to retrieve chat history for a user from firebase database -- firebase
export const getChatHistoryForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}`).once('value')
  .then((snapshot) => {
    const chathistory = snapshot.val();
    if (chathistory !== '') {
      resolve(chathistory);
    } else {
      reject(new Error(`Error while retrieving chat history for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving chat history from firebase database...');
    }
  });
});

// function to retrieve Reminder List for a user from firebase database -- firebase
export const getReminderForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}/remindersent`).once('value')
  .then((snapshot) => {
    const userReminderList = snapshot.val();
    if (userReminderList !== '') {
      resolve(userReminderList);
    } else {
      reject(new Error(`Error while retrieving Reminder List for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving user Reminder List from firebase database...');
    }
  });
});

