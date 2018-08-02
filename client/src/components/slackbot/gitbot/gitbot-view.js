// import { removeWidgetFromState } from '../controller/remove-widget'
// import { createRepositoryOnGithub } from '../controller/create-repo'

// function to create widget for create repository
export const createRepoWidget = function (recastRepoName, panId) {
  return `<div class='createGithubRepo panBackground playGroungDiv' id='createGithubRepo_${panId}' >
    <div class='panComponents'>
    <span id='close' onclick='removeWidgetFromState(${panId})'>x</span>
        <div class='form-row'>
            <div class='form-group col-md-12'>
                <label for='repositoryName'>Repository Name: </label>
                <input type='text' class='form-control' id='repositoryName_${panId}' name='repositoryName' value="${recastRepoName}" />
            </div>
        </div>
        <div class='form-row'>
            <div class='form-group'>
                <label for='commandComment'>Comment: </label>
                <textarea class='form-control commandComment' id='commandComment_${panId}' name='commandComment'></textarea>
            </div>
        </div>
  
        <button type='submit' class='btn btn-primary' onclick='createRepositoryOnGithub(document.getElementById("repositoryName_${panId}").value, document.getElementById("commandComment_${panId}").value, ${panId});'>Create Github Repository</button>
    </div>
    </div>`;
};

  // function to respond back after repository created
export const createRepoResponse = function (repoName, panId, dateTime) {
  return `<div class='createGithubRepo panBackground playGroungDiv' id='createGithubRepo_${panId}' >
        <p>Slack has created repository (${repoName}) in your github account</p>
        <span>${dateTime}</span>
    </div>`;
};

  // function to respond back after issue created
export const createIssueResponse = function (repoName, issueName, issueNumber, panId) {
  return `<div class='createGithubRepo panBackground playGroungDiv' id='createGithubIssue_${panId}' >
        <p>Slack has created a new issue number -${issueNumber} (${issueName}) in repository (${repoName}) in your github account</p>
    </div>`;
};

  // function to respond back after adding collaborator
export const addCollabResponse = function (collabUser, panId) {
  return `<div class='createGithubRepo panBackground playGroungDiv' id='addCollab_${panId}' >
        <p>Sure, Slack has set invitation to (${collabUser}).</p>
    </div>`;
};

  // function to respond back after getting all list for a repository
export const listDownIssues = function (repoName, panId) {
  return `<div class="displayAllIssues panBackground playGroungDiv" id="displayAllIssues">
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

// function to show error message
export const showErrorMsg = function (err, dateTime) {
  return `
        <div id="fail_msg" class="playGroungDiv"><p>${err}</p><span>${dateTime}</span>
        </div>
    `;
};

// function to show success message
export const showSuccessMsg = function (success, dateTime) {
  return `
        <div id="success_msg" class="playGroungDiv"><p>${success}</p><span>${dateTime}</span>
        </div>
    `;
};
