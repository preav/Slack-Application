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
