import { homePageComponent, homeViewHolderId } from './home/home-view';
import { dashboardComponent, dashboardViewHolderId } from './dashboard/dashboard-view';
import { createTeamViewHolderId, createTeamComponent } from './team-create/team-create-view';
import { inivitationViewHolderId, invitationComponent, mailSentBody } from './invitation/invitation-view';
import { Email } from './invitation/smtp';
import { submitTeamCreateForm, getTeam } from './team-create/team-create-service';
import profileViewComponent from './profile/profileView';
import { getCurrentUserData, saveUpdateUserProfile } from './profile/profileService';
import { checkAuthStateChange, gitLogin, gitLogout } from '../../../../firebase/git-login';
import { saveUpdateUser, getCurrentUserDetails, saveUpdateTeam } from '../../../../firebase/onboarding-db';
import { getAllChannels, getAllUsers } from '../collaboration/userSetting/userSettingService';
import { store } from './profileReducer';

store.subscribe(() =>{
  var currentState = store.getState();
  localStorage["current_user"] = JSON.stringify(currentState);  
 });

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
const teamnameFromUrl = decodeURIComponent(getUrlParameter('teamname'));
const url = window.location.href;
console.log(teamnameFromUrl);

export function createInvitationComponent() {
  const form = document.getElementById('create-team-form');
  let teamName;
  Array.from(form.elements).forEach((element) => {
    // console.log(element.nodeName);
    // console.log(`${element.name}=${element.value}`);
    if (element.id.toString() === 'teamName') {
      teamName = element.value;
      console.log(`teamname-${teamName}`);
    }
  });
  // const output = '<p>Please click on the below provided link to join Slack</p><br/><a href="https://www.asdf.com">Join Slack</a>';
  const invitComponent = invitationComponent();
  const maxfields = 10;
  let x = 1;
  invitComponent.querySelector('.add_button').addEventListener('click', (e) => {
    e.preventDefault();
    if (x < maxfields) {
      x += 1;
      $('.container1').append('<div class="d-flex pt-3"><input type="text" class="form-control" placeholder="enter email id"/><button class="delete btn btn-danger">Delete</button></div>'); // add input box
    } else {
      alert('You Reached the limits');
    }
    $('.container1').on('click', '.delete', function (e1) {
      e1.preventDefault();
      $(this).parent('div').remove(); x -= 1;
    });
  });
  invitComponent.querySelector('.skip_button').addEventListener('click', (e) => {
    e.preventDefault();
    proceedNext(teamName,`Skipped inivitation for team ${teamName}`);
  });
  invitComponent.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    const recieverarr = [];
    $('form#formid :input[type=text]').each(function () {
      // const input = $(this); // This is the jquery object of the input, do what you will
      const reciever = $(this).val().trim();
      if (reciever !== '' && reciever !== undefined) {
        console.log(`dfdf-${reciever}`);
        recieverarr.push(reciever);
        const appUrl = window.location.href;
        const redireURL = `${appUrl}?teamname=${teamName}`;// &useremail=${reciever}`;
        const output = `<p>Please click on the below provided link to join Slack</p><br/><a href="${redireURL}">Join Slack</a>`;
        Email.send('slackmailing@gmail.com',
          reciever,
          'Invitation to join slack',
          output,
          'smtp.gmail.com',
          'slackmailing@gmail.com',
          'Slack@246');
      }
    });
    if (typeof recieverarr !== 'undefined' && recieverarr.length > 0) {
      console.log(recieverarr);
      //const sentmailComponent = mailSentBody();
      //$(`#${inivitationViewHolderId}`).empty().append(sentmailComponent);
      proceedNext(teamName,`Inivitation for team ${teamName} sent to all the recipients`);
    }
  });
  $(`#${inivitationViewHolderId}`).empty().append(invitComponent);
  return invitComponent;
}
export function proceedNext(teamName,inputmessage) {
  alert(inputmessage);
  //do next
}
document.querySelector('#user-profile').addEventListener('click', () => {
  // const tempCurrUsrData;
  getCurrentUserData().then((data) => {
    // const tempCurrUsrData = data;
    console.log(`user data >>>>>>>>>>>>>>>>>>>>>${data.profilePicture}`);
    $(`#${dashboardViewHolderId}`).empty().append(profileViewComponent(data));

    $('#updateUserDataBtn').click(() => {
      const userName = document.getElementById('userName').value;
      const email = document.getElementById('mailId').value;
      console.log("calling update>>>>"+userName+"-----"+email);
      //saveUpdateUserProfile(userName, email);

      saveUpdateUserProfile(userName, email).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(`Error in saving/updating user: ${error.toString()}`);
      });
    });

    $('#closeBtn').click(() => {
      $( ".editProfileDiv" ).hide();
      createDashboardView();
    });
  });
});


export async function createTeamFormView() {
  const teamName = document.getElementById('team-name').value;
  // console.log(`value:${teamName}`);

  if (teamName === '') {
    alert('Please provide a team name');
  } else {
      getTeam(teamName).then((response) => {
        console.log(response);
        if(response === null || response === "")
        {
          const cTeamComp = createTeamComponent(teamName);
          cTeamComp.querySelector('#form-submit-cancel').addEventListener('click', () => { createDashboardView(); });
          cTeamComp.querySelector('#form-submit').addEventListener('click', () => {
            submitTeamCreateForm();
            createInvitationComponent();
          });
          $(`#${createTeamViewHolderId}`).empty().append(cTeamComp);
        }
        else
        {
          alert("Team "+teamName+" already exists");
        }
      }, (error) => {
        console.log(error);
      });
  }
}

export function homeComponentView() {
  const homeComp = homePageComponent();
  $(`#${homeViewHolderId}`).empty().append(homeComp);
  document.querySelector('#git-login').addEventListener('click', () => { userGitLogin(); });
  document.querySelector('#git-login').disabled = false;
  // document.querySelector('#git-signout').classList.add('d-none');
  // document.querySelector('#user-profile').classList.add('d-none');
  $("#user-settings").addClass('d-none');
  $('#signupContainer').show();
  $('#chatContainer, #searchContainer, #notificationFilter, #notificationCounter').hide();

  return homeComp;
}

export function createDashboardView() {
  const dashComponent = dashboardComponent();
  $(`#${dashboardViewHolderId}`).empty().append(dashComponent);
  document.querySelector('#create-team').addEventListener('click', () => { createTeamFormView(); });
  document.querySelector('#git-signout').addEventListener('click', () => { userGitLogout(); });
  // document.querySelector('#git-signout').classList.remove('d-none');
  // document.querySelector('#user-profile').classList.remove('d-none');
  $("#user-settings").removeClass('d-none');
  $("#searchContainer, #notificationFilter, #notificationCounter").show();
  getTeamsOfCurrentUser();

  return dashComponent;
}

export function getTeamsOfCurrentUser() {
  const currentUser = getCurrentUserDetails();
  currentUser.then((response) => {
    if (response.teams != null && response.teams.length > 0) {
      $('#teamsDisplayHeader').empty().append("You're already a member of these Slack workspaces:");
      $('#teamsDisplay').empty();
      $.each(response.teams, (k, v) => {
        $('#teamsDisplay').append(`<a class="team-link" data-team="${v}">${v}</a>`);
      });

    }
  }, (error) => {
    console.log(error);
    $('#teamsDisplayHeader').empty().append("You're not of part of any Slack workspace yet.");
  });
}

$(document).on("click", ".team-link", function(){
  var teamName = $(this).data('team');
    $("#chatContainer").show();
    $('#signupContainer').hide();

    const obj = store.getState();
    obj.user.currentTeam.teamName = teamName;
    console.log("***************************"+JSON.stringify(obj));
    store.dispatch({type: "LOGIN", obj});

    getAllChannels(teamName);
    getAllUsers(teamName);
  // alert($(this).data('team'));
});

export function userGitLogin() {
  const loggedUser = gitLogin();
  loggedUser.then((response) => {
    // console.log(response);

    createDashboardView();


    const userData = {
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

    const userUID = response.user.uid;

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

    if (teamnameFromUrl != 'undefined' && teamnameFromUrl != "") {
      console.log(`Adding to team: ${teamnameFromUrl}`);
      let currentUserDetails = getCurrentUserDetails().then((response) => {
        if(response === "")
        {
          console.log("New user");
          userData.teams.push(teamnameFromUrl);
        }
        else
        {
          console.log("Updating user teams");
          if(currentUserDetails.teams != 'undefined' && currentUserDetails.teams != "" && currentUserDetails.teams != null) {
            userData.teams.push(...currentUserDetails.teams, teamnameFromUrl);
          }else{
            userData.teams.push(teamnameFromUrl);
          }
        }

        let team = {};
        getTeam(teamnameFromUrl).then((res) => {
          if(res.users != 'undefined' && res.users != "" && res.users != null) {
            team.users =  [...res.users, userUID];
          }else{
            team.users =  [userUID];
          }

          console.log(teamnameFromUrl);
          console.log(team);
          
       // const currentUsrData = callCurrentUserData(userUID,userData,null);       
       // console.log("curret user val>>>>>>>>>>>>>>>>>"+currentUsrData);
       // store.dispatch({type: "LOGIN", currentUsrData});

          saveUpdateTeam(teamnameFromUrl, team).then((r) => {console.log(r)});
        }, (error) => {
          console.log(error);
        });


        //console.log(userData);
        // Saving/updating current logged in user
        saveUpdateUser(userUID, userData).then((res) => {


          console.log(res);
          getTeamsOfCurrentUser();
        }, (error) => {
          console.log(`Error in saving/updating user: ${error.toString()}`);
          gitLogout();
          homeComponentView();
        });

      }, (err) => {
        console.log(err)
      });
    }
    else
    {
      //console.log(userData);
      // Saving/updating current logged in user
      saveUpdateUser(userUID, userData).then((res) => {
       
       // const currentUsrData = callCurrentUserData(userUID,userData,null);
       // console.log("curret user val>>>>>>>>>>>>>>>>>"+currentUsrData);
       // store.dispatch({type: "LOGIN", currentUsrData});

        console.log(res);
      }, (error) => {
        console.log(`Error in saving/updating user: ${error.toString()}`);
        gitLogout();
        homeComponentView();
      });
    }

    window.history.pushState("object or string", "Slack", url.split("?")[0]);
  }, (error) => {
    console.log(error.toString());
    gitLogout();
    homeComponentView();
  });
}

export function userGitLogout() {
  localStorage.removeItem("current_user");
  store.dispatch({type: "LOGOUT_USER", payload: null});
  gitLogout();
  homeComponentView();
}
export function userLoginStatus() {
  const u = checkAuthStateChange();
  u.then((response) => {
    console.log(response);
    createDashboardView();
  }, (error) => {
    console.log(error.toString());
    homeComponentView();
  });
}

export function init() {
  userLoginStatus();
}

window.onload = init;
