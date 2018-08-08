import { createStore } from 'redux'
import { chat } from './chat-reducers'
import { addChatToStore } from './chat-controller'
import moment from 'moment';
//const firebase = require('firebase');
var markdown = require("markdown").markdown;
import '../../../../firebase/firebase-config';
import firebase from 'firebase';
import { getCurrentUserDetails } from '../../../../firebase/onboarding-db'
//import { filesDownload } from '../collaborator/addFiles';
var dropbox =  require('dropbox').Dropbox;
const store = createStore(chat);

//document.getElementById('addMedia').addEventListener('click', getFile);

// Log the initial state
//console.log('initial Value',store.getState())

let sentTo = '';
let userDisplayName = '';
let forChannel = false;

// Get Current User Details
let currentUser = window.localStorage.getItem("current_user");
console.log(currentUser);
if (currentUser) {
    userDisplayName = JSON.parse(currentUser).data;
    console.log('userDisplayName', userDisplayName);
}
else {
    userDisplayName = 'anilkumar-bv';
}

// Get a reference to the database service
var database = firebase.database();
let receiverRef = firebase.database().ref('team-6').child('channels').child('chn001').child('users').child(userDisplayName);
let senderRef = null;

// Following function is called when a Channel is clicked upon to retrieve the Messages
export function openChatDetailsForChannel(channelId) {
    console.log('channel clicked');
    forChannel = true;
    console.log(channelId);
    sentTo = channelId;
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

export function openChatDetailsForUser(userId) {
    sentTo = userId;
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

    // Check if a User is selected to Chat with
    if (sentTo === '') {
        alert('Please select a User to Chat with');
        return false;
    }

    const rawMessage = document.querySelector('#enteredCommand').value;

    // Check if empty Text is being sent
    if (rawMessage.trim() === '') {
        alert('Please provide input text for Chat');
        return false;
    }

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
        pushMessagesForUser(msg);
    }

    // push a copy of the message to "Messages" collection on DB
    let messagesRef = firebase.database().ref('messages');
    messagesRef.push(msg);

    // Add this to State of store
    store.dispatch(addChatToStore(message, currentDateTime, userDisplayName, sentTo));
});

function pushMessagesForUser(msg) {
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
            // if(childSnapshot.val().messageText.indexOf('Sent a media file ') > -1){
            //     var index = "Sent a media file ".length;
            //     var fileName = childSnapshot.val().messageText.substring(index)
            //     fileName = "/"+fileName;
            //     filesDownload(fileName);
            // }
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


// export function getFileName(fileName, fileId) {
//     var scrubbedFileName = fileName.substr(1);
//     console.log(scrubbedFileName);
//     // Build the Message entity
//     let msg = {};
//     var message = "Sent a media file "+scrubbedFileName+" "+fileId;
//     msg.messageText = message
//     msg.date = Date.now();
//     msg.sentTo = sentTo;
//     msg.sentBy = userDisplayName;
//     pushMessagesForUser(msg);
// }

// function getFile(event) {
//     $('#imgupload').trigger('click');
//     $('#imgupload').change(function(e) {
//            var files = e.target.files; 
//        for (var i = 0, file; file = files[i]; i++) {
//          var fileName = "/"+file.name;
//          filesUpload(event, file, fileName);
//        }
//      });
//  }
 
//  function filesUpload(event, fileValue, fileName) {
//      var ACCESS_TOKEN = '-svZYpTlHYAAAAAAAAAAlA6ODRtAP91bFD71MYrpc5glK69vAatHDx3602arXz3f';
//      $.ajax({
//          url: 'https://content.dropboxapi.com/2/files/upload',
//          type: 'post',
//          data: fileValue,
//          processData: false,
//          contentType: 'application/octet-stream',
//          headers: {
//              "Authorization": "Bearer " + ACCESS_TOKEN,
//              "Dropbox-API-Arg": `{"path": "${fileName}", "mode": "add", "autorename": true, "mute": false}`
//          },
//          success: function (data) {
//              getFileName(data.path_display, data.id);
//              //console.log(data)
//          }
//      })
//  }

//  function filesDownload(fileName) {
// 	var ACCESS_TOKEN = '-svZYpTlHYAAAAAAAAAAlA6ODRtAP91bFD71MYrpc5glK69vAatHDx3602arXz3f';
//  	var dbx = new dropbox({accessToken: ACCESS_TOKEN});
//         dbx.filesDownload({ path: fileName})// here i mentioned the shareable link rather then I want to specify path
//             .then(function (data) {
//                 var downloadUrl = URL.createObjectURL(data.fileBlob);
//                 var template = `<a href=${downloadUrl} download=${data.name}>Download here </a>`;
//                 document.getElementById('messageBody').innerHTML += template;
//             })
//             .catch(function (error) {
//                 console.error(error);
//             });
//         return
// }