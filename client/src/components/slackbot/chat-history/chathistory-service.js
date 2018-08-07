import { config } from '../../../../../firebase/firebase';

const firebase = require('firebase');

// firebase.initializeApp(config);

// function to retrieve chat history for a user from firebase database -- firebase
export const getChatHistoryForUserService = userId => new Promise((resolve, reject) => {
  firebase.database().ref(`SlackXT/slackbot/${userId}`).once('value')
  .then((snapshot) => {
    const chathistory = snapshot.val();
    if (chathistory !== '') {
      console.log('chat history retrieved successfully...', chathistory);
      resolve(chathistory);
    } else {
      reject(new Error(`Error while retrieving chat history for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving chat history from firebase database...');
    }
  });
});
