// function to respond back after repository created
export const todolistCreateMsg = function (botResponse, widgetData) {
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

export const openTodolistView = function () {
  return `<div class="modal fade" id="todolistModal" tabindex="-1" role="dialog" aria-labelledby="todolistModalrTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="todolistModalTitle">Todo List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="todolistModalBody">
        <div class="card">
          <ul class="list-group list-group-flush" id="todolistElementsItem">
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

export const newTodolistItemView = function (todolistDataItem, userId) {
  let iconClass;
  if (todolistDataItem.taskCompleted === "checked") {
      iconClass = "fa-check-square-o text-success"
  } else if(todolistDataItem.taskCompleted === "unchecked") {
      iconClass = "fa-square-o text-secondary"
  }
  return `<li class="list-group-item p-2 bg-light" id= "123g">
  ${todolistDataItem.task}
  <i class="float-right pl-2 fa fa-remove text-danger todoListItemsAction" 
  data-action="remove" data-value='${todolistDataItem.id}' data-userid='${userId}'></i>
  <i class="float-right fa ${iconClass} todoListItemsAction" 
  data-action='${todolistDataItem.taskCompleted}'  data-value='${todolistDataItem.id}' data-userid='${userId}'></i>
</li>`;
};

export const botDonotHaveAnswer = function (userEntered, botResponse, googleSearch) {
  return `<div class='createGithubRepo playGroungDiv-you' id='botDonotHaveAnswer_${userEntered}' >
            <span><strong><a href="#">You</a></strong></span>
            <p>${userEntered}</p>
            <span><strong>A few seconds ago<strong></span>
            </div>
            <div class='createGithubRepo panBackground playGroungDiv-bot' id='createGithubRepo_${userEntered}' >
            <span><strong>Slackbot</strong></span>
            <p>${botResponse} <a href='http://www.google.com/search?q=${userEntered}' target="_blank" >${googleSearch}</a></p>
            <span><strong>A few seconds ago<strong></span>
        </div>`;
};
