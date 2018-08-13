import firebase from 'firebase';
import {displayUserChat,displayChannelsChat} from './dateFilterView';
import database from '../../../../firebase/firebase';
import moment from 'moment';
//{"user":{"userName":"SushmaKudum","currentTeam":{"teamName":"test","channals":[]},"teams":[]}}

// Get Current User Details
let currentUser = window.localStorage.getItem("current_user");
let user;
let team;
if (currentUser && currentUser != 'null' && currentUser.user !== 'undefined') {
  user = JSON.parse(currentUser).user.userName;  
 team = JSON.parse(currentUser).user.currentTeam.teamName; 
  user = getDisplayNameFrom(user);
}
else {
  user = 'anilkumar-bv'; // initialize to one of the User
}

// Function to retrieve User Display Name from Login User Name
function getDisplayNameFrom(userNameInput) {
  // get the User Name from userName
  let userDisplayNameLocal = '';
  const usersDbRef = firebase.database().ref('users');
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
if(user != null){userID=user;}
else{userID='anilkumar-bv';}
if(team !=null)
{teamId=team;}
else{teamId='team-6';}
//let teamId='team-6';
//let  userID = 'anilkumar-bv';

export function getMessagesFromFireBase(startDate, endDate) {
  document.getElementById('chatResult').style.display='block';
   channelMessages(startDate, endDate);
   directMessages(startDate, endDate);
    
}

function channelMessages(startDate, endDate){
  let formatedDate;
  let channelName;
  let channelMgs = new Object();
  const channelMsg=database.ref("teams/"+JSON.parse(localStorage.getItem("current_user")).user.currentTeam.teamName+"/channels");
  channelMsg.on('value', (snapshot) => {    
    const getAllChannelValue = Object.values(snapshot.val());  
     const abc = getAllChannelValue.map((chnVal) => {          
     Object.entries(chnVal).forEach(([key, value]) => {
       if(key=="channelName"){channelName=value;}
       if(key=='messages'){
        const msgsList=value;    
      Object.entries(msgsList).forEach(([key, value]) => {     
        const msgData=value;
        let rcvDate=msgData.date;       
        formatedDate = dateConverter(rcvDate,startDate, endDate);
       if(formatedDate != null){
         //let sentby=msgData.sentBy;
         
      /*  if(sentby.length >15)
         { sentby = getUserName(msgData.sentBy);}*/
       // let sentby = getUserName(msgData.sentBy);
       // let sentTo= msgData.sentTo;
        //    let sentTo = getUserName(msgData.sentTo);
       let sentby=msgData.sentByDisplayName;
                     if(msgData.sentByUserName !=null)
                     {sentby=msgData.sentByUserName;}
                     let sentTo=channelName;
                    
         let message=msgData.messageText;  
         if(message!=null && message.indexOf("<p>") != -1 && message.indexOf("</p>") != -1) 
         {message=(message.replace('<p>', '')).replace('</p>', '');}
                    
        const msg= `${sentby}` +"-"+ `${formatedDate}`+" : "+`${message}`;       
            let keyx =sentTo;                 
               if (Object.keys(channelMgs).length != 0
                && channelMgs[keyx] != undefined ){
                  channelMgs[keyx].push(`${msg}`);
               }
               else{
                channelMgs[keyx]= new Array(`${msg}`);
               } 
       
   }  
      });}
      });     
    });
  });
  var key;
  for(key in channelMgs) {
    if(Array.isArray(channelMgs[key])) {
      channelMgs[key].map(item => console.log(key, "Items", item))
    }    
    displayChannelsChat(`${key}`, channelMgs[`${key}`]); 
    
  }
 
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
    formatDate= moment( firebaseTimestamp, 'MM/DD/YYYY HH:mm:ss').format("MM/DD/YYYY h:mm:ss a");    
     }
     return formatDate;
    }  

  function directMessages(startDate, endDate){
    let formatedDate;
    let directMessages = new Object();
    let userID = JSON.parse(currentUser).user.userName;
    console.log('curremtTeam name',JSON.parse(localStorage.getItem("current_user")).user.currentTeam.teamName);
    console.log("teams/"+JSON.parse(localStorage.getItem("current_user")).user.currentTeam.teamName+"/directMessages/users/"+userID);
    const users = database.ref("teams/"+JSON.parse(localStorage.getItem("current_user")).user.currentTeam.teamName+"/directMessages/users/"+userID);
   console.log('users', users);
    users.on('value', (snapshot) => {
      console.log('snapshot', snapshot.val());
        const getAllUserIds = Object.values(snapshot.val());
        console.log(getAllUserIds);

        Array.from(getAllUserIds).forEach(function(value) 
        {
          const msgsList = value;
          let sentTo;
          let sentby
          Object.entries(msgsList).forEach(([key, value]) => {
              const msgData = value;                    
              let rcvDate=msgData.date;        
               formatedDate = dateConverter(rcvDate,startDate, endDate);
              if(formatedDate != null){
              /*  let sentby=msgData.sentBy;
                let sentTo= msgData.sentTo; 
               if(sentby.length >15)
                { sentby= getDisplayNameFrom(msgData.sentBy);
                  console.log('changes name',sentby);}*/
             sentby=msgData.sentByDisplayName;
               if(msgData.sentByUserName !=null)
               {sentby=msgData.sentByUserName;}
                sentTo= msgData.sentToUserName;
             let message=msgData.messageText;   
                               
                if(sentby === `${userID}` || sentTo === `${userID}`)
                {let keyx ='';
                  const msg= `${sentby}` +"-"+ `${formatedDate}`+" : "+`${message}`;         
                  if(sentby === `${userID}`)
                          {keyx =`${sentTo}`;}
                          if(sentTo === `${userID}`)
                          {keyx =`${sentby}`;}         
                      if (Object.keys(directMessages).length != 0
                       && directMessages[keyx] != undefined ){
                        directMessages[keyx].push(`${msg}`);
                      }
                      else{
                        directMessages[keyx]= new Array(`${msg}`);
                      } 
                }
         }  
          });
        });
    });

  var key;
    for(key in directMessages) {
      if(Array.isArray(directMessages[key])) {
        directMessages[key].map(item => console.log(key, "Items", item))
      }
       console.log(key);
      console.log(directMessages[key]);
      displayUserChat(`${key}`, directMessages[`${key}`]); 
      
    }
   }
   async function getUserName(userID) {
    let user = {};
    let userDisplayNameLocal = '';
    let usersDbRef = await firebase.database().ref('users').once('value', (dataSnapshot) => {
      dataSnapshot.forEach(childSnapshot => {
        if (childSnapshot.key === userID) {
          if (!childSnapshot.val().name) {
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