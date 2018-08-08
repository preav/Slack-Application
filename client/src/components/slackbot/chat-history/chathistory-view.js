// function to show chat history
export const showChatHistory = function (chathistory) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${chathistory.id}' >
                <span><strong><a href="#">You</a></strong></span>
                <p>${chathistory.commandEntered}</p>
                <span>On ${chathistory.creatDate} at ${chathistory.creatTime}</span>
                </div>
                <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${chathistory.panId}' >
                <span><strong>Slackbot</strong></span>
                <p>${chathistory.botResponse}</p>
                <span>On ${chathistory.creatDate} at ${chathistory.creatTime}</span>
            </div>`;
};
