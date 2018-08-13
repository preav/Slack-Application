import { searchAllChannels, searchAllUsers, getAllChannels, getAllUsers, searchAll, getAllMessages } from './service';
import { openChatDetailsForUser, openChatDetailsForChannel } from '../chats/chat-service';
import { openMsgForChannel, openMsgForUser } from './service';

let globallist = [
    {
        channels: [],
    },
    {
        users: [],
    },
    {
        messages: []
    },
    {
        all: []
    }
];

$(document).on("click", "#searchChannel", function () {
    globallist=[];
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search Channel");
    getAllChannels(teamId);
    console.log(globallist);
    searchAllChannels(teamId);
    $("#tags").val("").focus();
});

$(document).on("click", "#searchPeople", function () {
    globallist=[];
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search People");
    getAllUsers(teamId);
    console.log('people' + globallist);
    searchAllUsers(teamId);
    $("#tags").val("").focus();
});

$(document).on("click", "#searchAll", function () {
    globallist=[];
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search All");
    getAllChannels(teamId);
    getAllUsers(teamId);
    getAllMessages(teamId);
    console.log(globallist);
    searchAll(teamId);
    $("#tags").val("").focus();
});

$(document).on("click", '.search-channels', function () {
    const teamID = $(this).data('teamid');
    const channelId = $(this).data('channelid');
    openChatDetailsForChannel(channelId, teamID);
    $("#searchModal").modal('hide');
});

$(document).on("click", '.search-users', function () {
    const teamID = $(this).data('teamid');
    const userId = $(this).data('username');
    openChatDetailsForUser(userId, teamID);
    $("#searchModal").modal('hide');
});


$(document).on("click",'.search-message',function(){
    const teamId=$(this).data('teamid');
    const msg=$(this).data('message');
    const sentTo=$(this).data('sentTo');
    const sentBy=$(this).data('sentBy');
    const state=$(this).data('state');
    const date=$(this).data('date');
    if(state===true)
        openMsgForUser(sentTo,teamId);
    else
        openMsgForChannel(sentTo,teamId);
    $("#searchModal").modal('hide');
});

export default globallist;
