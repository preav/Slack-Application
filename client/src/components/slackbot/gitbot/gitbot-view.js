// function to respond back after repository created
export const createRepoResponse = function (repoName, panId, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${panId}' >
        <span><strong><a href="#">You</a></strong></span>
        <p>${commandEntered}</p>
        <span>On ${creatDate} at ${creatTime}</span>
        </div>
        <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${panId}' >
        <span><strong>Slackbot</strong></span>
        <p>Slack has created repository (${repoName}) in your github account</p>
        <span>On ${creatDate} at ${creatTime}</span>
    </div>`;
};

  // function to respond back after issue created
export const createIssueResponse = function (repoName, IssueName, panId,
  creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubIssue-you_${panId}' >
          <span><strong><a href="#">You</a></strong></span>
          <p>${commandEntered}</p>
          <span>On ${creatDate} at ${creatTime}</span>
          </div>
          <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubIssue_${panId}' >
          <span><strong>Slackbot</strong></span>
          <p>Slack has created an issue (${IssueName}) on repository (${repoName}) in your github account</p>
          <span>On ${creatDate} at ${creatTime}</span>
      </div>`;
};

  // function to respond back after adding collaborator
export const addCollabResponse = function (collabUser, panId) {
  return `<div class='createGithubRepo panBackground playGroungDiv-bot' id='addCollab_${panId}' >
        <p>Sure, Slack has set invitation to (${collabUser}).</p>
    </div>`;
};

  // function to respond back after getting all list for a repository
export const listDownIssues = function (repoName, panId) {
  return `<div class="displayAllIssues panBackground playGroungDiv-bot" id="displayAllIssues">
      <div class="panComponents">
      <div> Issues for repository - ${repoName}</div>
      <span id='close' onclick='removeWidgetFromState(${panId})'>x</span>
          <table class="table table-striped" id="issuesTable">
              <thead>
                  <tr>
                      <th>Select to Comment</th>
                      <th>Issue No.</th>
                      <th>Issue Title</th>
                      <th>Issue Status</th>
                      <th>Issue Label</th>
                      <th>Repository URL</th>
                      <th>Issue URL</th>
                      <th>Created Time</th>
                  </tr>
              </thead>
              <tbody id="tableBody"></tbody>
          </table>
          <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="cmtOnIssue">Comment on Issue: </label>
                  <textarea class="form-control commandComment" id="cmtOnIssue" name="cmtOnIssue"></textarea>
              </div>
              <button type="submit" class="btn btn-primary float-left" onclick="submitIssueCommentOnGithub('${repoName}', document.getElementById('cmtOnIssue').value, ${panId});">
                  Submit Issue Comment</button>
              <button type="submit" class="btn btn-success float-right" onclick="showLastComment('${repoName}', ${panId});">
                  Show Last Comment of Selected Issue</button>
              <button type="submit" class="btn btn-warning float-right" onclick="javascript:closeIssue('${repoName}', ${panId});">
                  Close Selected Issue</button>
          </div>
  
          <div class="col-sm-12 col-md-12 lastIssueComment" id="lastIssueComment">
              <div class="alert alert-info">
                  <span class="glyphicon glyphicon-info-sign"></span>
                  <strong id="lastIssueHeader"></strong>
                  <hr class="message-inner-separator">
                  <p id="actualIssueCmt"></p>
              </div>
          </div>
          <input type="hidden" id="repo_name" />
      </div>
  </div>`;
};

// function to show error message for creating repository in github
export const showErrorMsg = function (err, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' >
        <span><strong><a href="#">You</a></strong></span>
        <p>${commandEntered}</p>
        <span>On ${creatDate} at ${creatTime}</span>
        </div>
        <div id="fail_msg" class="playGroungDiv-bot">
        <span><strong>Slackbot</strong></span>
        <p>${err}</p><span>On ${creatDate} at ${creatTime}</span>
        </div>
    `;
};

// function to show error message for creating issue for a repository in github
export const showErrorMsgIssueCreate = function (err, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' >
          <span><strong><a href="#">You</a></strong></span>
          <p>${commandEntered}</p>
          <span>On ${creatDate} at ${creatTime}</span>
          </div>
          <div id="fail_msg" class="playGroungDiv-bot">
          <span><strong>Slackbot</strong></span>
          <p>${err}</p><span>On ${creatDate} at ${creatTime}</span>
          </div>
      `;
};

// function to show success message
export const showSuccessMsg = function (success, creatDate, creatTime) {
  return `
        <div id="success_msg" class="playGroungDiv-bot"><p>${success}</p><span>On ${creatDate} at ${creatTime}</span>
        </div>
    `;
};
