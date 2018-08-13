import { createStore } from 'redux'
import moment from 'moment';
import { markdown } from 'markdown'
import firebase from 'firebase';
import { chat } from './chat-reducers'
import { addChatToStore } from './chat-controller'
import '../../../../firebase/firebase-config';
import { sendDesktopNotification } from '../notifications/notification-main'

var dropbox = require('dropbox').Dropbox;

// Following function is called when
// A Channel is clicked upon to retrieve the Messages, and to initiate a Chat with the Channel
export function openChatDetailsForChannel(channelId, teamID) {
    teamId = teamID;
    forChannel = true;
    sentToUserName = channelId;

    receiverRef = firebase.database().ref(`teams/${teamId}/channels/${sentToUserName}/messages`);
    receiverRef.on('value', snapshot => {
        let chatBox = document.getElementById('messageBody');
        chatBox.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().sentToUserName === sentToUserName) {
                renderMessage(childSnapshot, chatBox);
            }
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

export function openChatDetailsForUser(userId, teamID) {
    teamId = teamID;
    sentToUserName = userId;
    forChannel = false;
    let receiverRef = firebase.database().ref(`teams/${teamID}/directMessages/users/${sentToUserName}/messages`);
    receiverRef.on('value', function(snapshot) {
        let chatBox = document.getElementById('messageBody');
        chatBox.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            let childData = childSnapshot.val();
            if ((childData.sentByUserName === sentToUserName || childData.sentToUserName === sentToUserName) &&
                (childData.sentByUserName === userName || childData.sentToUserName === userName)) {
                renderMessage(childSnapshot, chatBox);
                // console.log(childData)
                if (childSnapshot.val().sentByUserName !== userName) {
                    var msgInfo = {
                        "messageText": childSnapshot.val().messageText,
                        "sentByDisplayName": childData.sentByUserName
                    };
                    sendDesktopNotification(msgInfo);
                }
            }

        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

export function sendMessage(evt) {
    // Validate the input Message
    const rawMessage = $('#enteredCommand').data("emojioneArea").getText();
    if (!validateInputs(rawMessage)) {
        return;
    }

    $('#enteredCommand').data("emojioneArea").setText("");
    const getMessage = markdown.toHTML(rawMessage);
    if ((getMessage.indexOf('<p>') > -1) && (getMessage.indexOf('</p>') > -1)) {
        var message = getMessage.substring(3, getMessage.length - 4);
    } else var message = getMessage;
    const currentDateTime = Date.now();
    // Build the Message entity
    let msg = buildMessageEntity(message);
    // If message is sent to a Channel, store message only under the Channel
    if (forChannel) {
        pushMessagesForChannel(msg);
    } else { // If it's Direct Messages, store message under both the Sender and Receiver nodes
        pushMessagesForUser(msg);


    }

    // push a copy of the message to "Messages" collection on DB
    let messagesRef = firebase.database().ref('messages');
    messagesRef.push(msg);
    //sendDesktopNotification(msg)

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userName, sentToUserName, userDisplayName));
}

//creating Store
const store = createStore(chat);

//event listeners
document.getElementById('addMedia').addEventListener('click', getFile);
// document.getElementById('enter').addEventListener('click', sendMessage);

// Log the initial state
// console.log('initial Value',store.getState())
let sentToUserName = ''; // github username, eg. anilkumar-bv
let userName = ''; // github username
let userDisplayName = ''; // github Name
let forChannel = false;
let receiverRef = null;
let senderRef = null;
let teamId = '';

// Get Current User Details
let currentUser = window.localStorage.getItem("current_user");
if (currentUser && currentUser != 'null' && currentUser.user !== 'undefined') {
    userName = JSON.parse(currentUser).user.userName;
    getDisplayNameFrom(userName);
}

// Function to retrieve User Display Name from Login User Name
function getDisplayNameFrom(userNameInput) {
    // get the User Display Name from userName
    const usersDbRef = firebase.database().ref('users');
    usersDbRef.once('value', (dataSnapshot) => {
        dataSnapshot.forEach(childSnapshot => {
            if (childSnapshot.val().username === userNameInput) {
                // Check if name field is available. If not, return the userName itself
                if (childSnapshot.val().name == null) {
                    userDisplayName = userNameInput;
                } else {
                    userDisplayName = childSnapshot.val().name;
                }
            }
        });
    })
}

// function to validate input Message and check if Sender is set
function validateInputs(inputMessage) {
    // Check if a User is selected to Chat with
    if (sentToUserName === '') {
        alert('Please select a User to Chat with');
        return false;
    }

    // Check if empty Text is being sent
    if (inputMessage.trim() === '') {
        alert('Please provide input text for Chat');
        return false;
    }
    return true;
}

// Function to build Message Entity
function buildMessageEntity(message) {
    let msg = {};
    msg.messageText = message;
    msg.date = Date.now();
    msg.sentToUserName = sentToUserName;
    msg.sentByUserName = userName;
    msg.sentByDisplayName = userDisplayName;

    // If the user does not have "name" (Display Name) attribute in the User Entity, assign "userName" to DisplayName
    if (userDisplayName)
        msg.sentByDisplayName = userDisplayName;
    else
        msg.sentByDisplayName = userName;

    return msg;
}

function pushMessagesForChannel(msg) {
    receiverRef = firebase.database().ref(`teams/${teamId}/channels/${sentToUserName}/messages`);

    // push Message to DB
    receiverRef.push(msg);



    // Render the Messages
    receiverRef.on('value', function(snapshot) {
        let chatBox = document.getElementById('messageBody');
        chatBox.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().sentToUserName === sentToUserName) {
                renderMessage(childSnapshot, chatBox);

            }
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function pushMessagesForUser(msg) {

    senderRef = firebase.database().ref(`teams/${teamId}`).child('directMessages').child('users').child(userName).child('messages');
    receiverRef = firebase.database().ref(`teams/${teamId}`).child('directMessages').child('users').child(sentToUserName).child(`messages`);
    senderRef.push(msg);
    receiverRef.push(msg);

    // Render the Messages
    receiverRef.on('value', function(snapshot) {
        let chatBox = document.getElementById('messageBody');
        chatBox.innerHTML = '';
        snapshot.forEach(function(childSnapshot) {
            let childData = childSnapshot.val();
            if ((childData.sentByUserName === sentToUserName || childData.sentToUserName === sentToUserName) &&
                (childData.sentByUserName === userName || childData.sentToUserName === userName)) {
                renderMessage(childSnapshot, chatBox);
            }
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Render Chat history using subscribe method
// store.subscribe(() => {
//     console.log(store.getState());
// });

function getFile(event) {
    $('#imgupload').trigger('click');
    event.stopPropagation();
    $('#imgupload').change(function(e) {
        e.stopPropagation();
        var files = e.target.files;
        var fileName = "/" + files[0].name;
        filesUpload(files[0], fileName);
    });
}


function filesUpload(fileValue, fileName) {
    var ACCESS_TOKEN = '-svZYpTlHYAAAAAAAAAAlA6ODRtAP91bFD71MYrpc5glK69vAatHDx3602arXz3f';
    $.ajax({
        url: 'https://content.dropboxapi.com/2/files/upload',
        type: 'post',
        data: fileValue,
        processData: false,
        contentType: 'application/octet-stream',
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN,
            "Dropbox-API-Arg": `{"path": "${fileName}", "mode": "add", "autorename": true, "mute": false}`
        },
        success: function(data) {
            filesDownload(data.id);
        }
    })
}

function filesDownload(fileName) {
    var ACCESS_TOKEN = '-svZYpTlHYAAAAAAAAAAlA6ODRtAP91bFD71MYrpc5glK69vAatHDx3602arXz3f';
    var dbx = new dropbox({
        accessToken: ACCESS_TOKEN
    });
    dbx.filesDownload({
            path: fileName
        }) // here i mentioned the shareable link rather then I want to specify path
        .then(function(data) {
            var downloadUrl = URL.createObjectURL(data.fileBlob);
            var template = `<a href=${downloadUrl} download=${data.name}> Media File Received </a>`;
            var builtMessage = buildMessageEntity(template);
            if (forChannel) {
                pushMessagesForChannel(builtMessage);
            } else { // If it's Direct Messages, store message under both the Sender and Receiver nodes
                pushMessagesForUser(builtMessage);
                sendDesktopNotification(builtMessage)
            }
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Render Chat history using subscribe method
// store.subscribe(() => {
//     console.log(store.getState());
// });

// function to Render the individual Message
function renderMessage(childSnapshot, chatBox) {
    const paraElement = document.createElement('p');
    const formattedTime = moment(childSnapshot.val().date).fromNow();
    paraElement.innerHTML = `<strong>${childSnapshot.val().sentByDisplayName}</strong> - ${formattedTime}<br>
    ${childSnapshot.val().messageText}`;
    chatBox.appendChild(paraElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}