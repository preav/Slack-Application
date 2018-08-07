import { updateSlackBotTodolistResponse, createTodolistService } from './todolist-service';
import { todolistCreateMsg } from './todolist-view';


$(document).ready(() => {
  $('.todoListItemsAction').on('click', function () {
    const action = $(this).data('action');
    if (action === 'checked') {
      // check
      $(this).toggleClass('fa-check-square-o text-success fa-square-o text-secondary').data('action', 'unchecked');
      $(this).parents('li.list-group-item').removeClass('bg-light');
    } else if (action === 'remove') {
      // remove
      $(this).parents('li.list-group-item').remove();
    } else if (action === 'unchecked') {
      // uncheck
      $(this).toggleClass('fa-check-square-o text-success fa-square-o text-secondary').data('action', 'checked');
      $(this).parents('li.list-group-item').addClass('bg-light');
    }
  });
});

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
