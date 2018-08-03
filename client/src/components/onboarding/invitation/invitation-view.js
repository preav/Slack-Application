import createHTMLElement from '../onboarding-service';

export const inivitationViewHolderId = 'playGround';

export function invitationComponent() {
  const invitationElement = createHTMLElement(
    `<div class="container h-100">
  <div class="row h-500 justify-content-center align-items-center">
    <form class="col-12">
      <div class="form-group container1">
  <button class="add_button xbtn btn-primary">Add New Field &nbsp; <span style="font-size:16px; font-weight:bold;">+ </span></button>
  <div><input type="text" name="mytext1" class="form-control"><a href="#" class="delete">Delete</a></div>
  <div><input type="text" name="countText" id="countText" style="display:none;"></div>
  </div>
<button type="submit" class="btn btn-info">Submit</button></form>   
  </div>  
</div>`,
  );

  return invitationElement;
}
