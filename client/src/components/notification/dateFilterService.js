import firebase from 'firebase';
import {displayUserChat,displayChannelsChat} from './dateFilterView';
import database from '../../../../firebase/firebase';
import moment from 'moment';
//{"user":{"userName":"SushmaKudum","currentTeam":{"teamName":"test","channals":[]},"teams":[]}}

// Get Current User Details
/*let currentUser = window.localStorage.getItem("current_user");
let user;
let team;
let userDisplayName;
if (currentUser && currentUser.user !== 'undefined') {
  user = JSON.parse(currentUser).user.userName;
  team = JSON.parse(currentUser).user.currentTeam.teamName;
   userDisplayName = getDisplayNameFrom(user);
}
else {
  user = 'anilkumar-bv'; // initialize to one of the User
}

function getDisplayNameFrom(userNameInput) {
    //get the User Name from userName
    let userDisplayNameLocal = '';
    let usersDbRef = firebase.database().ref('users');
    usersDbRef.once('value', (dataSnapshot) => {
        dataSnapshot.forEach(childSnapshot => {
            if (childSnapshot.val().username === userNameInput) {
                // Check if name field is available. If not, return the userName itself
                if (childSnapshot.val().name == null) {
                    userDisplayNameLocal = userNameInput;
                }
                else {
                    userDisplayNameLocal = childSnapshot.val().name;
                }
            }
        });
    })

    return userDisplayNameLocal;
}

let userID;
let teamId;
if(user != null){const userID=user;}
else{const userID=userDisplayName;}
if(team !=null)
{teamId=team;}
else{teamId='team-6';}*/
let teamId='team-6';
let  userID = 'anilkumar-bv';

export function getMessagesFromFireBase(startDate, endDate) {
  document.getElementById('chatResult').style.display='block';
  // channelMessages(startDate, endDate);
   directMessages(startDate, endDate);
    
}

function channelMessages(startDate, endDate){
  let formatedDate;
  console.log("/"+`${teamId}`+"/channels");
  const channelMsg=database.ref("/"+`${teamId}`+"/channels");
  channelMsg.on('value', (snapshot) => {    
    const getAllChannelValue = Object.values(snapshot.val());    
    const abc = getAllChannelValue.map((chnVal) => {   
     Object.entries(chnVal).forEach(([key, value]) => {
        const msgsList=value;    
      Object.entries(msgsList).forEach(([key, value]) => {
        const msgData=value;
        let rcvDate=msgData.date;        
         formatedDate = dateConverter(rcvDate,startDate, endDate);
        if(formatedDate != null){
          let sentby=msgData.sentBy;
          let sentTo=msgData.sentTo;  
          let message=msgData.messageText;
          if(sentby === `${userID}` || sentTo === `${userID}`)
          {
            const msg= `${sentby}` +"-"+ `${formatedDate}`+" : "+`${message}`;           
            displayChannelsChat(`${sentTo}`, `${msg}`);
           
          }
   }  
      });
      });     
    });
  });
 
}


    //converting date from firebase timestamp to mm/dd/yyyy
function dateConverter(recorddate, startDate, endDate){
  var formatDate;
   var timestamp   = recorddate.toString().substring(0,10),
    date        = new Date(timestamp * 1000),
    datevalues  = [  date.getFullYear(),
                   date.getMonth()+1,
                   date.getDate(),
                   date.getHours(),
                   date.getMinutes(),
                   date.getSeconds(),
                ]; //=> [2011, 3, 25, 23, 0, 0]
   var data = datevalues[1]+"/"+datevalues[2]+"/"+datevalues[0];   
   var pasrdCheck = new Date(data);
   var pasrdstartDate = new Date(startDate);
   var pasrdendDate = new Date(endDate); 

   if((pasrdCheck <= pasrdendDate && pasrdCheck >= pasrdstartDate)) 
   {  
     let firebaseTimestamp =  datevalues[1]+"/"+datevalues[2]+"/"+datevalues[0]+ " "+datevalues[3]+":"+datevalues[4]+":"+datevalues[5];
    formatDate= moment( firebaseTimestamp, 'MM/DD/YYYY HH:mm:ss').format("MM/DD/YYYY H:mm:ss a");    
     }
     return formatDate;
    }


  function directMessages(startDate, endDate){
    let formatedDate;
    let directMessages;
    console.log("/"+`${teamId}`+"/directMessages/users");
    const users = database.ref("/"+`${teamId}`+"/directMessages/users");
    users.on('value', (snapshot) => {
        const getAllUserIds = Object.values(snapshot.val());
        const abc = getAllUserIds.map((msgVal) => {
            Object.entries(msgVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let rcvDate=msgData.date;        
                     formatedDate = dateConverter(rcvDate,startDate, endDate);
                    if(formatedDate != null){
                      let sentby=msgData.sentBy;
                     // let sentByuser = getUserName(sentby);
                      let sentTo= msgData.sentTo; 
                      let message=msgData.messageText;                     
                      if(sentby === `${userID}` || sentTo === `${userID}`)
                      {
                        const msg= `${sentby}` +"-"+ `${formatedDate}`+" : "+`${message}`;           
                      
                       /*let keyx =`${userID}`;                 
                            if (directMessages[keyx] !== undefined){
                              directMessages[keyx].push(`${msg}`);
                            }
                            else{
                              directMessages[keyx]= new Array(`${msg}`);
                            } */

                              displayUserChat(`${sentby}`, `${msg}`); 

                      }
               }  
                });
            });
        });
    });

    if(directMessages !=null && directMessages!= undefined)
    for(key in directMessages) {
      if(Array.isArray(directMessages[key])) {
        a[key].map(item => console.log(key, "Items", item))
      }
       console.log(key);
      console.log(directMessages[key]);
      displayUserChat(`${key}`, directMessages[`${key}`]); 
      
    }
   }

   function getUserName(userID) {
    let user = {};
    let usersDbRef = firebase.database().ref('users');
    usersDbRef.once('value', (dataSnapshot) => {
      dataSnapshot.forEach(childSnapshot => {
        if (childSnapshot.key === userID) {
          if (childSnapshot.val().name == null) {
            user.userName = childSnapshot.val().username;
            user.displayName = childSnapshot.val().username;
          }
          else {
            user.userName = childSnapshot.val().username;
            user.displayName = childSnapshot.val().name;
          }
        }
      });
    });
    return user;
  }