import '../../../../../firebase/firebase-config';
import firebase from 'firebase';


// const currUser = firebase.auth().currentUser.uid;
const dbRef = firebase.database().ref();

/*

readAllGamesById(gameId) {
       console.log("Inside readAllGamesById method");

       return new Promise(function (resolve, reject) {
           let gameDetails = firebaseDB.ref("games/").orderByChild("id").equalTo(gameId);

           gameDetails.on("value", function (game) {
               console.log(game.val());
               resolve(game.val());
           }, function (error) {
               console.log("Error: " + error.code);
               reject(error.code)
           });

       });
   };
*/
export default function getCurrentUserData() {
  const userUID = firebase.auth().currentUser.uid;
  const users = dbRef.child(`users/${userUID}`);
  // users.once('value', snapshot => snapshot.val());
  return new Promise(((resolve, reject) => {
    users.once('value', (snapshot) => {
      resolve(snapshot.val());
    }, (error) => {
      reject(error.code);
    });
  }));
}
