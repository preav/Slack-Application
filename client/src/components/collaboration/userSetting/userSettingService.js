import firebase from 'firebase';
import '../../../../../firebase/firebase-config';
import { openChatDetailsForChannel, openChatDetailsForUser } from '../../../../src/components/chats/chat-service';

let database = firebase.database();
const jQuery = require('jquery');

function getAllChannels(teamName) {
  const checkChannelRef = database.ref('teams/' + teamName);
  let getAllContactHtml = `<ul class="side-list"><li><strong data-toggle="modal" data-teamid="${teamName}" data-target="#searchModal" id="searchChannel">Channels</strong>
    <span><a id="createChannel" data-teamid="${teamName}" data-toggle="modal" data-target="#modalSubscriptionForm"><i class="fa fa-plus-circle"></i></a></span>
    </li></ul><ul class="side-list side-list-body" id="channelList"></ul>`;
  $('#showContactInformation').append(getAllContactHtml);
  checkChannelRef.on('value', (snapshot) => {
    const getChannelRef = snapshot.val();
    if (getChannelRef && getChannelRef['channels']) {
      database.ref('teams/' + teamName + '/channels').once('value', dataSnapshot => {
        $('#channelList').empty();
        dataSnapshot.forEach(childSnapshot => {
          let channelID = childSnapshot.key;
          let channelName = childSnapshot.val().channelName;
          if (channelName) {
            var channelListHTML = `
                  <li data-channelid="${channelID}" data-teamid="${teamName}" data-channelname="${channelName}" class="channels">
                  ${channelName}
                  <span data-channelid="${channelID}" data-teamid="${teamName}">
                  <!--<a class="muteChannel"><i class="fa fa-microphone-slash"></i></a>
                  <a class="unmuteChannel"><i class="fa fa-microphone"></i></a>-->
                  <a class="removeChannel"><i class="fa fa-times-circle-o"></i></a>
                </span>
                </li>`;
            $('#channelList').append(channelListHTML);
          }
        });
      });

    }
  });
}

  $(document).on("click", '.channels', function(){
  const teamID = $(this).data('teamid');
  const channelId = $(this).data('channelid');
  $("#enteredCommand").attr('data-slackbot', 'false');
  openChatDetailsForChannel(channelId, teamID);
  $(".users, .channels").removeClass('active');
  $(this).addClass('active');
  });

// let count = 0;

function getAllUsers(teamName) {
  console.log(111);
  const checkUserRef = database.ref('teams/' + teamName);
  if (checkUserRef){
  let getAllContactHtml = `<ul class="side-list"><li data-toggle="modal" data-teamid="${teamName}" data-target="#searchModal" id="searchPeople">Direct Messages
    </li></ul><ul class="side-list side-list-body" id="usersList"></ul>`;
  $('#showContactInformation').append(getAllContactHtml);
  // console.log("count",++count);
  checkUserRef.once('value', (snapshot) => {
    const checkUserRef = snapshot.val();
    if (checkUserRef['users']) {
      database.ref('teams/' + teamName + '/users').once('value', dataSnapshot => {
        
        dataSnapshot.forEach(childSnapshot => {
          
          $('#usersList').empty();
          let userNode = childSnapshot.key;
          let userID = childSnapshot.val();
          getUserName(userID).then((user) => {
            // console.log(user);
            var userListHTML = `
                  <li data-userid="${userID}" data-teamid="${teamName}" data-username="${user.userName}" class="users">
                  ${user.displayName}
                  <span data-usernode="${userNode}" data-teamid="${teamName}">
                  <!--<a class="muteUser"><i class="fa fa-microphone-slash"></i></a>
                  <a class="unmuteUser"><i class="fa fa-microphone"></i></a>-->
                  <a class="removeUser"><i class="fa fa-times-circle-o"></i></a>
                </span>
                </li>`;
            $('#usersList').append(userListHTML);
          });
          
        });
      });
    }
  });
}
}

// Get the UserId of the person who is selected for chatting
$(document).on("click", '.users', function(){
  const teamID = $(this).data('teamid');
  const userId = $(this).data('username');
  $("#enteredCommand").attr('data-slackbot', 'false');
  openChatDetailsForUser(userId, teamID);
  $(".users, .channels").removeClass('active');
  $(this).addClass('active');
});

async function getUserName(userID) {
  let user = {};
  let userDisplayNameLocal = '';
  let usersDbRef = await firebase.database().ref('users').once('value', (dataSnapshot) => {
    dataSnapshot.forEach(childSnapshot => {
      if (childSnapshot.key === userID) {
        if (!childSnapshot.val().name) {
          user.userName = childSnapshot.val().username;
          user.displayName = childSnapshot.val().username;
        }
        else {
          user.userName = childSnapshot.val().username;
          user.displayName = childSnapshot.val().name;
        }
      }
    });
  });
  return user;
}

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
  const newPostKey = database.ref(`${teamName}/directMessages/users/${userId}`).update({
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


function deleteUsers(userNode, teamID) {
  database.ref('teams/' + teamID + '/users').child(`${userNode}`).remove();
}


jQuery(document).on('click', '.removeUser', function (e) {
  e.preventDefault;
  const userNode = $(this).parents('span').data('usernode');
  const teamID = $(this).parents('span').data('teamid');
  deleteUsers(userNode, teamID);
  $(this).parents('li').remove();
});

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
  const channelId = e.target.getAttribute('channelId');
  unMuteChannel(channelId);
});

function removeChannel(channelID, teamID) {
  database.ref('teams/' + teamID + '/channels').child(`${channelID}`).remove();
}


$(document).on('click', '.removeChannel', function () {
  const channelID = $(this).parents('span').data('channelid');
  const teamID = $(this).parents('span').data('teamid');
  // console.log(channelId);
  removeChannel(channelID, teamID);
  $(this).parents('li').remove();
});


export {
  muteUsers,
  deleteUsers,
  unMuteUsers,
  database,
  getAllChannels,
  getAllUsers,
  muteChannel,
  unMuteChannel,
  removeChannel,
  getUserName
};
