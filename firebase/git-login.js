import './firebase-config';
import firebase from 'firebase';

const provider = new firebase.auth.GithubAuthProvider();

export function gitLogin() {
  return new Promise((resolve, reject) => {
    if (!firebase.auth().currentUser) {
      document.getElementById('git-login').disabled = true;

      firebase.auth().signInWithPopup(provider).then((result) => {
        // console.log(result);
        // console.log(result.credential.accessToken);
        // console.log(result.user.uid);
        // console.log(result.user.phoneNumber);
        // console.log(result.additionalUserInfo.username);
        // console.log(result.additionalUserInfo.providerId); //github.com
        // console.log(result.additionalUserInfo.profile.html_url); // https://github.com/OceanK007
        resolve(result);
      });
    } else {
      reject(new Error('User already exist'));
    }
  });
}

export function gitLogout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Signout successful!');
    }); // , (error) => { console.log('Signout failed'); };
}

export function checkAuthStateChange() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('State changed: User exist');
        resolve(user);
      } else {
        console.log("State changed: User doesn't exist");
        reject(new Error("User doesn't exist"));
      }
    });
  });
}
