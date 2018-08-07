import {
  createRepoFirebaseService, createRepoGithubService,
  createIssueGithubService, updateSlackBotResponse,
} from './gitbot-service';
import {
  createRepoResponse, showErrorMsg, createIssueResponse, showErrorMsgIssueCreate,
} from './gitbot-view';

// function to create repository
export const createRepository = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service function to create repository in github
  createRepoGithubService(widgetData.repositoryName).then((gitCreateRepoRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (typeof gitCreateRepoRes.id !== 'number') {
      errorOrSuccDiv.innerHTML = showErrorMsg(
        `Repository (${widgetData.repositoryName}) already exists on your account.`,
        widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
    } else {
      // calling service to save widget state into firebase database
      createRepoFirebaseService(widgetData).then((response) => {
        console.log(`gitbot-controller.js = ${response}`);
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = createRepoResponse(widgetData.repositoryName,
          widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered);
        createRepoWidgetEle.appendChild(newRepowidget);
        createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
        // update firebase database with slackbot response
        updateSlackBotResponse(widgetData,
          `Slack has created repository (${widgetData.repositoryName}) in your github account`);
      }).catch((err) => {
        console.log(err, 'error in gitbot-controller.js ...');
      });
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating repository in github..');
  });
};

// function to create issue
export const createRepositoryIssue = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service function to create issue in github
  createIssueGithubService(widgetData.repositoryName,
    widgetData.issueName).then((gitCreateIssueRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (typeof gitCreateIssueRes.id !== 'number') {
      errorOrSuccDiv.innerHTML = showErrorMsgIssueCreate('Due to tecnical glitch Github issue '
      + 'cannot be created.',
      widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered);
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
    } else {
      // calling service to save widget state into firebase database
      createRepoFirebaseService(widgetData).then((response) => {
        console.log(`createRepositoryIssue() in gitbot-controller.js = ${response}`);
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = createIssueResponse(widgetData.repositoryName,
          widgetData.issueName,
          widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered);
        createRepoWidgetEle.appendChild(newRepowidget);
        createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      }).catch((err) => {
        console.log(err, 'error in gitbot-controller.js ...');
      });
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating repository in github..');
  });
};
