import firebase from 'firebase';
import { saveUpdateTeam } from '../../../../../firebase/onboarding-db';

export function submitTeamCreateForm() {
  const user = firebase.auth().currentUser;
  console.log(user);

  const form = document.getElementById('create-team-form');
  const teamObject = {};
  Array.from(form.elements).forEach((element) => {
    // console.log(element.nodeName);
    // console.log(`${element.name}=${element.value}`);
    if (element.nodeName.toLowerCase() === 'input') {
      teamObject[element.name] = element.value;
    }
  });
  teamObject.admins = ['username1', 'username2'];
  teamObject.private = false;
  teamObject.users = ['my-username', 'my-username-2'];

  console.log(teamObject);

  saveUpdateTeam(teamObject);
}

export function test() {

}
