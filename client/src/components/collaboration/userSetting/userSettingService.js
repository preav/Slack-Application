import firebase from 'firebase';
import '../../../../../firebase/firebase-config';
import { openChatDetailsForChannel, openChatDetailsForUser } from '../../../../src/components/chats/chat-service';

let database = firebase.database();
const jQuery = require('jquery');

function getAllChannels(teamName) {
  let getAllContactHtml = `<ul class="side-list"><li>
  <a data-toggle="modal" data-target="#searchModal" data-teamID=${teamName} id="searchChannel">Channels</a>
    <span><a id="createChannel" data-toggle="modal" data-target="#modalSubscriptionForm"><i class="fa fa-plus-circle"></i></a></span>
    </li>`
  const userContactref = database.ref('team-6').child('channels');
  userContactref.on('value', (snapshot) => {
    // const getAllContactValue = Object.values(snapshot.val());
    // const getAllContactValue = Object.keys(snapshot.val());
    const getAllContactValue = Object.keys(snapshot.val());

    const abc = getAllContactValue.map((contactVal) => {
      // const conName = Object.keys(contactVal);
      getAllContactHtml += `
        <li id=${contactVal} class="channels" data-channelid=${contactVal} data-teamid=${teamName}>
        ${contactVal}
        <span id="${contactVal}channel">
          <a class="muteChannel"><i class="fa fa-microphone-slash"></i></a>
          <a class="unmuteChannel"><i class="fa fa-microphone"></i></a>
          <a class="removeChannel"><i class="fa fa-times-circle-o"></i></a>
        </span>
        </li>`;
      //return getAllContactHtml;
    });
  });
  getAllContactHtml += "</ul>";
  jQuery('#showContactInformation').append(getAllContactHtml);
  // document.getElementById(`${contactVal}`).addEventListener('click', clickChannel);
}

$(document).on("click", '.channels', function(){
  const teamID = $(this).data('teamid');
  const channelId = $(this).data('channelid');
  openChatDetailsForChannel(channelId, teamID);
});

document.getElementById('userContacts').addEventListener('click', getAllChannels);

function getAllUsers(teamName) {
  const userContactref = database.ref('team-6').child('directMessages').child('users');
  userContactref.on('value', (snapshot) => {
    const getAllContactValue = Object.keys(snapshot.val());
    let getAllContactHtml = `<ul class="side-list"><li data-toggle="modal" data-teamid=${teamName} data-target="#searchModal" id="searchPeople">Direct Messages</li>`;
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
      <li class="contactUser" data-userid=${contactVal} data-teamid=${teamName}>
        ${contactVal}
        <span userId = ${contactVal}>
          <a class="muteUser"><i class="fa fa-microphone-slash"></i></a>
          <a class="unmuteUser"><i class="fa fa-microphone"></i></a>
          <a class="removeUser"><i class="fa fa-times-circle-o"></i></a>
        </span>
        </li>`;
      return getAllContactHtml;
    });
    getAllContactHtml += "</ul>";
    jQuery('#showContactInformation').append(getAllContactHtml);
  });
}

// Get the UserId of the person who is selected for chatting
$(document).on("click", '.contactUser', function(){
  const teamID = $(this).data('teamid');
  const userId = $(this).data('userid');
  openChatDetailsForUser(userId, teamID);
});

document.getElementById('userContacts').addEventListener('click', getAllUsers);

function fnAddMember(status, userName) {
  const memberRef = database.ref('team001/users/').push({
    status: 'active',
    userName: 'sasasas',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

// document.getElementById('addmember').addEventListener('click', fnAddMember);

// functionality for updating something in firebase via
function muteUsers(userId) {
  const newPostKey = database.ref(`team-6/directMessages/users/${userId}`).update({
    mute: true,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

jQuery(document).on('click', '.muteUser', (e) => {
  const userId = e.target.parentElement.getAttribute('userId');
  muteUsers(userId);
});

function unMuteUsers(userId) {
  const newPostKey = database.ref(`team-6/directMessages/users/${userId}`).update({
    mute: false,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

jQuery(document).on('click', '.unmuteUser', (e) => {
  const userId = e.target.parentElement.getAttribute('userId');
  unMuteUsers(userId);
});


function deleteUsers(userId) {
  const removeUserRef = database.ref(`team-6/directMessages/users/${userId}`).remove();
  getAllUsers();
}


jQuery(document).on('click', '.removeUser', (e) => {
  const userId = e.target.parentElement.getAttribute('userId');
  console.log('User Removed');
  deleteUsers(userId);
});

//= =====================================================================
function muteChannel(channelId) {
  const newPostKey = database.ref('team-6').child('channels').child(`${channelId}`)
    .update({
      mute: true,
    }, (error) => {
      if (error) {
        console.log(error, 'There is error while saving data into firebase...');
      } else {
        console.log('channel muted successfully...');
      }
    });
}

jQuery(document).on('click', '.muteChannel', (e) => {
  const channelId = e.target.parentElement.getAttribute('channelId');
  muteChannel(channelId);
});


function unMuteChannel(channelId) {
  const newPostKey = database.ref('team-6').child('channels').child(`${channelId}`)
    .update({
      mute: 'saket',
    }, (error) => {
      if (error) {
        console.log(error, 'There is error while saving data into firebase...');
      } else {
        console.log('saved successfully...');
      }
    });
}

jQuery(document).on('click', '.unmuteChannel', (e) => {
  const channelId = e.target.parentElement.getAttribute('channelId');
  unMuteChannel(channelId);
});

function removeChannel(channelId) {
  const newPostKey = database.ref('team-6').child('channels').child(`${channelId}`)
    .remove();
  getAllChannels();
}


jQuery(document).on('click', '.removeChannel', (e) => {
  const channelId = e.target.parentElement.getAttribute('channelId');
  console.log('Channel Removed');
  removeChannel(channelId);
});


export {
  fnAddMember,
  muteUsers,
  deleteUsers,
  unMuteUsers,
  database,
  getAllChannels,
  getAllUsers,
  muteChannel,
  unMuteChannel,
  removeChannel,
};
