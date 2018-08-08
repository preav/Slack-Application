
import firebase from 'firebase';
import { database } from '../userSetting/userSettingService';
// import { getAllChannels } from '../userSetting/userSettingService';

const jQuery = require('jquery');


function fnCreateChannel(channelName, channelType, channelId) {
  const userV = [];
  jQuery('.addUserToChannel').each(function () {
    userV.push(jQuery(this).val());
  });
  const channelN = document.getElementById('channelName').value;
  const channelT = document.getElementById('channelType').value;
  const channelref = database.ref('team-6/channels');
  channelref.push({
    channelName: channelN,
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

// function addLi(channelId){
//     const channelId = $(this).parents('span').attr('channelId');
//     $("#showContactInformation").append($("<li>").channelId);
// }

function getAllUsersFromTeam() {
  const userContactref = firebase.database().ref('team-6/users');
  console.log('asdfsadas', userContactref);
  userContactref.once('value', (snapshot) => {
    const getAllContactValue = Object.keys(snapshot.val());
    let getAllContactHtml = '';
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
                <div userId='${contactVal}'>
                  <input type="checkbox" value=${contactVal} class="addUserToChannel">${contactVal}<br>
                </div>
            </div>
        </div>
        `;
      return getAllContactHtml;
    });
    jQuery('#usersinTeam').append(getAllContactHtml);
  });
}

jQuery(document).on('click', '#createChannel', (e) => {
  const channelId = e.target.parentElement.getAttribute('channelId');
  getAllUsersFromTeam();
});

export { fnCreateChannel, getAllUsersFromTeam };
