import 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'popper.js';
import 'bootstrap';
import 'jquery-ui/ui/disable-selection';
<<<<<<< HEAD
import '../scss/main.scss';
import firebase from 'firebase';
import {
  fnAddMember, muteChannel, deleteChannel, getAllContacts,
} from './collaboration/userSetting/userSettingService';
import {
  fnCreateChannel,
} from './collaboration/adminSetting/adminSettingService';
import { config } from '../../../config/config';

=======
import {
  fnCreateChannel, fnAddMember, muteChannel, deleteChannel,
} from './collaboration/userSetting/userSettingService';
// import firebase from 'firebase';
// import { config } from '../../../config/config';
import '../scss/main.scss';
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742

require('font-awesome/css/font-awesome.css');


<<<<<<< HEAD
jQuery(document).ready(() => {
  getAllContacts();
});

=======
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
// firebase.initializeApp(config);

// // Get a reference to the database service
// const database = firebase.database();
// console.log(database);

<<<<<<< HEAD
// // = ====================================================================================

// // function to create a channel
=======
//= ====================================================================================

// function to create a channel
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
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

<<<<<<< HEAD
//= ========================================================================
// functionality for updating something in firebase via
=======
// //= ========================================================================
// // functionality for updating something in firebase via
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
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

<<<<<<< HEAD
//= =============================================================================
=======
// //= =============================================================================
>>>>>>> b6c9bd32aa1163717be87da45d8b430fc0767742
// function deleteChannel() {
//   const deleteChannelRef = firebase.database().ref(`/channels/${1234567}`).remove();
// }

// document.getElementById('deleteChannel').addEventListener('click', deleteChannel);
