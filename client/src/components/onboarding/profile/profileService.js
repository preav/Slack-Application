import '../../../../../firebase/firebase-config';
import firebase from 'firebase';

// const database = firebase.database();

const dbRef = firebase.database().ref();
const users = dbRef.child('users');


export default function getCurrentUserData() {
  users.on('value', (snapshot) => {
    const userUID = firebase.auth().currentUser.uid;
    console.log('test >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--', userUID);
    console.log('test --', snapshot.val());
    return snapshot.val();
  });
}
