import firebase from 'firebase';
import viewHtml from './view';
let globallist=[
    {
        channels:[],
    },
    {
        users:[],
    },
    {
        messages:[]
    },
    {
        all:[]
    }
];

export function getAllChannels(teamId) {
    const db = firebase.database().ref(teamId + '/channelMsg');
    db.on('value', (channelList) => {
        channelList.forEach((channelIndex) => {
            console.log("channel"+channelIndex.key);
                let flag=true;
                for(let i=0;i<globallist[0].channels.length;i++){
                    if(globallist[0].channels[i]===channelIndex.key)
                        flag=false;
                }
                if(flag===true){
                    globallist[0].channels.push(channelIndex.key);
                    globallist[3].all.push(channelIndex.key);
                }
        });
    });
}

export function getAllUsers(teamId) {
    const db = firebase.database().ref('/users');
    db.on('value', (userList) => {
        userList.forEach((user) => {
            let flag=true;
                for(let i=0;i<globallist[1].users.length;i++){
                    if(globallist[1].users[i]===user.child('username').val())
                        flag=false;
                }
                if(flag===true){
                    globallist[1].users.push(user.child('username').val());
                    globallist[3].all.push(user.child('username').val());
                }
        });
    });
}

function getDirectMessages(){
    const users = firebase.database().ref('/team-6/directMessages/users');
    users.on('value', (snapshot) => {
        const getAllUserIds = Object.values(snapshot.val());
        const abc = getAllUserIds.map((msgVal) => {
            Object.entries(msgVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let message=msgData.messageText;
                    let rcvDate=msgData.date;
                    let by=msgData.sentBy;
                    let msgId=msgData.messageId;
                    let data={
                        text: message,
                        date: rcvDate,
                        sentby: by,
                        id: msgId 
                    }
                    globallist[2].messages.push(data);
                    globallist[3].all.push(message);
                });
            });
        });
    });
}

function getChannelMessages() {
    const channelMsg = firebase.database().ref('/team-6/channelMsg/');
    channelMsg.on('value', (snapshot) => {
        const getAllChannelValue = Object.values(snapshot.val());
        const abc = getAllChannelValue.map((chnVal) => {
            Object.entries(chnVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let message=msgData.messageText;
                    let rcvDate=msgData.date;
                    let by=msgData.sentBy;
                    let msgId=msgData.messageId;
                    let data={
                        text: message,
                        date: rcvDate,
                        sentby: by,
                        id: msgId 
                    }
                    globallist[2].messages.push(data);
                    globallist[3].all.push(message);
                });
            });
        });
    });
}

export function getAllMessages(){
    getDirectMessages();
    getChannelMessages();
}

export function searchAllChannels() {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $( "#tags" ).autocomplete({
            minLength: 0,
            source: globallist[0].channels,           
            appendTo: "#searchResult",
            focus: function( event, ui ) {
              $( "#tags" ).val( ui.item.value );
              return false;
            },
            select: function( event, ui ) {
              $( "#tags" ).val( ui.item.value );
              return false;
            }
          })
          .autocomplete( "instance" )._renderItem = viewHtml(ul,item);
    });
}

export function searchAllUsers() {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $( "#tags" ).autocomplete({
            minLength: 0,
            source: globallist[1].users,           
            appendTo: "#searchResult",
            focus: function( event, ui ) {
              $( "#tags" ).val( ui.item.value );
              return false;
            },
            select: function( event, ui ) {
              $( "#tags" ).val( ui.item.value );
              return false;
            }
          })
          .autocomplete( "instance" )._renderItem = viewHtml(ul,item);
    });
}

export function searchAll(){
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $( "#tags" ).autocomplete({
            minLength: 0,
            source: globallist[3].all,           
            appendTo: "#searchResult",
            focus: function( event, ui ) {
              $( "#tags" ).val( ui.item.value);
              return false;
            },
            select: function( event, ui ) {
              $( "#tags" ).val( ui.item.value );
              return false;
            }
          })
          .autocomplete( "instance" )._renderItem = viewHtml(ul,item);
    });
}

export default globallist;