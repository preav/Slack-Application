import {searchAllChannels, searchAllUsers,getAllChannels,getAllUsers, searchAll, getAllMessages} from './service';
import globallist from './service';

$(document).on("click", "#searchChannel", function () {
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search Channel");
    getAllChannels(teamId);
    console.log(globallist);
    searchAllChannels();
    $("#tags").val("").focus();
});

$(document).on("click", "#searchPeople", function () {
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search People");
    getAllUsers(teamId);
    console.log('people'+globallist);
    searchAllUsers();
    $("#tags").val("").focus();
});

$(document).on("click", "#searchAll", function () {
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search All");
    getAllChannels(teamId);
    getAllUsers(teamId);
    getAllMessages(teamId);
    console.log(globallist);
    searchAll();
    $("#tags").val("").focus();
});



// $(document).ready(function () {
//     let teamId = "team-6".toString();
//     getAllUsers(teamId);
//     getAllChannels(teamId);
//     getAllMessages(teamId);
//     console.log(globallist);
// });