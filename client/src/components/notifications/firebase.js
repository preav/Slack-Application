// import firebase from 'firebase';
import appConfig from './appConfig';
import {firebase, database } from '../../../../firebase/firebase';


// const ref = firebase.database().ref('team001');


// ref.on('value', (snapshot) => {
//   snapshot.forEach((data) => {
//     console.log(`The ${data.key} value is ${data.val()}`);
//     document.getElementById('#playGround').innerHTML = `The ${data.key} value is ${data.val()}`;
//     console.log(`The ${data.key} value is ${data.val()}`);
//   });
// });
// console.log(appConfig);


// firebase.initializeApp(appConfig);
const rootRef = database.ref('team-6');
const newRoot = rootRef.child('channels');


newRoot.on('value', (snapshot) => {
  snapshot.forEach((_child) => {
    const society = _child.key;
    if (society === 'text') {
      const soc = _child.val();
      // console.log(society);
      console.log(soc);
    }
  });
});

// return document.querySelectorAll('#mes')[0];
// export default func();

// const channelList = rootRef.child('channels');
// channelList.om('value', (userDetails) => {
//   const channelName = userDetails.key;
//   const userList = userDetails.child(users);
//   userList.on('value', (user) => {
//     if (user.key === '${userID}') {
//       const msgObject = user.child('messages').child('messageText');
//     }
//   });
// });
