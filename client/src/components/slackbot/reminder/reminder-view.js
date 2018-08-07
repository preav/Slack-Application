// function to respond back after repository created
export const reminderCreateMsg = function (botResponse, panId, creatDate, creatTime, commandEntered) {
  return `<div class='createGithubRepo playGroungDiv-you' id='createGithubRepo-you_${panId}' >
          <span><strong><a href="#">You</a></strong></span>
          <p>${commandEntered}</p>
          <span>On ${creatDate} at ${creatTime}</span>
          </div>
          <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${panId}' >
          <span><strong>Slackbot</strong></span>
          <p>${botResponse}</p>
          <span>On ${creatDate} at ${creatTime}</span>
      </div>`;
};

export const openReminderView = function () {
  return `<div class="modal fade" id="reminderModal" tabindex="-1" role="dialog" aria-labelledby="reminderModalrTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="reminderModalTitle">Reminder List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="reminderModalBody">
        <div class="card">
          <ul class="list-group list-group-flush" id="reminderElementsItem">
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

export const newReminderlistItemView = function (reminderDataItem) {
  return `<li class="list-group-item p-2 bg-light">
  ${reminderDataItem.commandEntered}
  
</li>`;
};
