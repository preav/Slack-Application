import { homePageComponent, homeViewHolderId } from './home/home-view';
import { dashboardComponent, dashboardViewHolderId } from './dashboard/dashboard-view';
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
  $(`#${dashboardViewHolderId}`).empty().append(dashComponent);
  return dashComponent;
}

export default function createComponents(url) {
  switch (url) {
    case 'home':
      homeComponentView();
      break;
    case 'dashboard':
      // createDashboardView();
      break;
    default:
  }
}

function init() {
  // createComponents('home');
  // userLoginStatusCheck();
  // console.log('Hello');
}

window.onload = init;
