import { createStore } from 'redux'
import { chat } from './chat-reducers'
import { addChatToStore } from './chat-controller'
import moment from 'moment';
//const firebase = require('firebase');
var markdown = require("markdown").markdown;
import '../../../../firebase/firebase-config';
import firebase from 'firebase';
import { getCurrentUserDetails } from '../../../../firebase/onboarding-db'

const store = createStore(chat);

// Log the initial state
//console.log('initial Value',store.getState())

let sentTo = 'Chaithu-123';
let userDisplayName = 'Chaithu-123';
let forChannel = false;

// getCurrentUserDetails().then((response) => {
//     console.log('userDetails', response);

// });

// Get Current User Details
let currentUser = firebase.auth().currentUser;
console.log(currentUser);
if (currentUser) {
    userDisplayName = currentUser.displayName;
}
else {
    userDisplayName = 'Sskeet'
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
    //renderChatHistory();

    console.log(sentTo);
    receiverRef = firebase.database().ref('team-6').child('channels').child(sentTo).child('messages');
    receiverRef.on('value', function (snapshot) {
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
    //renderChatHistory();
    let receiverRef = firebase.database().ref('team-6').child('directMessages').child('users').child(sentTo).child('messages');
    receiverRef.on('value', function (snapshot) {
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

// get Send Button
const btnSubmit = document.getElementById('enter');

// Click event of "Send" button for Chat
btnSubmit.addEventListener('click', evt => {
    const rawMessage = document.querySelector('#enteredCommand').value;
    for (let elem of document.getElementsByClassName('emojionearea-editor')) {
        elem.innerText = ' ';
    }
    const message = markdown.toHTML(rawMessage);
    const currentDateTime = Date.now();

    // Build the Message entity
    let msg = {};
    msg.messageText = message;
    msg.date = currentDateTime;
    msg.sentTo = sentTo;
    msg.sentBy = userDisplayName;

    // If message is sent to a Channel, store message only under the Channel
    if (forChannel) {
        receiverRef = firebase.database().ref('team-6').child('channels').child(sentTo).child('messages');

        // push Message to DB
        receiverRef.push(msg);

        // Render the Messages
        receiverRef.on('value', function (snapshot) {
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
    else { // If it's Direct Messages, store message under both the Sender and Receiver nodes
        senderRef = firebase.database().ref('team-6').child('directMessages').child('users').child(userDisplayName).child('messages');
        receiverRef = firebase.database().ref('team-6').child('directMessages').child('users').child(sentTo).child('messages');
        senderRef.push(msg);
        receiverRef.push(msg);

        // Render the Messages
        receiverRef.on('value', function (snapshot) {
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

    // push a copy of the message to "Messages" collection on DB
    let messagesRef = firebase.database().ref('messages');
    messagesRef.push(msg);

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName, sentTo));
});

// get the Initial data from the Chat
database.ref('messages').once('value', dataSnapshot => {
    let stateArray = [];
    dataSnapshot.forEach(childSnapshot => {
        let chatInstance = {};
        chatInstance.messageText = childSnapshot.val().messageText;
        chatInstance.date = childSnapshot.val().date;
        chatInstance.sentBy = childSnapshot.val().sentBy;
        chatInstance.sentTo = childSnapshot.val().sentTo;
        stateArray.push(chatInstance);
    });

    console.log(stateArray);
    //state = createStore(chat, stateArray)
    //console.log('State After populating', state.getState());
});

// Render Chat history using subscribe method
store.subscribe(() => {
    console.log(store.getState());
});

// function to pull messages from State and Render them
// function renderChatHistory() {
//     console.log(store.getState());
//     console.log('in subscribe method');

//     // Clear the HTML content
//     document.getElementById('messageBody').innerHTML = '';

//     // Get all the Messages and display relevant ones
//     const messages = store.getState();
//     for (let message of messages) {
//         if (forChannel) {
//             if (message.sentTo === sentTo) {
//                 renderMessage(message);
//             }
//         }
//         else { // Direct Messages
//             if ((message.sentBy === sentTo || message.sentTo === sentTo) &&
//                 (message.sentBy === userDisplayName || message.sentTo === userDisplayName)) {
//                 renderMessage(message);
//             }
//         }
//     }
// }

// function renderMessage(message) {
//     const paraElement = document.createElement('p');
//     const formattedTime = moment(message.date).fromNow();
//     paraElement.innerHTML = `<strong>${message.sentBy}</strong> - ${formattedTime}<br>
//                                         ${message.messageText}`;
//     let chatBox = document.getElementById('messageBody');
//     chatBox.appendChild(paraElement);
// }