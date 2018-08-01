import { createRepositoryservice } from './gitbot-service';

import { createRepoWidget } from './gitbot-view';

export const createRepository = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('playGround');
  // calling service to save widget state
  createRepositoryservice(widgetData).then((response) => {
    console.log(`gitbot-controller.js = ${response}`);
    const newRepowidget = document.createElement('div');
    newRepowidget.innerHTML = createRepoWidget(widgetData.repositoryName, widgetData.id);
    createRepoWidgetEle.appendChild(newRepowidget);
  }).catch((err) => {
    console.log(err, 'error in gitbot-controller.js ...');
  });
};
