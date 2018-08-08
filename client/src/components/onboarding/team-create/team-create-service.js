import firebase from 'firebase';
import { saveUpdateTeam, saveUpdateUser, getCurrentUserDetails, getTeamDetail } from '../../../../../firebase/onboarding-db';

export function submitTeamCreateForm() {
  const userUID = firebase.auth().currentUser.uid;
  // console.log(userUID);

  const teamName = document.getElementById('teamName').value;
  const companyName = document.getElementById('companyName').value;
  const teamData = {};

  // const form = document.getElementById('create-team-form');
  // Array.from(form.elements).forEach((element) => {
  //   // console.log(element.nodeName);
  //   // console.log(`${element.name}=${element.value}`);
  //   if (element.nodeName.toLowerCase() === 'input') {
  //     teamData[element.name] = element.value;
  //   }
  // });
  teamData.companyName = companyName;
  teamData.admins = [userUID];
  teamData.private = false;
  teamData.users = [userUID];

  console.log(teamData);

  saveUpdateTeam(teamName, teamData).then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });

  getCurrentUserDetails().then((response) => {
    // console.log(response);
    const teams=response.teams;
    let userData;
    if(teams != 'undefined' && teams != "" && teams != null){
      userData = {
        teams: [...response.teams, teamName],
      };
    }else{
      userData = {
        teams: [teamName],
      };
    }

    saveUpdateUser(userUID, userData).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }, (error) => {
    console.log(error);
  });
}

export async function getTeam(teamName) {
  var team = await getTeamDetail(teamName);
  console.log(team);

  return team;
}