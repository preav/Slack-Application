import createHTMLElement from '../onboarding-service';

export const createTeamViewHolderId = 'playGround';

export function createTeamComponent(teamName) {
  const createTeamElement = createHTMLElement(
    `<div class="d-flex flex-fill justify-content-center">
        <div class="col-5 d-flex flex-fill flex-column">
            <div class="mt-2 text-center">
                <h1>Create Your Team</h1>
            </div>
            <div class="form-container">
                <form id="create-team-form" action="javascript:void(0)">
                    <div class="form-group">
                        <label for="teamName">Team name:</label>
                        <input type="text" class="form-control" id="teamName" name="teamName" placeholder="Enter team name" value="${teamName}">
                    </div>
                    <div class="form-group">
                        <label for="companyName">Company name:</label>
                        <input type="text" class="form-control" id="companyName" name="companyName" placeholder="Enter company name">
                    </div>
                    <div>
                        <button class="btn btn-outline-success" id="form-submit-cancel">Cancel</button>
                        <button class="btn btn-outline-success" id="form-submit">Submit</button>
                    <div>
                </form>
            </div>
        </div>
    </div>`,
  );

  return createTeamElement;
}
