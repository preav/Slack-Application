import createHTMLElement from '../onboarding-service';
// import updateUserData from './profile/profileService';


// export const profileViewHolderId = 'signupContainer';

export default function profileViewComponent(data) {
  // const userUID = firebase.auth().currentUser.uid;

  // const currUsrData = getCurrentUserData();
  // console.log(currUsrData);
  const profileView = createHTMLElement(
    `<div class="container editProfileDiv " id ="editProfileSection">
    <div class="row">     
      <div class="col-md-5">
        <div class="text-center">
          <img src="${data.profilePicture}" class="avatar" alt="avatar">        
          
          <div class="form-group">
          <input id="changeUserPicture" type="file" class="my-3 border">
          </div>
        </div>
      </div>
      
      <!-- edit form column -->
      <div class="col-md-7 personal-info">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label control-label">User Name:</label>
            <input class="form-control" type="text" id="userName" value="${data.name}">
          </div>
         
          <div class="form-group">
            <label control-label">Company:</label>
            
              <input class="form-control" type="text" id="company" value="${data.username}">

          </div>
          <div class="form-group">
            <label control-label">Email:</label>
              <input class="form-control" type="text" id="mailId" value="${data.email}">
          </div>
     
          <div class="form-group">
            <label control-label">Password:</label>
              <input class="form-control" type="password" value="test">
          </div>
          </div>
        </form>
      </div>
  </div>
</div>`,
  );
  return profileView;
}

function changeUserPicture() {
  console.log('change triggered')
}