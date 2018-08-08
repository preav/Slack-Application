import { getChatHistoryForUserService } from './chathistory-service';
import { showChatHistory } from './chathistory-view';

// function to create otherbot
export const getUserChatHistory = function (userId) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create otherbot in firebase database
  getChatHistoryForUserService(userId).then((chathistory) => {
    // converting object to array
    const chatHistoryArray = Object.keys(chathistory).map(i => chathistory[i])
    if (chatHistoryArray.length != 0) {
      for(var i = chatHistoryArray.length - 1; i >= 0; --i){
        const chatHistoryObject = chatHistoryArray[i];
        const chatHistoryObjectArray =Object.keys(chatHistoryObject).map(k=>chatHistoryObject[k]);
        for(var j = 0; j <= chatHistoryObjectArray.length - 1; j++){
          const newRepowidget = document.createElement('div');
          newRepowidget.innerHTML = showChatHistory(chatHistoryObjectArray[j]);
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
        }
      }
    }
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history from firebase database..');
  });
};
