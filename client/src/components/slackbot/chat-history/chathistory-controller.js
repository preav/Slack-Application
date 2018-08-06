import { getChatHistoryForUserService } from './chathistory-service';
import { showChatHistory } from './chathistory-view';

// function to create otherbot
export const getUserChatHistory = function (userId) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create otherbot in firebase database
  getChatHistoryForUserService(userId).then((chathistory) => {
    //alert('chathistory');
    const errorOrSuccDiv = document.createElement('div');
    if (chathistory !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = showChatHistory(chathistory);
      createWidgetEle.appendChild(newRepowidget);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
    }
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history from firebase database..');
  });
};
