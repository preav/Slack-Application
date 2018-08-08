import {searchAllChannels, searchAllUsers,getAllChannels,getAllUsers, searchAll, getAllMessages} from './service';
import globallist from './service';

document.getElementById('searchChannel').addEventListener('click', function () {
    let teamId = 'team-6'.toString();
    getAllChannels(teamId);
    searchAllChannels();
});

document.getElementById('searchPeople').addEventListener('click', function () {
    getAllUsers();
    searchAllUsers();
});

document.getElementById("searchAll").addEventListener('click', function () {
    searchAll();
    // searchAllChannels();
    // searchAllUsers();
});

$(document).ready(function () {
    let teamId = "team-6".toString();
    getAllUsers(teamId);
    getAllChannels(teamId);
    getAllMessages(teamId);
    console.log(globallist);
});
