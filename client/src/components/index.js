import 'jquery';

import 'jquery-ui/ui/widgets/sortable';

import 'popper.js';

import 'bootstrap';

import 'jquery-ui/ui/disable-selection';

import 'emojione';

import 'emojionearea';

// import for slackbot main.js
import './slackbot/main';

import './chats/chat-service';

$("#end").change(function () {
    var startDate = document.getElementById("start").value;
    var endDate = document.getElementById("end").value;
 
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("end").value = "";
    }
});


import '../../../firebase/firebase';


require('font-awesome/css/font-awesome.css');
