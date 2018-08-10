
import firebase from 'firebase';
import { database , getUserName } from '../userSetting/userSettingService';
import { getAllUsers } from "./../userSetting/userSettingService"
const jQuery = require('jquery');


function fnCreateChannel() {
  const userV = {};
  $('input[name="selectedUserName"]:checked').each(function () {
    const USERDISPLAY = $(this).data();
    console.log("USERDISPLAY====>",USERDISPLAY);
    userV[USERDISPLAY.username]=USERDISPLAY
  });
  const teamID = $('#createChannel').data('teamid');
  const channelN = document.getElementById('channelName').value;
  const channelT = document.getElementById('channelType').value;
  database.ref('teams/'+teamID+'/channels').push({
    channelName : channelN,
    private: channelT,
    users :  userV
   }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('channel created successfully...');
    }
  });
}
document.getElementById('createChannel1').addEventListener('click', fnCreateChannel);

function getAllUsersFromTeam(teamID) {
  const checkUserRef = database.ref('teams/' + teamID);
  checkUserRef.on('value', (snapshot) => {
    const checkUserRef = snapshot.val();
    if (checkUserRef['users']) {
      database.ref('teams/' + teamID + '/users').once('value', dataSnapshot => {
        $('#usersinTeam').empty();
        dataSnapshot.forEach(childSnapshot => {
          let userNode = childSnapshot.key;
          let userID = childSnapshot.val();
          let user = getUserName(userID).then((user) => {
            var getAllUserHtml = `
              <div>
                <input type="checkbox" data-userid="${userID}" data-username="${user.userName}" class="users" name="selectedUserName" data-userDisplay="${user.displayName}">
                ${user.displayName}
              </div>`;
          $('#usersinTeam').append(getAllUserHtml);
          })
        });
      });
    }
  });
}

$(document).on('click', '#createChannel', function(e) {
  const teamID = $(this).data('teamid');
  getAllUsersFromTeam(teamID);
});

export { fnCreateChannel, getAllUsersFromTeam };
