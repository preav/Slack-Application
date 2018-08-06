import createHTMLElement from '../onboarding-service';

export const dashboardViewHolderId = 'playGround';

export function dashboardComponent() {
  const dashboardElement = createHTMLElement(
    `<div class="dashboard d-flex flex-fill justify-content-center">
        <div class="col-5">    
            <div class="mt-5">
                <div class="mt-2">
                    <img src="./client/src/img/create_a_team.png" alt="Create a team">
                    <h1>Create a new workspace</h1>
                    <p>To make a workspace from scratch, please confirm your email address.</p>
                    <div class="d-flex justify-content-center flex-row">
                        <input type="text" class="form-control mr-3" placeholder="your-team-name"  id="team-name" /> 
                        <button class="btn btn-outline-success" id="create-team">Create Team</button>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div>
                    <h1>Your workspaces</h1>
                    <p id="teamsDisplayHeader">You're already a member of these Slack workspaces:</p>
                    <div id="teamsDisplay" class="d-flex justify-content-center flex-column">
                        <!-- <a class="team-link" href="javascript:void(0)">Your Team One</a> -->
                    </div>
                </div>
            </div>
        </div>  
    </div>`,
  );

  return dashboardElement;
}
