import { updateSlackBotCalendarResponse, createCalendarEventService } from './calendar-service';
import { calendarEventCreateMsg } from './calendar-view';

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
