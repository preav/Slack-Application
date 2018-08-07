import createHTMLElement from '../onboarding-service';
// import updateUserData from './profile/profileService';


// export const profileViewHolderId = 'playGround';


export default function profileViewComponent(data) {
  // const userUID = firebase.auth().currentUser.uid;

  // const currUsrData = getCurrentUserData();
  // console.log(currUsrData);
  const profileView = createHTMLElement(
    `<div class="container" >
    <h1>Edit Profile</h1>
      <hr>
    <div class="row">     
      <div class="col-md-3">
        <div class="text-center">
          <img src="./client/src//img/avatar.png" class="avatar" alt="avatar">        
          
          <input type="file" class="form-control">
        </div>
      </div>
      
      <!-- edit form column -->
      <div class="col-md-9 personal-info">
      
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label"><b>User Name:</b></label>
            <div class="col-lg-8">
              <input class="form-control" type="text" id="userName" value="${data.name}">
            </div>
          </div>
         
          <div class="form-group">
            <label class="col-lg-3 control-label">Company:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" id="company" value="${data.username}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" id="mailId" value="${data.email}">
            </div>
          </div>
     
          <div class="form-group">
            <label class="col-md-3 control-label">Password:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value="test">
            </div>
          </div>
         
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input type="button" class="btn btn-primary updateUserDataBtn" value="Save Changes" id="updateUserDataBtn">
              <span></span>
              <input type="reset" class="btn btn-default" value="Cancel">
            </div>
          </div>
        </form>
      </div>
  </div>
</div>`,
  );

  return profileView;
}
