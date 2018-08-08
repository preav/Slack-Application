import firebase from 'firebase';
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
]
;
export function getAllChannels(teamId) {
    const db = firebase.database().ref(teamId + '/channels');
    db.on('value', (channelList) => {
        channelList.forEach((channelIndex) => {
            channelIndex.forEach((channel)=>{
                let flag=true;
                for(let i=0;i<globallist[0].channels.length;i++){
                    if(globallist[0].channels[i]===channel.key)
                        flag=false;
                }
                if(flag===true){
                    globallist[0].channels.push(channel.key);
                    globallist[3].all.push(channel.key);
                }
            });
        });
    });
}

export function getAllUsers(teamId) {
    const db = firebase.database().ref('/users');
    db.on('value', (userList) => {
        userList.forEach((user) => {
            let flag=true;
                for(let i=0;i<globallist[1].users.length;i++){
                    if(globallist[1].users[i]===user.child('name').val())
                        flag=false;
                }
                if(flag===true){
                    globallist[1].users.push(user.child('name').val());
                    globallist[3].all.push(user.child('name').val());
                }
        });
    });
}

function getDirectMessages(){
    const db=firebase.database().ref('/team-6/directMessages/users');
    db.on('value',(userList)=>{
        userList.forEach((id)=>{
            let prnt=id.child('messages');
            id.forEach((msg)=>{
                let message=msg.child('messageText').val();
                let rcvDate=msg.child("date").val();
                let by=msg.child("sentBy").val();
                let msgId=msg.child("messageId").val();
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
}

function getChannelMessages(){
    const db=firebase.database().ref('/team-6/channels/0/chn001/users');
    db.on ('value',(userList)=>{
        userList.forEach((userId)=>{
            userId.forEach((user)=>{
                user.forEach((msg)=>{
                let message=msg.child('messageText').val();
                let rcvDate=msg.child("date").val();
                let by=msg.child("sentBy").val();
                let msgId=msg.child("messageId").val();
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
          .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $(`<li class="list-group-item"><i style="font-size:10px">ch-</i>${item.value}</li>`)
              .appendTo( ul );
          };
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
          .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $(`<li class="list-group-item"><i style="font-size:10px">dm-</i>${item.value}</li>`)
              .appendTo( ul );
          };
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
          .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $(`<li class="list-group-item">${item.value}</li>`)
              .appendTo( ul );
          };
    });
}

export default globallist;