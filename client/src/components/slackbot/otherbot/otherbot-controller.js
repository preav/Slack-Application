import { updateSlackBotOtherbotResponse, 
      createOtherbotService,
      getAllTeamsService } from './otherbot-service';
import { otherbotCreateMsg } from './otherbot-view';
import { Email } from '../../onboarding/invitation/smtp';

// function to create otherbot
export const createOtherbot = function (widgetData) {
  const createWidgetEle = document.getElementById('messageBody');
  // calling service function to create otherbot in firebase database
  createOtherbotService(widgetData).then((firebaseOtherbotlistdRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseOtherbotlistdRes.id !== '') {

      getAllTeamsService().then( (teamList) => {
        var teamListArray = Object.keys(teamList);
        if (teamListArray.indexOf(firebaseOtherbotlistdRes.channelName) > -1) {
          // sending mail to recipient
          const appUrl = window.location.href;
          const redireURL = `${appUrl}?teamname=${firebaseOtherbotlistdRes.channelName}`;
          const output = `<p>Please click on the below provided link to join Slack</p><br/><a href="${redireURL}">Join Slack</a>`;
          Email.send('slackmailing@gmail.com',
            firebaseOtherbotlistdRes.targetUser,
            'Invitation to join slack',
            output,
            'smtp.gmail.com',
            'slackmailing@gmail.com',
            'Slack@246');

          const newRepowidget = document.createElement('div');
          newRepowidget.innerHTML = otherbotCreateMsg(
            `I have sent an acceptance request to (${widgetData.targetUser}).`,widgetData);
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
          // update firebase database with slackbot response for creating otherbot.
          updateSlackBotOtherbotResponse(widgetData,
            `I have sent an acceptance request to (${widgetData.targetUser}).`);
      } else {
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = otherbotCreateMsg(
          `Team (${firebaseOtherbotlistdRes.channelName}) does not exists.`, widgetData);
        createWidgetEle.appendChild(newRepowidget);
        createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
        // update firebase database with slackbot response for creating otherbot.
        updateSlackBotOtherbotResponse(widgetData,
          `Team (${firebaseOtherbotlistdRes.channelName}) does not exists.`);
      }
      });
      
    } else {
      errorOrSuccDiv.innerHTML = otherbotCreateMsg(
'Your request did not process due to technical issue, please try after some time.', widgetData);
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
