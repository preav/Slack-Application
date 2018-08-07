import { updateSlackBotOtherbotResponse, createOtherbotService } from './otherbot-service';
import { otherbotCreateMsg } from './otherbot-view';

// function to create otherbot
export const createOtherbot = function (widgetData) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create otherbot in firebase database
  createOtherbotService(widgetData).then((firebaseTodolistdRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseTodolistdRes.id !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = otherbotCreateMsg(
        `I have sent an acceptance request to (${widgetData.targetUser}).`,
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createWidgetEle.appendChild(newRepowidget);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for creating otherbot.
      updateSlackBotOtherbotResponse(widgetData,
        `I have sent an acceptance request to (${widgetData.targetUser}).`);
    } else {
      errorOrSuccDiv.innerHTML = otherbotCreateMsg(
        'Your request did not process due to technical issue, please try after some time.',
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createWidgetEle.appendChild(errorOrSuccDiv);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for creating otherbot.
      updateSlackBotOtherbotResponse(widgetData,
        'Your request did not process due to technical issue, please try after some time.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating otherbot in firebase database..');
  });
};
