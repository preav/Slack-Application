// import { recastAPIservice } from '../recastai/recastAPI-service';

// import { createRepository, createRepositoryIssue } from './gitbot-controller';

// export const hitEnter = function (e) {
//   if (e.keyCode === 13) { // checks whether the pressed key is "Enter"
//   // calling recast api
//     recastAPIservice(e.target.value).then((recastResponse) => {
//       console.log(`command-line-cotroller.js  recastResponse slug= ${recastResponse.intents[0].slug}`);
//       const currentdate = new Date();
//       const datetime = `On ${currentdate.getDate()}/${
//         currentdate.getMonth() + 1}/${
//         currentdate.getFullYear()} at ${
//         currentdate.getHours()}:${
//         currentdate.getMinutes()}:${
//         currentdate.getSeconds()}`;
//       if (recastResponse.intents[0].slug === 'create-git-repo') {
//         const widgetData = {
//           id: '2',
//           commandEntered: e.target.value,
//           widgetName: recastResponse.intents[0].slug,
//           repositoryName: recastResponse.entities.git_repo[0].value,
//           userId: '',
//           postedOn: datetime,
//           botResponse: '',
//         };

//         console.log(`widgetData=${widgetData}`);

//         // save createRepository widget state to database code --> calling gitbot-controller
//         createRepository(widgetData);
//       }
//       if (recastResponse.intents[0].slug === 'create-git-issue') {
//         const widgetData = {
//           id: '',
//           commandEntered: e.target.value,
//           widgetName: recastResponse.intents[0].slug,
//           repositoryName: recastResponse.entities.git_repo[0].value,
//           issueName: recastResponse.entities.git_issue[0].value,
//           userId: '',
//           postedOn: datetime,
//           botResponse: '',
//         };

//         console.log(`widgetData=${widgetData}`);

//         // save createRepository widget state to database code --> calling gitbot-controller
//         createRepositoryIssue(widgetData);
//       }
//     }).catch((err) => {
//       console.log(err, 'error in command-line-controller.js ...');
//     });
//   }
// };
