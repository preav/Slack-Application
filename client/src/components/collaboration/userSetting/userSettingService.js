import firebase from 'firebase';
import { config } from '../../../../../config/config';

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
console.log(database);


function fnCreateChannel() {
  const channelref = database.ref(`channels/${12345678}`).set({
    channelName: 'new',
    private: true,
    users: {
      userName: 'saket1',
    },
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('channel created successfully...');
    }
  });
}


document.getElementById('createChannel').addEventListener('click', fnCreateChannel);

//= ============================================================================
function fnAddMember() {
  const memberRef = database.ref(`users/${12345}`).set({
    status: 'active',
    userName: 'sachin',
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
function muteChannel() {
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'nothing',
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('saved successfully...');
    }
  });
}

document.getElementById('muteChannel').addEventListener('click', muteChannel);

//= =============================================================================
function deleteChannel() {
  const deleteChannelRef = firebase.database().ref(`/channels/${1234567}`).remove();
}

document.getElementById('deleteChannel').addEventListener('click', deleteChannel);


export {
  fnCreateChannel, fnAddMember, muteChannel, deleteChannel,
};
