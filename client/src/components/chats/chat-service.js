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

let sentTo = 'userID_triveni';
let userDisplayName = 'userID_saket';
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
    userDisplayName = 'userID_saket'
}

// Get a reference to the database service
var database = firebase.database();
let receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);
let senderRef = null;

// Following function is called when a Channel is clicked upon to retrieve the Messages
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
                const formattedTime = moment(childData.date).fromNow();
                paraElement.innerHTML = `<strong>${childData.sentBy}</strong> - ${formattedTime}<br>
                                          ${childData.messageText}`;
                chatBox.appendChild(paraElement);
            }
        });
    });
}

export function clickUser(e) {
    sentTo = e.target.id;
    console.log(sentTo);
    let receiverRef = firebase.database().ref('team-6').child('directMessages').child('users').child(userDisplayName).child('messages');
    receiverRef.once('value', function (snapshot) {
        let chatBox = document.getElementById('messageBody');
        console.log(snapshot.val());
        chatBox.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            console.log(childData);
            if ((childData.sentBy === sentTo || childData.sentTo === sentTo) &&
                (childData.sentBy === userDisplayName || childData.sentTo === userDisplayName)) {
                const paraElement = document.createElement('p');
                const formattedTime = moment(childSnapshot.val().date).fromNow();
                paraElement.innerHTML = `<strong>${childSnapshot.val().sentBy}</strong> - ${formattedTime}<br>
                                        ${childSnapshot.val().messageText}`;
                chatBox.appendChild(paraElement);
            }
        });
    });
}

// Click event of "Send" button for Chat
btnSubmit.addEventListener('click', evt => {
    const rawMessage = document.querySelector('#enteredCommand').value;
    for (let elem of document.getElementsByClassName('emojionearea-editor')) {
        elem.innerText = ' ';
    }
    const message = markdown.toHTML(rawMessage);
    const currentDateTime = Date.now();

    // If message is sent to a Channel, store message only under the Channel
    if (forChannel) {
        receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);

        receiverRef.push({
            messageText: message,
            date: currentDateTime,
            sentTo: sentTo,
            sentBy: userDisplayName
        });
    }
    else { // If it's Direct Messages, store message under both the Sender and Receiver nodes
        senderRef = firebase.database().ref('team-6').child('directMessages').child('users').child(userDisplayName).child('messages');
        receiverRef = firebase.database().ref('team-6').child('directMessages').child('users').child(sentTo).child('messages');

        senderRef.push({
            messageText: message,
            date: currentDateTime,
            sentTo: sentTo,
            sentBy: userDisplayName
        });

        receiverRef.push({
            messageText: message,
            date: currentDateTime,
            sentTo: sentTo,
            sentBy: userDisplayName
        });
    }

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName, sentTo));
});

// Function to build the converstions when page loads
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
    console.log(store.getState());
    console.log('in subscribe method');
    document.getElementById('messageBody').innerHTML = '';
    const messages = store.getState();
    for (let message of messages) {
        const paraElement = document.createElement('p');
        const formattedTime = moment(message.date).fromNow();
        paraElement.innerHTML = `<strong>${message.sentBy}</strong> - ${formattedTime}<br>
                                ${message.messageText}`;
        document.getElementById('messageBody').appendChild(paraElement);
    }
});