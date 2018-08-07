import firebase from 'firebase';
import { saveUpdateTeam } from '../../../../../firebase/onboarding-db';

export function submitTeamCreateForm() {
  const userUID = firebase.auth().currentUser.uid;
  // console.log(userUID);

  const form = document.getElementById('create-team-form');
  const teamObject = {};
  Array.from(form.elements).forEach((element) => {
    // console.log(element.nodeName);
    // console.log(`${element.name}=${element.value}`);
    if (element.nodeName.toLowerCase() === 'input') {
      teamObject[element.name] = element.value;
    }
  });
  teamObject.admins = [userUID];
  teamObject.private = false;
  teamObject.users = [userUID];

  console.log(teamObject);

  saveUpdateTeam(teamObject);
}

export function test() {

}
