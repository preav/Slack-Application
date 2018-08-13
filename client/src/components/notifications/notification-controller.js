import { noficationTemplate } from './notification-view';
import { getnotificationList } from './notification-main'

const renderHtmlToContainer = (htmlTemplate, containerKey) => {
    const container = document.querySelector(containerKey);
    container.appendChild(htmlTemplate);
};
// const notifytemp = noficationTemplate();
// document.querySelector('#noti').innerHTML = '';
// renderHtmlToContainer(notifytemp, '#noti');


$('#notificationCounter').click((event) => {
    event.preventDefault();
    event.stopPropagation();
    const notifytemp = noficationTemplate(getnotificationList());
    document.querySelector('#noti').innerHTML = '';
    renderHtmlToContainer(notifytemp, '#noti');
    $('#Modal-large-demo').modal('show')
        // $("#list-group").collapse("show");
        // $($(this).attr("data-target")).collapse("hide");
});