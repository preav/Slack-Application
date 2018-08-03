import firebase from 'firebase';

const dbRef = firebase.database().ref();
const users = dbRef.child('users');


export default function getCurrentUserData() {
  users.on('value', (snapshot) => {
    console.log('test >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--', snapshot);
    console.log('test --', snapshot.val());
    return snapshot.val();
  });
}
