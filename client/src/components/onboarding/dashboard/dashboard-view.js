import createHTMLElement from '../onboarding-service';

export const dashboardViewHolderId = 'playGround';

export function dashboardComponent() {
  const dashboardElement = createHTMLElement(
    `<div>
        <div>
            <span>Welcome to dashboard</span>
        </div>
        <div>
            <button id="git-signout" class="btn btn-success">Sign out</button>
        </div>        
    </div>`,
  );

  return dashboardElement;
}
