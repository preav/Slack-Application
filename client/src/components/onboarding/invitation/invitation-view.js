import createHTMLElement from '../onboarding-service';

export const inivitationViewHolderId = 'playGround';

export function invitationComponent() {
  const invitationElement = createHTMLElement(
    `<div class="container mt-3 h-100" style="background-color: antiquewhite;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
  <div class="row h-500 justify-content-center align-items-center">
    <form id="formid" class="col-8">
      <div class="form-group container1">
  <button class="add_button mt-3 btn btn-primary">Add New Field &nbsp; <span style="font-size:16px; font-weight:bold;">+ </span></button>
  <div class="pt-3"><input type="text" class="form-control" placeholder="enter email id"></div>
  </div>
<button id="submit" class="btn btn-outline-info mb-3">Submit</button></form>
  </div>
</div>`,
  );
  return invitationElement;
}
export function mailSentBody() {
  const invitationElement = createHTMLElement(
    `<div class="container h-100">
  <div class="row h-500 justify-content-center align-items-center">
    <h1>Inivitation sent to all the recipients</h1>
  </div>
</div>`,
  );
  return invitationElement;
}
