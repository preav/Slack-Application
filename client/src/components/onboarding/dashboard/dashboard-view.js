import createHTMLElement from '../onboarding-service';

export const dashboardViewHolderId = 'playGround';

export function dashboardComponent() {
  const dashboardElement = createHTMLElement(
    `<div>
        <div>
            <span>Welcome to dashboard</span>
        </div>  
    </div>`,
  );

  return dashboardElement;
}
