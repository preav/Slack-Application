const moment = require('moment');
// function to show chat history
export const showChatHistory = function (chathistory) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${chathistory.id}' >
                <span><strong><a href="#">You</a></strong></span>
                <p>${chathistory.commandEntered}</p>
                <span><strong>${moment(chathistory.currentdateTime).fromNow()}</strong></span>
                </div>
                <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${chathistory.panId}' >
                <span><strong>Slackbot</strong></span>
                <p>${chathistory.botResponse}</p>
                <span><strong>${moment(chathistory.currentdateTime).fromNow()}</strong></span>
            </div>`;
};

// template to show reminder to user
export const showUserReminder = function (UserReminder) {
  return `<div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${UserReminder.panId}' >
              <span><strong>Slackbot</strong></span>
              <p>You told me to remind for ${UserReminder.commandEntered}</p>
              <span><strong>${moment(UserReminder.currentdateTime).fromNow()}</strong></span>
          </div>`;
};
