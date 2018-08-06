import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCCGyDmn1eBE-kJdy3uJ9m5Zui6I06YyBo',
  authDomain: 'slackxt-notifications.firebaseapp.com',
  databaseURL: 'https://slackxt-notifications.firebaseio.com',
  projectId: 'slackxt-notifications',
  storageBucket: 'slackxt-notifications.appspot.com',
  messagingSenderId: '226487853474',
};
// firebase.initializeApp(config);



function getMessagesFromFireBase(startDate, endDate) {
  alert("startDate"+ startDate, endDate +"endDate"+ endDate);
  const rootRef = firebase.database().ref('team001');
  const userlist = rootRef.child('conversations').child('userID001').child('messages');
  userlist.on('value', (userDetails) => {    
    userDetails.forEach((user) => {     
      const name = user.child('name').val();      
      const usermsgbody = user.child('body');  
       const text= usermsgbody.child('text').val() + " "+usermsgbody.child('firebaseTimestamp').val();      
       
      
       document.querySelector('#playGround').appendChild(createSearchResult(name,text)); 
      
      
    });   

  });







/*  newRoot.on('value', (snapshot) => {
    snapshot.forEach((_child) => {
      const society = _child.key;
      // const value = _child.val();
      document.getElementById('playGround').innerHTML = `${_child.key}:${_child.val()}`;
      console.log(`*******${_child.node_.children_.root_.right.name}`);
    });
  });

  ref.orderByKey().startAt("2018-03-07T09:04:04.000Z").endAt("2018-03-07T09:04:04.000Z").once("value", function (snapshot) {
    console.log("objects: " + snapshot.numChildren());
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.key);
    });
});

  /* ref.on('value', (snapshot) => {
    document.getElementById('playGround').innerHTML = snapshot.val();
    console.log(snapshot.val());
  }, (error) => {
    console.log(`Error: ${error.code}`);
  });


/* ref.orderByKey().startAt('2018-03-07T09:04:04.000Z').endAt('2018-03-07T09:04:04.000Z')
.on('value', (snapshot) => {
  snapshot.forEach((data) => {
    console.log(`The ${data.key} value is ${data.val()}`);
    document.getElementById('playGround').innerHTML = `The ${data.key} value is ${data.val()}`;
    console.log(`The ${data.key} value is ${data.val()}`);
  });
}); */
}

$(document).on('click', '#ok', () => {
  const startDate = document.getElementById('start').value;
  const endDate = document.getElementById('end').value;
  alert(`startDate is --->${startDate}     EndDate is -------${endDate}`);
  getMessagesFromFireBase(startDate, endDate);
});


function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}
function createSearchResult(user,text) {
  const createResultTemplateTxt = ` <div class="border container tab-pane" aria-labelledby="pills-home-tab" id="createRepo">
<button type="button" class="close" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
<div class="card card-body" role="tabpanel" aria-labelledby="pills-home-tab" style="content: \e003">
<form>
<div class="form-group row">      
        <div class="col-md-3">
            <output>${user}</output>
        </div>
    </div>
    <div class="form-group row">
         <div class="col-md-3">
        <output>${text}</output>
        </div>
    </div>  
</form>
</div>
</div>`;

  return createHTMLElement(createResultTemplateTxt);
}

export default config;
