import { getChatHistoryForUserService,
  getReminderForUserService } from './chathistory-service';
import { showChatHistory, showUserReminder } from './chathistory-view';

$(document).on("click", "#chatWithSlackbot", function(){
  getUserSlackbotChatHistory();
  $("#enteredCommand").attr('data-slackbot', 'true');
});
 

// function to create otherbot
//export const getUserSlackbotChatHistory = function () {
function getUserSlackbotChatHistory(){
  const user = JSON.parse(window.localStorage.getItem("current_user"));
  const userId = user.user.userName;
  
  const createWidgetEle = document.getElementById('messageBody');
  // calling service function to create otherbot in firebase database
  getChatHistoryForUserService(userId).then((chathistory) => {
    // first thing first - remove old dom history           
    while(createWidgetEle.firstChild){
      createWidgetEle.removeChild(createWidgetEle.firstChild);
    }
    // converting object to array
    let tempObj = chathistory;
    const chatHistoryArray = Object.keys(tempObj).map(k => tempObj[k])
    // mearging all history to one array

    //if(chathistory.gitbot !== 'undefined'){
    if (typeof(chathistory.gitbot) !== 'undefined'){
      const chatHistoryGitbotObj = chathistory.gitbot;
      var chatHistoryGitbotObjArray = Object.keys(chatHistoryGitbotObj).map(k => chatHistoryGitbotObj[k])
    }
    if (typeof(chathistory.todolist) !== 'undefined'){
      const chatHistoryTodolistObj = chathistory.todolist;
      var chatHistoryTodolistObjArray = Object.keys(chatHistoryTodolistObj).map(k => chatHistoryTodolistObj[k])
    }
    if (typeof(chathistory.reminder) !== 'undefined'){
      const chatHistoryReminderObj = chathistory.reminder;
      var chatHistoryReminderObjArray = Object.keys(chatHistoryReminderObj).map(k => chatHistoryReminderObj[k])
    }
    if (typeof(chathistory.calendar) !== 'undefined'){
      const chatHistoryCalanderObj = chathistory.calendar;
      var chatHistoryCalanderObjArray = Object.keys(chatHistoryCalanderObj).map(k => chatHistoryCalanderObj[k])
    }
    if (typeof(chathistory.otherbot) !== 'undefined'){
      const chatHistoryOtherbotObj = chathistory.otherbot;
      var chatHistoryOtherbotObjArray = Object.keys(chatHistoryOtherbotObj).map(k => chatHistoryOtherbotObj[k])
    }
    if (typeof(chathistory.remindersent) !== 'undefined'){
      const chatHistoryRemindersentObj = chathistory.remindersent;
      var chatHistoryRemindersentObjArray = Object.keys(chatHistoryRemindersentObj).map(k => chatHistoryRemindersentObj[k])
    }

    var unsortedArray = new Array()
    if(typeof(chatHistoryGitbotObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryGitbotObjArray];
    }
    if(typeof(chatHistoryTodolistObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryTodolistObjArray];
    }
    if(typeof(chatHistoryReminderObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryReminderObjArray];
    }
    if(typeof(chatHistoryCalanderObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryCalanderObjArray];
    }
    if(typeof(chatHistoryOtherbotObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryOtherbotObjArray];
    }
    if(typeof(chatHistoryRemindersentObjArray) !== 'undefined'){
      unsortedArray = [...unsortedArray, ...chatHistoryRemindersentObjArray];
    }
    // sort array on datetime and display dom
    if(typeof(unsortedArray) !== 'undefined'){
      var sortedArray = new Array();
      sortedArray = unsortedArray.sort((a,b) => new Date(a.currentdateTime) - new Date(b.currentdateTime));
      for(var z = 0; z <= sortedArray.length - 1; z++){
        const newRepowidget = document.createElement('div');
        if(sortedArray[z].widgetName === 'remindersent') {
          newRepowidget.innerHTML = showUserReminder(sortedArray[z]);
        } else{
          newRepowidget.innerHTML = showChatHistory(sortedArray[z]);
        }
        createWidgetEle.appendChild(newRepowidget);
        createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      }
    }
    
    // if (chatHistoryArray.length != 0) {
    //   for(var i = 0; i <= chatHistoryArray.length - 1; i++){
    //     const eachObject = chatHistoryArray[i]
    //     const chatHistoryArrEachObjArr = Object.keys(eachObject).map(j => eachObject[j])
    //     for(var objKey = 0; objKey <= chatHistoryArrEachObjArr.length - 1; objKey++){
    //       const newRepowidget = document.createElement('div');
    //       if(chatHistoryArrEachObjArr[objKey].widgetName === 'remindersent') {
    //         newRepowidget.innerHTML = showUserReminder(chatHistoryArrEachObjArr[objKey]);
    //       } else{
    //         newRepowidget.innerHTML = showChatHistory(chatHistoryArrEachObjArr[objKey]);
    //       }
    //       createWidgetEle.appendChild(newRepowidget);
    //       createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
    //     }
    //   }
    // }
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history or user Reminder List from firebase database..');
  });
};
