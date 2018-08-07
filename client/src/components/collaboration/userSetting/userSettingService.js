 import {firebase, database} from '../../../../../firebase/firebase';

const jQuery = require('jquery');

function getAllChannels() {
  const userContactref = database.ref('team-6').child('channels');
  userContactref.once('value', (snapshot) => {
    const getAllContactValue = Object.values(snapshot.val());

    console.log('get something', getAllContactValue);
    let getAllContactHtml = '';
    const abc = getAllContactValue.map((contactVal) => {
      const conName = Object.keys(contactVal);
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
              <div id="contactDetails">${conName}</div>
                  <div channelId='${conName}'>
                      <button type="button" class="muteChannel">mute Channel</button>
                      <button type="button" class="unmuteChannel">unmute Channel</buttob>
                      <button type="button" class="removeChannel">remove Channel</button>
                  </div>
                </form>
            </div>
        </div>
        `;
      return getAllContactHtml;
    });
    jQuery('#showContactInformation').append(getAllContactHtml);
  });
}
document.getElementById('userContacts').addEventListener('click', getAllChannels);

function getAllUsers() {
  const userContactref = database.ref('team-6').child('directMessages').child('users');
  userContactref.once('value', (snapshot) => {
    const getAllContactValue = Object.keys(snapshot.val());
    let getAllContactHtml = '';
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
                <div class="contactUser">${contactVal}</div>
                <div userId='${contactVal}'>
                    <button type="button" class="muteUser">mute User</button>
                    <button type="button" class="unmuteUser">unmute User</buttob>
                    <button type="button" class="removeUser">remove User</button>
                </div>
            </div>
        </div>
        `;
      return getAllContactHtml;
    });
    jQuery('#showContactInformation').append(getAllContactHtml);
  });
}
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

document.getElementById('addmember').addEventListener('click', fnAddMember);

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
