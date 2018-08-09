import { getChatHistoryForUserService,
  getReminderForUserService } from './chathistory-service';
import { showChatHistory, showUserReminder } from './chathistory-view';

// function to create otherbot
export const getUserChatHistory = function (userId) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create otherbot in firebase database
  getChatHistoryForUserService(userId).then((chathistory) => {
    // converting object to array
    let tempObj = chathistory.reminder;
    const chatHistoryArray = Object.keys(tempObj).map(i => tempObj[i])
    if (chatHistoryArray.length != 0) {
      for(var i = chatHistoryArray.length - 1; i >= 0; --i){
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = showChatHistory(chatHistoryArray[i]);
        createWidgetEle.appendChild(newRepowidget);
        createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      }
    }
  }).then(() => {
    getReminderForUserService(userId).then((reminderListForUser) => {
      console.log('reminderListForUser= ',reminderListForUser);
      // converting object to array
      const reminderListForUserArray = Object.keys(reminderListForUser).map(i => reminderListForUser[i])
      for(var i = 0; i < reminderListForUserArray.length; i++){
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = showUserReminder(reminderListForUserArray[i]);
        createWidgetEle.appendChild(newRepowidget);
        createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      }
    });
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history or user Reminder List from firebase database..');
  });
};
