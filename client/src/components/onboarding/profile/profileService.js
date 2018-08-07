import '../../../../../firebase/firebase-config';
import firebase from 'firebase';


// const currUser = firebase.auth().currentUser.uid;
// const dbRef = firebase.database().ref();


export function getCurrentUserData() {
  const userUID = firebase.auth().currentUser.uid;
  const dataPromise = fetch(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/getUser?userId=${userUID}`);
  return new Promise((resolve, reject) => {
    dataPromise
      .then((res) => {
        res.json().then((data) => {
          resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUserData(name, email) {
  const userUID = firebase.auth().currentUser.uid;
  const req = new Request(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=${userUID}`, {
    method: 'POST',
    mode: 'no-cors',
    headers : {"Access-Control-Allow-Origin":true},
    body: JSON.stringify({     
          "name" :name,
          "email" :email       
    }),
  });

  fetch(req).then((response) => {    
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
    })
    .catch((err) => {
      console.log('Error:', err.message);
    });

  // const dataPromise = fetch(`https://us-central1-slackcollaboration-fa323.cloudfunctions.net/saveUpdateUser?userId=${userUID}`);

  /* dbRef.child(`users/${userUID}`).set({
     username: userData.username,
     accessToken: userData.accessToken,
     name: userData.name,
     email: 'updated_mailid@test.com',
     profilePicture: userData.profilePicture,
     phoneNumber: userData.phoneNumber,
     gitURL: userData.gitURL,
     teams: userData.teams,
     status: userData.status,
     permission: userData.permission,
   }); */
  // console.log(currUsrTempData);
}


