export const createHtmlTemplate = (htmlStr, multiple = false) => {
    const temp = document.createElement('template');
    temp.innerHTML = htmlStr;
    if (multiple) {
        return temp.content;
    }
    return temp.content.firstElementChild;
};

export const noficationTemplate = (msgList) => {
    let msgCardStr = ""
    if (msgList.length > 0) {
        msgList.forEach((item) => {
            msgCardStr += `<div class="card" style="max-width: 202px;">
            <img class="card-img-top" src=""  alt="userImage">
            <div class="card-body">
            <p class="card-text" id="mes">${item.sentBy}</p>
            <p class="card-text" id="mes">${item.messageText}</p></div>
            </div>`
        })
    } else {
        msgCardStr = "No Notification"
    }
    const notificationhtml = `<div class="modal fade" id="Modal-large-demo" tabindex="-1" role="dialog" aria-labelledby="Modal-large-demo-label" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="Modal-large-demo-label">Notifications</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body"  style="display:flex; justify-content:space-evenly;">
       ${msgCardStr}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">OK</button>
      </div>
    </div>
    </div>
  </div>
</div>
 </div>
`;
    return createHtmlTemplate(notificationhtml);
};