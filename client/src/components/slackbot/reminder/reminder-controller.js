import { 
  updateSlackBotReminderResponse,
  createReminderService, 
  getReminderForUserService,
  getReminderForAllUsersService,
  saveReminderSent
 } from './reminder-service';
import { reminderCreateMsg, 
  openReminderView, 
  newReminderlistItemView,
  showUserReminderBeforeSave } from './reminder-view';

// function to create reminder
export const createReminder = function (widgetData) {
  const createRepoWidgetEle = document.getElementById('messageBody');
  // calling service function to create reminder in firebase database
  createReminderService(widgetData).then((firebaseRemindRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseRemindRes.id !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = reminderCreateMsg(
        `Sure, I will remind (<a href='#'>${widgetData.remindeeUser}</a>)
         at ${widgetData.reminderDate} ${widgetData.reminderTime}`, widgetData);
      createRepoWidgetEle.appendChild(newRepowidget);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      // update firebase database with slackbot response for reminder
      updateSlackBotReminderResponse(widgetData,
        `Sure I will remind (${widgetData.remindeeUser}) 
      at ${widgetData.reminderDate} ${widgetData.reminderTime}`);
    } else {
      errorOrSuccDiv.innerHTML = reminderCreateMsg('Reminder cannot be set due to technical issue.',
      widgetData);
      createRepoWidgetEle.appendChild(errorOrSuccDiv);
      createRepoWidgetEle.scrollTop = createRepoWidgetEle.scrollHeight;
      // update firebase database with slackbot response for reminder
      updateSlackBotReminderResponse(widgetData,
        'Reminder cannot be set due to technical issue.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating reminder in firebase database..');
  });
};

// function to open Reminder modal
export const openReminder = function (openWidgetType) {
  const createWidgetEle = document.getElementById('messageBody');
  // calling service function to get reminder data from firebase database
  getReminderForUserService(openWidgetType.userId).then((reminderListData) => {
    // converting object to array
    const reminderListDataArray = Object.keys(reminderListData).map(i => reminderListData[i])
    if (reminderListDataArray.length != 0) {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = openReminderView();
      createWidgetEle.appendChild(newRepowidget);

      //to remove old reminder value from modal                
      var oldDOMreminderlist = document.getElementById('reminderElementsItem');
      while(oldDOMreminderlist.firstChild){
        oldDOMreminderlist.removeChild(oldDOMreminderlist.firstChild);
      }

      // add each reminder task elements in modal list
      for(var i = 0; i < reminderListDataArray.length; i++){
        const reminderlistElementsItem = document.getElementById('reminderElementsItem');
        const newReminderlistItem = document.createElement('div');
        newReminderlistItem.innerHTML = newReminderlistItemView(reminderListDataArray[i]);
        reminderlistElementsItem.appendChild(newReminderlistItem);
      }
      $('#reminderModal').modal('show'); 
    }
  }).catch((err) => {
    console.log(err, 'Error occured while reminder list from firebase database..');
  });
};

// function to send reminder meaage if time arrieved
export const sendReminderMeaageOnTime = function () {
  const createWidgetEle = document.getElementById('messageBody');
  getReminderForAllUsersService().then( (reminderMsgListObject) => {
    const reminderMsgListArray = Object.keys(reminderMsgListObject).map(i => reminderMsgListObject[i])
    for(var k = 0; k <= reminderMsgListArray.length - 1; k++){//loop for each users
      var reminderMsgListArrayObj =reminderMsgListArray[k].reminder;
        if (typeof(reminderMsgListArrayObj) !== 'undefined'){
        const allReminderMsgListArray = Object.keys(reminderMsgListArrayObj).map(i => reminderMsgListArrayObj[i]);
        for(var j = 0; j <= allReminderMsgListArray.length - 1; j++){ // loop for each reminder for a user
          if(((Date.parse(allReminderMsgListArray[j].reminderTime) - (new Date())) < 0) 
          &&  (allReminderMsgListArray[j].reminderSent === 'No')) {
            // once reminder time arrive
            const newRepowidget = document.createElement('div');
            newRepowidget.innerHTML = showUserReminderBeforeSave(allReminderMsgListArray[j]);
            createWidgetEle.appendChild(newRepowidget);
            createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
            
            // save reminder sent to firebase database
            saveReminderSent(allReminderMsgListArray[j])

          }
        }
       }
    }
    
  });
};
