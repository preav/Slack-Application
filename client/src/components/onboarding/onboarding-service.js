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

export async function saveUpdateUserAfterLogin(userUID, response)
{
  const result = "success";
  let curUser = null;
  try { curUser = await getCurrentUserDetails(); }  catch(ex)  { throw ex; };
  const teamnameFromUrl = decodeURIComponent(getUrlParameter('teamname')).trim();
  const url = window.location.href;
  //const userUID = response.user.uid;
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

  console.log("Teams: "+userData.teams);

  if (teamnameFromUrl != null && teamnameFromUrl != 'undefined' && teamnameFromUrl != "") 
  {
    console.log(`Adding team ${teamnameFromUrl} to user`);

    if(userData.teams != null && userData.teams != 'undefined' && userData.teams != "") {
      console.log("Updating teams of user");
      // Check if team already exist or not
      let teamExist = containsInArray(userData.teams, teamnameFromUrl);
      console.log(`teamExist: ${teamExist}`);
      if(teamExist === false) 
      {
        userData.teams = [...userData.teams, teamnameFromUrl]; 
      }     
    }
    else {
      console.log("Adding new/first team to user");
      userData.teams = [teamnameFromUrl];
    }

    // Updating user details in team
    let team = null;
    try { team = await getTeamDetail(teamnameFromUrl); } catch(ex) { console.log(ex); throw ex };

    if(team != null && team != 'undefined' && team != "") {
      // Check if userId already exist or not
      let userExist = containsInArray(team.users, userUID);
      console.log("userExist: "+userExist);
      if(userExist === false)
      {
        team.users =  [...team.users, userUID];
      }
    }
    else {
      team = {};
      team.users =  [userUID];
    }

    let teamSaveResult = null;
    try { teamSaveResult = await saveUpdateTeam(teamnameFromUrl, team); } catch(ex) { throw ex };
    console.log(teamSaveResult);
  }

  // Saving/updating user
  let userSaveResult = null;
  try { userSaveResult = await saveUpdateUser(userUID, userData); } catch(ex) { throw ex };
  console.log(userSaveResult);
  
  window.history.pushState("object or string", "Slack", url.split("?")[0]);

  return result;
}

export function containsInArray(arrayObject, elementToSearch)
{
  var exist = false;
  Array.from(arrayObject).forEach(function(element) 
  {
    if(element === elementToSearch)
      exist = true;
  });
  return exist;
}