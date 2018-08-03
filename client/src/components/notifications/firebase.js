import firebase from 'firebase';
import appConfig from './appConfig';

firebase.initializeApp(appConfig);
// const ref = firebase.database().ref('team001');


// ref.on('value', (snapshot) => {
//   snapshot.forEach((data) => {
//     console.log(`The ${data.key} value is ${data.val()}`);
//     document.getElementById('#playGround').innerHTML = `The ${data.key} value is ${data.val()}`;
//     console.log(`The ${data.key} value is ${data.val()}`);
//   });
// });
// console.log(appConfig);


const rootRef = firebase.database().ref('team001');
const newRoot = rootRef.child('conversations/userID001/messages/0/body');

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
