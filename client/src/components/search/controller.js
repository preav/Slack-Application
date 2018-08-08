import {searchAllChannels, searchAllUsers,getAllChannels,getAllUsers, searchAll, getAllMessages} from './service';
import globallist from './service';

$(document).on("click", "#searchChannel", function () {
    let teamId = $(this).data('teamid').toString();
    $("#searchTitle").html("Search Channel");
    getAllChannels(teamId);
    searchAllChannels();
    $("#tags").val("");
});

$(document).on("click", "#searchAll", function () {
    $("#searchTitle").html("Search All");
    $("#tags").val("");
});

$(document).on("click", "#searchPeople", function () {
    $("#searchTitle").html("Search People");
    getAllUsers();
    searchAllUsers();
    $("#tags").val("");
});

document.getElementById("searchAll").addEventListener('click', function () {
    searchAll();
});

$(document).ready(function () {
    let teamId = "team-6".toString();
    getAllUsers(teamId);
    getAllChannels(teamId);
    getAllMessages(teamId);
    console.log(globallist);
});
