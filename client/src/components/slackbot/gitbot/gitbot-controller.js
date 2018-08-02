import { createRepoFirebaseService, createRepoGithubService } from './gitbot-service';
// import { createRepoWidget } from './gitbot-view';
import { createRepoResponse, showErrorMsg, showSuccessMsg } from './gitbot-view';

export const createRepository = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service function to create repository in github
  createRepoGithubService(widgetData.repositoryName).then((gitCreateRepoRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (typeof gitCreateRepoRes.id !== 'number') {
      errorOrSuccDiv.innerHTML = showErrorMsg(`Repository (${widgetData.repositoryName}) 
      already exists on your account.`, widgetData.postedOn);
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
    } else {
      // calling service to save widget state into firebase database
      createRepoFirebaseService(widgetData).then((response) => {
        console.log(`gitbot-controller.js = ${response}`);
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = createRepoResponse(widgetData.repositoryName,
          widgetData.id, widgetData.postedOn);
        createRepoWidgetEle.appendChild(newRepowidget);
      }).catch((err) => {
        console.log(err, 'error in gitbot-controller.js ...');
      });
      // errorOrSuccDiv.innerHTML = showSuccessMsg(`Repository ${widgetData.repositoryName}
      // is successfully created on your account.`);
      // createRepoWidgetEle.appendChild(errorOrSuccDiv);
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating repository in github..');
  });
};
