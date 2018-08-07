import { noficationTemplate } from './notification-view';

const renderHtmlToContainer = (htmlTemplate, containerKey) => {
  const container = document.querySelector(containerKey);
  container.appendChild(htmlTemplate);
};
const notifytemp = noficationTemplate();
document.querySelector('#noti').innerHTML = '';
renderHtmlToContainer(notifytemp, '#noti');


// $('#notib').click((event) => {
//   event.preventDefault();
//   event.stopPropagation();
//   const notifytemp = noficationTemplate();
//   document.querySelector('#noti').innerHTML = '';
//   renderHtmlToContainer(notifytemp, '#noti');
//   // $("#list-group").collapse("show");
//   // $($(this).attr("data-target")).collapse("hide");
// });
