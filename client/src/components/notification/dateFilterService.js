import 'firebase';
import {chatDisplay} from './dateFilterView';
import rootRef from '../../../../firebase/firebase';

export function getMessagesFromFireBase(startDate, endDate) {
  
    document.querySelector('#chatResult').appendChild(chatDisplay());      
      
  //  chatDisplay();
    /*const rootRef = firebase.database().ref('team001');
    const userlist = rootRef.child('conversations').child('userID001').child('messages');
    userlist.on('value', (userDetails) => {    
      userDetails.forEach((user) => {     
        const name = user.child('name').val();      
        const usermsgbody = user.child('body');  
         const text= usermsgbody.child('text').val() + " "+usermsgbody.child('firebaseTimestamp').val();      
         document.querySelector('#playGround').appendChild(createSearchResult(name,text));      
        
      });*/
     /* const userID="userID_sushma";
      //const team = firebase.database().ref('team-6');
     
     
      //search for channels where user is present
      const channels=rootRef.child("channels");
      channels.on('value', (chanelDetails) => {      
        const channelslist=chanelDetails.val();
        channelslist.forEach((cha) => { 
            const users=cha.child;
                users.forEach((userid) => {
                    if(userid === '${userID}')
                    {  const msgs=  userid.child("messages").child("messageText").queryOrderedByChild("date").
            queryStartingAtValue(`${startDate}`).queryEndingAtValue(`${endDate}`);
                    }

                    
                 });
          
            const usersList=channel.key;
            usersList.forEach((user) => {
                if(user.val() === `${userID}`)
                {
                    
                }

             });
            
            createChannelSearchResult(channelName,msgs);
      

          if(channel.key === `${userID}`)
          {
            const msgObject=user.child("messages").child("messageText").queryOrderedByChild("date").
            queryStartingAtValue(`${startDate}`).queryEndingAtValue(`${endDate}`);
            createChannelSearchResult(channelName,msgObject.val());
          }
        });     
  
      });
  */
  
    /*  const directMsgUsersList=team.child("directMessages").users;
      directMsgUsersList.on('value', (userslist) => {   
      //  const communicatedUserId=userslist.key;
        userslist.child("messages")
  
      });*/
  
      //
  
  
  
    //converting date from firebase timestamp to mm/dd/yyyy
function dateConverter(data){
    var timestamp   = data.timestamp.toString().substring(0,10),
  date        = new Date(timestamp * 1000),
  datevalues  = [  date.getFullYear(),
                   date.getMonth()+1,
                   date.getDate(),
                   date.getHours(),
                   date.getMinutes(),
                   date.getSeconds(),
                ]; //=> [2011, 3, 25, 23, 0, 0]
   var check =  datevalues[1]+"/"+datevalues[2]+"/"+datevalues[0];
   if((check.getTime() <= endDate.getTime() && check.getTime() >= startDate.getTime())) 
   {     alert("date contained");
   var formatDate =  datevalues[1]+"/"+datevalues[2]+"/"+datevalues[0]+ " "+datevalues[3]+":"+datevalues[4];
   return formatDate;
     }
              
    }


  /* function directMessages(){
      const db=firebase.database().ref('/team-6/directMessages/users');
      db.on('value',(userList)=>{
          userList.forEach((id)=>{
            if(id === `${userID}`){
              id.forEach((msg)=>{
                let rcvDate=msg.child("date").val();
                let formatedDate = dateConverter(rcvDate);
                  if(formatedDate != null){
                    let sentby=msg.child("sentBy").val();
                    let sentTo=msg.child("sentTo").val();    
                    let message=msg.child('messageText').val();

                    if(sentby != `${userID}` || )

                  }
               
                  let data={
                      text: message,
                      date: rcvDate,
                      sentby: by,
                      id: msgId
                  }
                  globallist[2].messages.push(data);
              });}
          });
      });
   }*/

  }