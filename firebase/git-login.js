import './firebase-config';
import firebase from 'firebase';
import { homeComponentView, createDashboardView } from '../client/src/components/onboarding/onboarding-controller';

const provider = new firebase.auth.GithubAuthProvider();

export function gitLogin() {
  // console.log(firebase.auth().currentUser)

  if (!firebase.auth().currentUser) {
    document.getElementById('git-login').disabled = true;

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // const token = result.credential.accessToken;
        // const user = result.user;

        console.log(result);
        // console.log(user);
        // console.log(token);

        // createDashboardView();
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
    // createDashboardView();
  }
}

export function gitLogout() {
  firebase.auth().signOut()
    .then(() => {
      // createDashboardView();
      // console.log('Signout successful!');
    }); // , (error) => { console.log('Signout failed'); };
}

// This will be called in each sign-in/sign-out (i.e. one each state change)
// It can be defined in a function as well to check user state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('State changed: User exist');
    console.log(user);
    const dashComponent = createDashboardView();
    dashComponent.querySelector('#git-signout').addEventListener('click', () => { gitLogout(); });
  } else {
    console.log("State changed: User doesn't exist");
    const homeComp = homeComponentView();
    homeComp.querySelector('#git-login').addEventListener('click', () => { gitLogin(); });
    homeComp.querySelector('#git-login').disabled = false;
  }
});
