import { createStore } from 'redux'
import { chat } from './chat-reducers'
import { addChatToStore } from './chat-controller'
import moment from 'moment';
//const firebase = require('firebase');
var markdown = require("markdown").markdown;
import '../../../../firebase/firebase-config';
import firebase from 'firebase';

const store = createStore(chat)

// Log the initial state
console.log(store.getState())

let sentTo = 'chn001';
let userDisplayName = 'Anil Kumar';
let forChannel = false;

// get Elements
const btnSubmit = document.getElementById('enter');
var ref = firebase.database().ref().child('messages').limitToLast(5);

let currentUser = firebase.auth().currentUser;
console.log(currentUser);
if (currentUser) {
    userDisplayName = currentUser.displayName;
}
else {
    userDisplayName = 'Anil Kumar'
}
// Get a reference to the database service
var database = firebase.database();
let receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);

export function clickChannel(e) {
    console.log('channel clicked');
    forChannel = true;
    console.log(e.target.id);
    sentTo = e.target.id;
    alert('with in clickChannel function');
    console.log(sentTo);
    receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);
    receiverRef.once('value', function (snapshot) {
        let chatBox = document.getElementById('messageBody');
        console.log(snapshot.val());
        chatBox.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            console.log(childData);
            if (childData.sentTo === sentTo) {
                const paraElement = document.createElement('p');
                paraElement.innerHTML = `<strong>${childData.sentBy}</strong> - ${childData.date}<br>
                                          ${childData.messageText}`;
                chatBox.appendChild(paraElement);
            }
        });
    });
  }

btnSubmit.addEventListener('click', evt => {
    const rawMessage = document.querySelector('#enteredCommand').value;
    for (let elem of document.getElementsByClassName('emojionearea-editor')) {
        elem.innerText = ' ';
    }
    const message = markdown.toHTML(rawMessage);
    const currentDateTime = Date.now();
    
    if(forChannel){
        receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);

        receiverRef.push({
            messageText: message,
            date: currentDateTime,
            sentTo: sentTo,
            sentBy: userDisplayName
        });
    }

    // firebase.database().ref('messages').push({
    //     messageText: message,
    //     date: currentDateTime,
    //     sentBy: userDisplayName
    // });

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName));
});

receiverRef.on('child_added', function (dataSnapshot) {
    console.log("DataSnapshot", dataSnapshot.val());
    const paraElement = document.createElement('p');
    const formattedTime = moment(dataSnapshot.val().date).fromNow();
    paraElement.innerHTML = `<strong>${dataSnapshot.val().sentBy}</strong> - ${formattedTime}<br>
                                ${dataSnapshot.val().messageText}`;
    document.getElementById('messageBody').appendChild(paraElement);
})

// get the Initial data from the Chat
database.ref().child('messages').once('value', dataSnapshot => {
    let state = [];
    dataSnapshot.forEach(childSnapshot => {
        let chatInstance = {};
        chatInstance.messageText = childSnapshot.val().messageText;
        chatInstance.date = childSnapshot.val().date;
        chatInstance.sentBy = childSnapshot.val().sentBy;
        state.push(chatInstance);
    });

    //console.log(state);
});

store.subscribe(() => {
    //console.log(store.getState());
    console.log('in subscribe method');

});