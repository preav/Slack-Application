const firebase = require('firebase');
import { database } from '../../../../../firebase/firebase';

// function to save to-do-list task data into firebase database -- firebase
export const createTodolistService = widgetData => new Promise((resolve, reject) => {
  const collectionKey = database
  .ref(`SlackXT/slackbot/${widgetData.userId}/todolist`).push({
    id: widgetData.id,
    commandEntered: widgetData.commandEntered,
    widgetName: widgetData.widgetName,
    task: widgetData.task,
    userId: widgetData.userId,
    creatDate: widgetData.creatDate,
    creatTime: widgetData.creatTime,
    currentdateTime: widgetData.currentdateTime,
    botResponse: widgetData.botResponse,
    taskCompleted: widgetData.taskCompleted,
  }).getKey();

  console.log('collectionKey = ', collectionKey);
  if (collectionKey !== '') {
    widgetData.id = collectionKey;
    console.log('to-do-list task saved successfully...', widgetData.id);
    resolve(widgetData);
  } else {
    reject(new Error(`Error in saving your data into firebase database. 
      widget data is ${widgetData}`));
    console.log('There is error while saving data into firebase...');
  }
});

// function to update slack response for to-do-list task to firebase database -- firebase
export const updateSlackBotTodolistResponse = (widgetData, botResponse) => {
  widgetData.botResponse = botResponse;
  const updateCollectionKey = widgetData.id;
  const updates = {};
  updates[`SlackXT/slackbot/${widgetData.userId}/todolist/${updateCollectionKey}`] = widgetData;
  return database.ref().update(updates);
};

// function to get user's todo list from firebase database -- firebase
export const getTodolistForUserService = userId => new Promise((resolve, reject) => {
  database.ref(`SlackXT/slackbot/${userId}/todolist`).once('value')
  .then((snapshot) => {
    const todolistData = snapshot.val();
    if (todolistData !== '') {
      console.log('todolist retrieved successfully...', todolistData);
      resolve(todolistData);
    } else {
      reject(new Error(`Error occured while retrieving todolist for 
        userId: ${userId} from firebase database.`));
      console.log('There is error while retrieving todolist from firebase database...');
    }
  });
});

// function to mark completed or uncompleted or delete the task from todolist -- firebase
// export const markOrUnmarkOrDelete = (action, taskId, userId) =>  new Promise((resolve, reject) =>{
//   if(action === 'checked'){
//     action = 'unchecked';
//   }else if(action === 'unchecked'){
//     action = 'checked';
//   }

//   if (action === 'remove') {
//     resolve(database.ref()
//     .child(`SlackXT/slackbot/${userId}/todolist/${taskId}`).remove());
//   } else if(action === 'checked' || action === 'unchecked'){
//     //update todolist task
//     var rawData=database.ref().child(`SlackXT/slackbot/${userId}/todolist/${taskId}`);
//     return rawData.update({
//       taskCompleted: action
//     }).then((updateResponse) => {
//       // get todolist task to refresh task status in todolist
//     database.ref(`SlackXT/slackbot/${userId}/todolist/${taskId}`).once('value')
//       .then((snapshot) => {
//         const todolistTask = snapshot.val();
//         if (todolistTask !== '') {
//           console.log(`todolist id ${taskId} retrieved successfully...`, todolistTask);
//           resolve(todolistTask);
//         } else {
//           reject(new Error(`Error occured while retrieving todolist task for 
//             taskId: ${taskId} from firebase database.`));
//           console.log('There is error while retrieving todolist task by taskid from firebase...');
//         }
//       });
//     });
//   }
// };

// function to mark completed or uncompleted or delete the task from todolist -- firebase
export const markOrUnmarkOrDelete = ( (action, taskId, userId)  => {
  if(action === 'checked'){
    action = 'unchecked';
  }else if(action === 'unchecked'){
    action = 'checked';
  }
  if (action === 'remove') {
    database.ref().child(`SlackXT/slackbot/${userId}/todolist/${taskId}`).remove();
  } else if (action === 'checked' || action === 'unchecked') {
    var rawData=database.ref().child(`SlackXT/slackbot/${userId}/todolist/${taskId}`);
    return rawData.update({
      taskCompleted: action
    });
  }
});
