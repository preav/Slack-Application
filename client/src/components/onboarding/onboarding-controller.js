import { homePageComponent, homeViewHolderId } from './home/home-view';
import { dashboardComponent, dashboardViewHolderId } from './dashboard/dashboard-view';
import { createTeamViewHolderId, createTeamComponent } from './team-create/team-create-view';

import { submitTeamCreateForm } from './team-create/team-create-service';

import profileViewComponent from './profile/profileView';

export function createTeamFormView() {
  const teamName = document.getElementById('team-name').value;
  // console.log(`value:${teamName}`);

  if (teamName === '') {
    alert('Please provide a team name');
  } else {
    const cTeamComp = createTeamComponent(teamName);
    // cTeamComp.querySelector('#form-submit-cancel').
    // addEventListener('click', () => { createDashboardView(); });
    cTeamComp.querySelector('#form-submit').addEventListener('click', () => { submitTeamCreateForm(); });
    $(`#${createTeamViewHolderId}`).empty().append(cTeamComp);
  }
}
// import { getUserInfo } from './profile/profileService';

// import { gitLogin, gitLogout } from '../../../../firebase/git-login';

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

document.querySelector('#user-profile').addEventListener('click', () => {
  $(`#${dashboardViewHolderId}`).empty().append(profileViewComponent());
  // getUserInfo();
});
