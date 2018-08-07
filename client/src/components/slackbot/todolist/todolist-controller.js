import { 
  updateSlackBotTodolistResponse, 
  createTodolistService, 
  getTodolistForUserService,
  markOrUnmarkOrDelete
} from './todolist-service';
import { todolistCreateMsg, openTodolistView, newTodolistItemView } from './todolist-view';

// function to create task in todolist
export const createTodolistTask = function (widgetData) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to create reminder in firebase database
  createTodolistService(widgetData).then((firebaseTodolistdRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseTodolistdRes.id !== '') {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = todolistCreateMsg(
        `I added task (${widgetData.task}) into your to do list.`,
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered,
      );
      createWidgetEle.appendChild(newRepowidget);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for adding task into to-do-list.
      updateSlackBotTodolistResponse(widgetData,
        `I added task (${widgetData.task}) into your to do list.`);
    } else {
      errorOrSuccDiv.innerHTML = todolistCreateMsg('Task is not added on your to do list due to technical issue.',
        widgetData.id, widgetData.creatDate, widgetData.creatTime, widgetData.commandEntered);
      createWidgetEle.appendChild(errorOrSuccDiv);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for adding task into to-do-list.
      updateSlackBotTodolistResponse(widgetData,
        'Task is not added on your to do list due to technical issue.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating reminder in firebase database..');
  });
};

// function to open todolist modal
export const openTodolist = function (openWidgetType) {
  const createWidgetEle = document.getElementById('playGround');
  // calling service function to get todolist data from firebase database
  getTodolistForUserService(openWidgetType.userId).then((todolistData) => {
    // converting object to array
    const todolistDataArray = Object.keys(todolistData).map(i => todolistData[i])
    if (todolistDataArray.length != 0) {
      const newRepowidget = document.createElement('div');
      newRepowidget.innerHTML = openTodolistView();
      createWidgetEle.appendChild(newRepowidget);

      //to remove old todolist value from modal                
      var oldDOMtodolist = document.getElementById('todolistElementsItem');
      while(oldDOMtodolist.firstChild){
        oldDOMtodolist.removeChild(oldDOMtodolist.firstChild);
      }

      // add each todolist task elements in modal list
      for(var i = 0; i < todolistDataArray.length; i++){
        const todolistElementsItem = document.getElementById('todolistElementsItem');
        const newTodolistItem = document.createElement('div');
        newTodolistItem.innerHTML = newTodolistItemView(todolistDataArray[i], openWidgetType.userId);
        todolistElementsItem.appendChild(newTodolistItem);
      }
      $('#todolistModal').modal('show'); 
    }
  }).catch((err) => {
    console.log(err, 'Error occured while retrieving chat history from firebase database..');
  });
};

// action performed on todolist
$(document).on('click', '.todoListItemsAction', function () {
  const action = $(this).data('action');
  if (action === 'checked') {
    // check
    // calling firebase database update
    //console.log('oooooo', markOrUnmarkOrDelete(action, $(this).data('value'), $(this).data('userid')));
    markOrUnmarkOrDelete(action, $(this).data('value'), $(this).data('userid'));


    $(this).toggleClass('fa-check-square-o text-success fa-square-o text-secondary').data('action', 'unchecked');
    $(this).parents('li.list-group-item').removeClass('bg-light');
  } else if (action === 'remove') {
    // remove
    // calling firebase database update
    markOrUnmarkOrDelete(action, $(this).data('value'), $(this).data('userid'));
    $(this).parents('li.list-group-item').remove();
  } else if (action === 'unchecked') {
    // uncheck
    // calling firebase database update
    //console.log('hhhhh', markOrUnmarkOrDelete(action, $(this).data('value'), $(this).data('userid')) );
    markOrUnmarkOrDelete(action, $(this).data('value'), $(this).data('userid'));
    $(this).toggleClass('fa-check-square-o text-success fa-square-o text-secondary').data('action', 'checked');
    $(this).parents('li.list-group-item').addClass('bg-light');
  }
});