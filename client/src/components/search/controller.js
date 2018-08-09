import {searchAllChannels, searchAllUsers,getAllChannels,getAllUsers, searchAll, getAllMessages} from './service';
import globallist from './service';

$(document).on("click", "#searchChannel", function () {
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search Channel");
    teamId = "team-6".toString();
    getAllChannels(teamId);
    searchAllChannels();
    $("#tags").val("");
});

$(document).on("click", "#searchAll", function () {
    let teamId = $(this).data('teamid');
    teamId = "team-6".toString();
    $("#searchTitle").html("Search All");
    getAllChannels(teamId);
    getAllUsers(teamId);
    getAllMessages(teamId);
    searchAll();
    $("#tags").val("");
});

$(document).on("click", "#searchPeople", function () {
    let teamId = $(this).data('teamid');
    $("#searchTitle").html("Search People");
    getAllUsers(teamId);
    searchAllUsers();
    $("#tags").val("");
});

$(document).ready(function () {
    let teamId = "team-6".toString();
    getAllUsers(teamId);
    getAllChannels(teamId);
    getAllMessages(teamId);
    console.log(globallist);
});
