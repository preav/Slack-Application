import { getCurrentUserDetails, saveUpdateUser, getTeamDetail, saveUpdateTeam } from '../../../../firebase/onboarding-db';
import { store } from './profileReducer';

export default function createHTMLElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstElementChild;
}

const getUrlParameter = function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  let i;
  for (i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
  return undefined;
};

export async function saveUpdateUserAfterLogin(response)
{
  const result = "success";
  const curUser = await getCurrentUserDetails();
  const teamnameFromUrl = decodeURIComponent(getUrlParameter('teamname')).trim();
  const url = window.location.href;
  const userUID = response.user.uid;
  let userData = null;

  console.log(curUser);
  console.log("teamnameFromUrl: "+teamnameFromUrl);
 
  if(curUser != null && curUser != "" && curUser != 'undefined')
  {
    userData = curUser;
  }
  else
  {
    userData = {
      username: response.additionalUserInfo.username,
      accessToken: response.credential.accessToken,
      name: response.user.displayName,
      email: response.user.email,
      profilePicture: response.user.photoURL,
      phoneNumber: response.user.phoneNumber,
      gitURL: response.additionalUserInfo.profile.html_url,
      status: 'active',
      permission: { write: false, read: true }
    };
  }

  // START: REDUX //
  const obj =  {
    "user": {
      "userName": userData.username,
      "currentTeam": {
        "teamName": "",
        "channals": []
      },
      "teams": []
  }};
  store.dispatch({type: "LOGIN", obj});
  // END: REDUX //

  console.log(userData.teams);

  if (teamnameFromUrl != null && teamnameFromUrl != 'undefined' && teamnameFromUrl != "") 
  {
    console.log(`Adding team ${teamnameFromUrl} to user`);

    if(userData.teams != null && userData.teams != 'undefined' && userData.teams != "") {
      console.log("Updating teams of user");
      userData.teams = [...userData.teams, teamnameFromUrl];      
    }
    else {
      console.log("Adding new/first team to user");
      userData.teams = [teamnameFromUrl];
    }

    // Updating user details in team
    let team = await getTeamDetail(teamnameFromUrl);

    if(team != null && team != 'undefined' && team != "") {
      team.users =  [...team.users, userUID];
    }
    else {
      team.users =  [userUID];
    }

    let teamSaveResult = await saveUpdateTeam(teamnameFromUrl, team);
    console.log(teamSaveResult);
  }

  // Saving/updating user
  let userSaveResult = await saveUpdateUser(userUID, userData);
  console.log(userSaveResult);
  
  window.history.pushState("object or string", "Slack", url.split("?")[0]);

  return result;
}