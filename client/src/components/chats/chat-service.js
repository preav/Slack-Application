import { createStore } from 'redux'
import { chat } from './chat-reducers'
import { addChatToStore } from './chat-controller'
import moment from 'moment';
const firebase = require('firebase');
var markdown = require("markdown").markdown;

const store = createStore(chat)

// Log the initial state
console.log(store.getState())

// get Elements
const btnSubmit = document.getElementById('enter');
var ref = firebase.database().ref().child('messages').limitToLast(5);

// Get a reference to the database service
var database = firebase.database();

btnSubmit.addEventListener('click', evt => {
    const rawMessage = document.querySelector('#enteredCommand').value;
    for (let elem of document.getElementsByClassName('emojionearea-editor')) {
        elem.innerText = ' ';
    }
    const message = markdown.toHTML(rawMessage);
    const currentDateTime = Date.now();
    let userDisplayName = 'Anil Kumar';
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
        userDisplayName = currentUser.displayName;
    }

    firebase.database().ref('messages').push({
        messageText: message,
        date: currentDateTime,
        sentBy: userDisplayName
    });

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName));
});

ref.on('child_added', function (dataSnapshot) {
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

    console.log(state);
});

store.subscribe(() => {
    console.log(store.getState());
    console.log('in subscribe method');

});