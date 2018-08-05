import 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'popper.js';
import 'bootstrap';
import 'jquery-ui/ui/disable-selection';
import '../scss/main.scss';
import firebase from 'firebase';
import {
  fnAddMember, muteChannel, deleteChannel, getAllContacts,
} from './collaboration/userSetting/userSettingService';
import {
  fnCreateChannel,
} from './collaboration/adminSetting/adminSettingService';
import { config } from '../../../config/config';


require('font-awesome/css/font-awesome.css');


jQuery(document).ready(() => {
  getAllContacts();
});

// firebase.initializeApp(config);

// // Get a reference to the database service
// const database = firebase.database();
// console.log(database);

// // = ====================================================================================

// // function to create a channel
// function fnCreateChannel() {
//   const channelref = database.ref(`channels/${1234567}`).set({
//     channelName: 'new',
//     private: true,
//     users: {
//       userName: 'saket1',
//     },
//   }, (error) => {
//     if (error) {
//       console.log(error, 'There is error while saving data into firebase...');
//     } else {
//       console.log('channel created successfully...');
//     }
//   });
// }


// document.getElementById('createChannel').addEventListener('click', fnCreateChannel);

// //= ============================================================================
// function fnAddMember() {
//   const memberRef = database.ref(`users/${12345}`).set({
//     status: 'active',
//     userName: 'sachin',
//   }, (error) => {
//     if (error) {
//       console.log(error, 'There is error while saving data into firebase...');
//     } else {
//       console.log('saved successfully...');
//     }
//   });
// }

// document.getElementById('addmember').addEventListener('click', fnAddMember);

//= ========================================================================
// functionality for updating something in firebase via
// function muteChannel() {
//   const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
//     private: 'nothing',
//   }, (error) => {
//     if (error) {
//       console.log(error, 'There is error while saving data into firebase...');
//     } else {
//       console.log('saved successfully...');
//     }
//   });
// }

// document.getElementById('muteChannel').addEventListener('click', muteChannel);

//= =============================================================================
// function deleteChannel() {
//   const deleteChannelRef = firebase.database().ref(`/channels/${1234567}`).remove();
// }

// document.getElementById('deleteChannel').addEventListener('click', deleteChannel);
