import { 
  updateSlackBotCalendarResponse, createCalendarEventService, getCalendarForUserService 
} from './calendar-service';
import { calendarEventCreateMsg,openCalendarView,newCalendarlistItemView } from './calendar-view';

// function to create calendar event
export const createCalendarEvent = function (widgetData) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create calendar event in firebase database
  createCalendarEventService(widgetData).then((firebaseTodolistdRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseTodolistdRes.id !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = calendarEventCreateMsg(
        `I create a calendar event (${widgetData.calendarEvent}), please check your calendar.`,
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createWidgetEle.appendChild(newRepowidget);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for creating calendar event.
      updateSlackBotCalendarResponse(widgetData,
        `I create a calendar event (${widgetData.calendarEvent}), please check your calendar.`);
    } else {
      errorOrSuccDiv.innerHTML = calendarEventCreateMsg(
        'Calendar event cannot be created due to technical issue, please try after some time.',
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createWidgetEle.appendChild(errorOrSuccDiv);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for creating calendar event.
      updateSlackBotCalendarResponse(widgetData,
        'Calendar event cannot be created due to technical issue, please try after some time.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating calandar event in firebase database..');
  });
};

// function to open Calendar modal
export const openCalendar = function (openWidgetType) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to get calendar data from firebase database
  getCalendarForUserService(openWidgetType.userId).then((calendarListData) => {
    // converting object to array
    const calendarListDataArray = Object.keys(calendarListData).map(i => calendarListData[i])
    if (calendarListDataArray.length != 0) {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = openCalendarView();
      createWidgetEle.appendChild(newRepowidget);

      //to remove old calendar value from modal                
      var oldDOMcalendarlist = document.getElementById('calendarElementsItem');
      while(oldDOMcalendarlist.firstChild){
        oldDOMcalendarlist.removeChild(oldDOMcalendarlist.firstChild);
      }

      // add each calendar task elements in modal list
      for(var i = 0; i < calendarListDataArray.length; i++){
        const calendarlistElementsItem = document.getElementById('calendarElementsItem');
        const newCalendarlistItem = document.createElement('div');
        newCalendarlistItem.innerHTML = newCalendarlistItemView(calendarListDataArray[i]);
        calendarlistElementsItem.appendChild(newCalendarlistItem);
      }
      $('#calendarModal').modal('show'); 
    }
  }).catch((err) => {
    console.log(err, 'Error occured while calendar list from firebase database..');
  });
};