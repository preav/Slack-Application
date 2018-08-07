import { homePageComponent, homeViewHolderId } from './home/home-view';
import { dashboardComponent, dashboardViewHolderId } from './dashboard/dashboard-view';
import { createTeamViewHolderId, createTeamComponent } from './team-create/team-create-view';
import { inivitationViewHolderId, invitationComponent, mailSentBody } from './invitation/invitation-view';
import { Email } from './invitation/smtp';
import { submitTeamCreateForm } from './team-create/team-create-service';
import profileViewComponent from './profile/profileView';
import { getCurrentUserData, updateUserData } from './profile/profileService';


export function createInvitationComponent() {
  const form = document.getElementById('create-team-form');
  let teamName;
  Array.from(form.elements).forEach((element) => {
    // console.log(element.nodeName);
    // console.log(`${element.name}=${element.value}`);
    if (element.nodeName.toLowerCase() === 'input') {
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
  invitComponent.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    const recieverarr = [];
    $('form#formid :input[type=text]').each(function () {
      // const input = $(this); // This is the jquery object of the input, do what you will
      const reciever = $(this).val().trim();
      if (reciever !== '' && reciever !== undefined) {
        console.log(`dfdf-${reciever}`);
        recieverarr.push(reciever);
        const redireURL = `https://www.asdf.com?teamname=${teamName}&useremail=${reciever}`;
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
      const sentmailComponent = mailSentBody();
      $(`#${inivitationViewHolderId}`).empty().append(sentmailComponent);
    }
  });
  $(`#${inivitationViewHolderId}`).empty().append(invitComponent);
  return invitComponent;
}


document.querySelector('#user-profile').addEventListener('click', () => {
  // const tempCurrUsrData;
  getCurrentUserData().then((data) => {
    // const tempCurrUsrData = data;
    console.log(`user data >>>>>>>>>>>>>>>>>>>>>${data.email}`);
    $(`#${dashboardViewHolderId}`).empty().append(profileViewComponent(data));

    $('#updateUserDataBtn').click(() => {
      const userName = document.getElementById('userName').value;
      const email = document.getElementById('mailId').value;
      console.log("calling update>>>>"+userName+"-----"+email);
      updateUserData(userName, email);
      console.log(data);
    });
  });
});

export function createTeamFormView() {
  const teamName = document.getElementById('team-name').value;
  // console.log(`value:${teamName}`);

  if (teamName === '') {
    alert('Please provide a team name');
  } else {
    const cTeamComp = createTeamComponent(teamName);
    // cTeamComp.querySelector('#form-submit-cancel').
    // addEventListener('click', () => { createDashboardView(); });
    cTeamComp.querySelector('#form-submit').addEventListener('click', () => {
      submitTeamCreateForm();
      createInvitationComponent();
    });
    $(`#${createTeamViewHolderId}`).empty().append(cTeamComp);
  }
}

export function homeComponentView() {
  const homeComp = homePageComponent();
  // homeComp.querySelector('#git-login').addEventListener('click', () => { gitLogin(); });
  $(`#${homeViewHolderId}`).empty().append(homeComp);
  return homeComp;
}

export function createDashboardView() {
  const dashComponent = dashboardComponent();
  // dashComponent.querySelector('#git-signout').addEventListener('click', () => { gitLogout(); });
  dashComponent.querySelector('#create-team').addEventListener('click', () => { createTeamFormView(); });
  $(`#${dashboardViewHolderId}`).empty().append(dashComponent);
  return dashComponent;
}
