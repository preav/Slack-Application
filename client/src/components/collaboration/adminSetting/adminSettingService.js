
import firebase from 'firebase';
import { database } from '../userSetting/userSettingService';
// import { getAllChannels } from '../userSetting/userSettingService';
import { getAllUsers } from "./../userSetting/userSettingService"
const jQuery = require('jquery');


function fnCreateChannel() {
  const userV = [];
  jQuery('.addUserToChannel').each(function () {
    console.log(jQuery(this).val());
    userV.push(jQuery(this).val());
  });
  const teamID = $('#createChannel').data('teamid');
  const channelN = document.getElementById('channelName').value;
  const channelT = document.getElementById('channelType').value;
  database.ref('teams/'+teamID+'/channels').push({
    channelName : channelN,
    private: channelT,
    users: userV,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      // addLi();
      console.log('channel created successfully...');
    }
  });
}
document.getElementById('createChannel1').addEventListener('click', fnCreateChannel);

function getAllUsersFromTeam(userID1) {
  // console.log("UserId1",userID1);
    // getUserName(userID1);
  // console.log("something",teamName);
  // console.log("something23",userNode);
  // getAllUsers(teamName);
  // console.log("userid" ,userID );
  // getUserName(userID);
  // console.log('teamName======>', userContactref);
  // userContactref.once('value', (snapshot) => {
  //   const getAllContactValue = Object.keys(snapshot.val());
  //   let getAllContactHtml = '';
  //   const abc = getAllContactValue.map((contactVal) => {
  //     getAllContactHtml += `
  //       <div>
  //           <div class="buttom-panel text-center mt-1">
  //               <div userId='${contactVal}'>
  //                 <input type="checkbox" value=${contactVal} name="chVal" class="addUserToChannel">${contactVal}<br>
  //               </div>
  //           </div>
  //       </div>
  //       `;
  //     return getAllContactHtml;
  //   });
  //   jQuery('#usersinTeam').append(getAllContactHtml);
  // });
}

jQuery(document).on('click', '#createChannel', (e) => {
  // const userNode = $(this).parents('span').data('usernode');
  // const teamID = $(this).parents('span').data('teamid');
  // console.log("coming here",userNode);
  // console.log("coming here",teamID);
  const userID1 = $(this).parents('span').data('userid');
  console.log("userID1",userID1);
  // getAllUsers();
  // getAllUsersFromTeam(userID1);
});

export { fnCreateChannel, getAllUsersFromTeam };
