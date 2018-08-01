import { RECAST_API_URL, RECAST_APP_TOKEN } from '../constants/constants';

// // persisting github create repo widget state into database
// export const createRepositoryservice = function (widgetData) {
//   console.log('widgetData in gitbot-service.js ', widgetData);
//   // code calling firebase database
//   // createRepositorydatabseCall(widgetData).then((response) => {
//   //   console.log(`command-line-cotroller.js  recastResponse slug= ${response}`);
//   // }).catch((err) => {
//   //   console.log(err, 'error in command-line-controller.js ...');
//   // });
//   return 'returning from gitbot-service.js';
// };

export const createRepositoryservice = widgetData => new Promise((resolve, reject) => {
  // use database call
  fetch(RECAST_API_URL + widgetData, {
    method: 'post',
    headers: {
      Authorization: `Token ${RECAST_APP_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    res.json().then((data) => {
      resolve(data.results);
    });
  }).catch((err) => {
    // reject(Error("There is error in resolving name of repository from sentence..."));
    reject(err);
    console.log(err, 'There is error in resolving name of repository from sentence...');
  });
});
