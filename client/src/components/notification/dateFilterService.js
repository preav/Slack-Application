import firebase from 'firebase';
import {displayUserChat,displayChannelsChat} from './dateFilterView';
import database from '../../../../firebase/firebase';
console.log("Database", database);

const userID='Triveni';
const teamId='team-6';
export function getMessagesFromFireBase(startDate, endDate) {
  document.getElementById('chatResult').style.display='block';
   channelMessages(startDate, endDate);
   directMessages(startDate, endDate);
    
}

function channelMessages(startDate, endDate){
  let formatedDate;
  console.log("/"+`${teamId}`+"/channelMsg");
  const channelMsg=database.ref("/"+`${teamId}`+"/channelMsg");
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
  formatDate =  datevalues[1]+"/"+datevalues[2]+"/"+datevalues[0]+ " "+datevalues[3]+":"+datevalues[4];
     }
     return formatDate;
    }


  function directMessages(startDate, endDate){
    let formatedDate;
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
                      let sentTo=msgData.sentTo;  
                      let message=msgData.messageText;
                      if(sentby === `${userID}` || sentTo === `${userID}`)
                      {
                        const msg= `${sentby}` +"-"+ `${formatedDate}`+" : "+`${message}`;           
                        displayUserChat(`${sentby}`, `${msg}`);
                      }
               }  
                });
            });
        });
    });
   }