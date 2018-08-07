import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyAJ-x46vf7le3_76owE2KkNYDneQLwx2xA",
    authDomain: "slackcollaboration-fa323.firebaseapp.com",
    databaseURL: "https://slackcollaboration-fa323.firebaseio.com",
    projectId: "slackcollaboration-fa323",
    storageBucket: "slackcollaboration-fa323.appspot.com",
    messagingSenderId: "906342147667"
};
firebase.initializeApp(config);

export default config;
