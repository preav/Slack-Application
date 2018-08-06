import firebase from 'firebase';
import { config } from '../../../../../config/config';

const jQuery = require('jquery');

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

function getAllChannels() {
  const userContactref = firebase.database().ref('team-6').child('channels');
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
                  <div>
                      <button id="muteChannel">mute Channel</button>
                      <button id="unmuteChannel">unmute Channel</buttob>
                      <button id="removeChannel">remove Channel</button>
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
  const userContactref = firebase.database().ref('team-6').child('directMessages').child('users');
  userContactref.once('value', (snapshot) => {
    // const getAllContactValue = snapshot.val();
    const getAllContactValue = Object.keys(snapshot.val());
    let getAllContactHtml = '';
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
                <div id="contactUser">${contactVal}</div>
                <div>
                    <button id="muteUser">mute User</button>
                    <button id="unmuteUser">unmute User</buttob>
                    <button id="removeUser">remove User</button>
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
function muteUsers() {
  const channelN = document.getElementById('muteUser').value;

  console.log('channelN', channelN);
  const newPostKey = firebase.database().ref('team-6/directMessages/users').update({
    mute: false,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

jQuery(document).on('click', '#muteUser', (e) => {
  e.preventDefault();
  console.log('mute Contact');
  muteUsers();
});

function unMuteContact() {
  const channelName = document.getElementById('muteUser').testContent;
  const newPostKey = firebase.database().ref('team-6/channels').update({
    mute: false,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

jQuery(document).on('click', '#unmuteContact', (e) => {
  e.preventDefault();
  console.log('unmute Contact');
  unMuteContact();
});


function deleteContact() {
  const deleteChannelRef = firebase.database().ref(`/channels/${123}`).remove();
}


jQuery(document).on('click', '#deleteContact', (e) => {
  e.preventDefault();
  console.log('unmute Contact');
  deleteContact();
});


export {
  fnAddMember, muteUsers, deleteContact, unMuteContact, database, getAllChannels, getAllUsers,
};
