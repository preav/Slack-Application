// function to respond back after repository created
export const createRepoResponse = function (widgetData) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${widgetData.id}' >
        <span><strong><a href="#">You</a></strong></span>
        <p>${widgetData.commandEntered}</p>
        <span><strong>A few seconds ago<strong></span>
        </div>
        <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${widgetData.id}' >
        <span><strong>Slackbot</strong></span>
        <p>I have created repository (${widgetData.repositoryName}) on github.</p>
        <span><strong>A few seconds ago<strong></span>
    </div>`;
};

  // function to respond back after issue created
export const createIssueResponse = function (widgetData) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubIssue-you_${widgetData.id}' >
          <span><strong><a href="#">You</a></strong></span>
          <p>${widgetData.commandEntered}</p>
          <span><strong>A few seconds ago<strong></span>
          </div>
          <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubIssue_${widgetData.id}' >
          <span><strong>Slackbot</strong></span>
          <p>I have created an issue (${widgetData.issueName}) on repository (${widgetData.repositoryName})</p>
          <span><strong>A few seconds ago<strong></span>
      </div>`;
};

  // function to respond back after adding collaborator
export const addCollabResponse = function (collabUser, panId) {
  return `<div class='createGithubRepo panBackground playGroungDiv-bot' id='addCollab_${panId}' >
        <p>Sure, Slack has set invitation to (${collabUser}).</p>
    </div>`;
};

// function to show error message for creating repository in github
export const showErrorMsg = function (err, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' >
        <span><strong><a href="#">You</a></strong></span>
        <p>${commandEntered}</p>
        <span><strong>A few seconds ago<strong></span>
        </div>
        <div id="fail_msg" class="playGroungDiv-bot">
        <span><strong>Slackbot</strong></span>
        <p>${err}</p><span><strong>A few seconds ago<strong></span>
        </div>
    `;
};

// function to show error message for creating issue for a repository in github
export const showErrorMsgIssueCreate = function (err, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' >
          <span><strong><a href="#">You</a></strong></span>
          <p>${commandEntered}</p>
          <span><strong>A few seconds ago<strong></span>
          </div>
          <div id="fail_msg" class="playGroungDiv-bot">
          <span><strong>Slackbot</strong></span>
          <p>${err}</p><span><strong>A few seconds ago<strong></span>
          </div>
      `;
};

// function to show success message
export const showSuccessMsg = function (success, creatDate, creatTime) {
  return `
        <div id="success_msg" class="playGroungDiv-bot"><p>${success}</p><span><strong>A few seconds ago<strong></span>
        </div>
    `;
};
