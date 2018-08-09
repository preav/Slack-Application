// function to respond back for otherbot
export const otherbotCreateMsg = function (botResponse, widgetData) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${widgetData.id}' >
                <span><strong><a href="#">You</a></strong></span>
                <p>${widgetData.commandEntered}</p>
                <span><strong>A few seconds ago<strong></span>
                </div>
                <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${widgetData.id}' >
                <span><strong>Slackbot</strong></span>
                <p>${botResponse}</p> 
                <span><strong>A few seconds ago<strong></span>
            </div>`;
};
