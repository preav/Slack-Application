import firebase from 'firebase';

/*const config = {
  apiKey: 'AIzaSyCCGyDmn1eBE-kJdy3uJ9m5Zui6I06YyBo',
  authDomain: 'slackxt-notifications.firebaseapp.com',
  databaseURL: 'https://slackxt-notifications.firebaseio.com',
  projectId: 'slackxt-notifications',
  storageBucket: 'slackxt-notifications.appspot.com',
  messagingSenderId: '226487853474',
};*/
var config = {
  apiKey: "AIzaSyAJ-x46vf7le3_76owE2KkNYDneQLwx2xA",
  authDomain: "slackcollaboration-fa323.firebaseapp.com",
  databaseURL: "https://slackcollaboration-fa323.firebaseio.com",
  projectId: "slackcollaboration-fa323",
  storageBucket: "slackcollaboration-fa323.appspot.com",
  messagingSenderId: "906342147667"
};
firebase.initializeApp(config);
const database = firebase.database();


export default database;
