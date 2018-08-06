import firebase from 'firebase';
import { config } from '../../../../../config/config';

const jQuery = require('jquery');

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
console.log(database);


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
                      <button id="muteContact">mute</button>
                      <button id="unmuteContact">unmute</buttob>
                      <button id="removeContact">remove</button>
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
    const getAllContactValue = Object.keys(snapshot.val());
    // const getAllContactKey = Object.values(snapshot.val());
    // console.log('get something123', getAllContactValue);
    // console.log('get something1234', getAllContactKey);
    // const conName = Object.values(contactVal);
    let getAllContactHtml = '';
    const abc = getAllContactValue.map((contactVal) => {
      getAllContactHtml += `
        <div>
            <div class="buttom-panel text-center mt-1">
              <div id="contactDetails">${contactVal}</div>
                  <div>
                      <button id="muteContact">mute</button>
                      <button id="unmuteContact">unmute</buttob>
                      <button id="removeContact">remove</button>
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

// function getAllUsers() {
//   const userContactref = firebase.database().ref('team-6/channels/');
//   userContactref.on('value', (snapshot) => {
//     const getAllContactValue = snapshot.val();
//     let getAllContactHtml = '';
//     console.log('getContact', getAllContactValue);
//     const abc = getAllContactValue.map((contactVal) => {
//       console.log(contactVal);

//       getAllContactHtml += `
//         <div>
//             <div class="buttom-panel text-center mt-1">
//               <div id="contactDetails">${contactVal}</div>
//                   <div>
//                       <button id="muteContact">mute</button>
//                       <button id="unmuteContact">unmute</buttob>
//                       <button id="removeContact">remove</button>
//                   </div>
//                 </form>
//             </div>
//         </div>
//         `;
//       return getAllContactHtml;
//     });
//     jQuery('#showContactInformation').append(getAllContactHtml);
//   });
// }
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

//= ========================================================================
// functionality for updating something in firebase via
function muteContact() {
  const channelN = document.getElementById('contactDetails').testContent;
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'public',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

jQuery(document).on('click', '#muteContact', (e) => {
  e.preventDefault();
  console.log('mute Contact');
  muteContact();
});

//= =============================================================================
function unMuteContact() {
  const channelN = document.getElementById('contactDetails').testContent;
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'private',
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

// document.getElementById('muteContact').addEventListener('click', unMuteContact);

//= =============================================================================
function deleteContact() {
  const deleteChannelRef = firebase.database().ref(`/channels/${123}`).remove();
}


jQuery(document).on('click', '#deleteContact', (e) => {
  e.preventDefault();
  console.log('unmute Contact');
  deleteContact();
});


export {
  fnAddMember, muteContact, deleteContact, unMuteContact, database, getAllChannels, getAllUsers,
};
