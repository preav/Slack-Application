// import { removeWidgetFromState } from '../controller/remove-widget'
// import { createRepositoryOnGithub } from '../controller/create-repo'

// function to create widget for create repository
export const createRepoWidget = function (recastRepoName, panId) {
// const createRepoWidget = (recastRepoName, panId) => {
  return `<div class='createGithubRepo panBackground' id='createGithubRepo_${panId}' >
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
