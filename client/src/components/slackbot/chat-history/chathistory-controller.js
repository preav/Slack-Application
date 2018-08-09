import { getChatHistoryForUserService,
  getReminderForUserService } from './chathistory-service';
import { showChatHistory, showUserReminder } from './chathistory-view';

// function to create otherbot
export const getUserChatHistory = function (userId) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create otherbot in firebase database
  getChatHistoryForUserService(userId).then((chathistory) => {
    // converting object to array
    let tempObj = chathistory;
    const chatHistoryArray = Object.keys(tempObj).map(k => tempObj[k])
    if (chatHistoryArray.length != 0) {
      for(var i = 0; i <= chatHistoryArray.length - 1; i++){
        const eachObject = chatHistoryArray[i]
        const chatHistoryArrEachObjArr = Object.keys(eachObject).map(j => eachObject[j])
        for(var objKey = 0; objKey <= chatHistoryArrEachObjArr.length - 1; objKey++){
          const newRepowidget = document.createElement('div');
          if(chatHistoryArrEachObjArr[objKey].widgetName === 'remindersent') {
            newRepowidget.innerHTML = showUserReminder(chatHistoryArrEachObjArr[objKey]);
          } else{
            newRepowidget.innerHTML = showChatHistory(chatHistoryArrEachObjArr[objKey]);
          }
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
        }
      }
    }
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history or user Reminder List from firebase database..');
  });
};
