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
                  <span data-channelid="${channelID}" data-teamid="${teamName}" data-channelname="${channelName}">
                  <a class="muteChannel"><i class="fa fa-microphone-slash"></i></a>
                  <a class="unmuteChannel"></a>
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

$(document).on("click", '.channels', function(e){
  e.preventDefault;
  const teamID = $(this).data('teamid');
  const channelId = $(this).data('channelid');
  $("#enteredCommand").attr('data-slackbot', 'false');
  openChatDetailsForChannel(channelId, teamID);
  $(".users, .channels").removeClass('active');
  $(this).addClass('active');
});

function getAllUsers(teamName) {
  const checkUserRef = database.ref('teams/' + teamName);
  if (checkUserRef){
  let getAllContactHtml = `<ul class="side-list"><li data-toggle="modal" data-teamid="${teamName}" data-target="#searchModal" id="searchPeople">Direct Messages
    </li></ul><ul class="side-list side-list-body" id="usersList"></ul>`;
  $('#showContactInformation').append(getAllContactHtml);
  checkUserRef.on('value', (snapshot) => {
    const checkUserRef = snapshot.val();
    if (checkUserRef['users']) {
      database.ref('teams/' + teamName + '/users').once('value', dataSnapshot => {
        $('#usersList').empty();
        dataSnapshot.forEach(childSnapshot => {
          let userNode = childSnapshot.key;
          let userID = childSnapshot.val();
          getUserName(userID).then((user) => {
            console.log(user);
            var userListHTML = `
                  <li data-userid="${userID}" data-teamid="${teamName}" data-username="${user.userName}" class="users">
                  ${user.displayName}
                  <span data-usernode="${userNode}" data-teamid="${teamName}" data-userid="${userID}" data-username="${user.userName}">
                    <a class="muteUser"><i class="fa fa-microphone-slash"></i></a>
                    <a class="unmuteUser"></a>
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
$(document).on("click", '.users', function(e){
  e.preventDefault;
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
function muteUsers(userNode,teamID,userId,username) {
  const newPostKey = database.ref(`teams/`+teamID+`/prefrences/mute/users/`+ userId).update({
      userName:username
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

function unMuteUsers(userNode,teamID,userId,username) {
  const newPostKey = database.ref(`teams/`+teamID+`/prefrences/mute/users/`+ userId).remove();
}

jQuery(document).on('click', '.muteUser', function(e) {
  e.preventDefault;
  $('.unmuteUser').toggle();
  const userNode = $(this).parents('span').data('usernode');
  const teamID = $(this).parents('span').data('teamid');
  const userId = $(this).parents('span').data('userid');
  const username = $(this).parents('span').data('username');
  // console.log("===>",userNode,teamID,userId,username);
  let icon = $("i", this).toggleClass("fa fa-microphone-slash fa fa-microphone");
  if (icon.hasClass("fa fa-microphone-slash")){
    alert("nothing");
    unMuteUsers(userNode,teamID,userId,username);
  }else{
    muteUsers(userNode,teamID,userId,username);
  }
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

function muteChannel(teamID,channelId,channelName) {
  const newPostKey = database.ref(`teams/`+teamID+`/prefrences/mute/channels/`+ channelId).update({
    channelName:channelName
    }, (error) => {
      if (error) {
        console.log(error, 'There is error while saving data into firebase...');
      } else {
        console.log('channel muted successfully...');
      }
    });
}

function unMuteChannel(teamID,channelId,channelName) {
  const newPostKey = database.ref(`teams/`+teamID+`/prefrences/mute/channels/`+ channelId).remove();
}

jQuery(document).on('click', '.muteChannel', function(e) {
  e.preventDefault;
  $('.unmuteChannel').toggle();
  const teamID = $(this).parents('span').data('teamid');
  const channelId = $(this).parents('span').data('channelid');
  const channelName = $(this).parents('span').data('channelname');
  // console.log("++++===>",teamID,channelId,channelName);
  let icon = $("i", this).toggleClass("fa fa-microphone-slash fa fa-microphone");
  if (icon.hasClass("fa fa-microphone-slash")){
    alert("nothing");
    unMuteChannel(teamID,channelId,channelName);
  }else{
    muteChannel(teamID,channelId,channelName);
  }
});

function removeChannel(channelID, teamID) {
  database.ref('teams/' + teamID + '/channels').child(`${channelID}`).remove();
}


$(document).on('click', '.removeChannel', function (e) {
  e.preventDefault;
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
