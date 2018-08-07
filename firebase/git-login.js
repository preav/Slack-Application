import './firebase-config';
import firebase from 'firebase';
import { homeComponentView, createDashboardView } from '../client/src/components/onboarding/onboarding-controller';
import { saveUpdateUser, getTeamsOfCurrentUser } from './onboarding-db';

const provider = new firebase.auth.GithubAuthProvider();

export function gitLogin() {
  // console.log(firebase.auth().currentUser)

  if (!firebase.auth().currentUser) {
    document.getElementById('git-login').disabled = true;

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        // console.log(result.credential.accessToken);
        // console.log(result.user.uid);
        // console.log(result.user.phoneNumber);
        // console.log(result.additionalUserInfo.username);
        // console.log(result.additionalUserInfo.providerId); //github.com
        // console.log(result.additionalUserInfo.profile.html_url); // https://github.com/OceanK007

        const userObject = {
          username: result.additionalUserInfo.username,
          uid: result.user.uid,
          accessToken: result.credential.accessToken,
          name: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
          phoneNumber: result.user.phoneNumber,
          gitURL: result.additionalUserInfo.profile.html_url,
          teams: ['team-one', 'team-two'],
          status: 'active',
          permission: { write: false, read: true },
        };

        // Saving username, since firebase.auth().currentUser doesn't provide username later on
        firebase.auth().currentUser.username = result.additionalUserInfo.username;

        // Saving/updating current logged in user
        saveUpdateUser(userObject);
      });
    //   .catch((error) => {
    //     document.getElementById('git-login').disabled = false;
    //     const errorCode = error.code;
    //     const errorMessage = error.message;

    //     // console.log(error.code);
    //     // console.log(error.message);
    //   });
  } else {
    // console.log('User already exist');

  }
}

export function gitLogout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Signout successful!');
    }); // , (error) => { console.log('Signout failed'); };
}

// This will be called in each sign-in/sign-out (i.e. one each state change)
// It can be defined in a function as well to check user state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('State changed: User exist');
    // console.log(user);
    createDashboardView();
    getTeamsOfCurrentUser();
    document.querySelector('#git-signout').addEventListener('click', () => { gitLogout(); });
    document.querySelector('#git-signout').classList.remove('d-none');
    document.querySelector('#user-profile').classList.remove('d-none');
  } else {
    console.log("State changed: User doesn't exist");
    const homeComp = homeComponentView();
    homeComp.querySelector('#git-login').addEventListener('click', () => { gitLogin(); });
    homeComp.querySelector('#git-login').disabled = false;
    document.querySelector('#git-signout').classList.add('d-none');
    document.querySelector('#user-profile').classList.add('d-none');
  }
});
