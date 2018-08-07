import 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'popper.js';
import 'bootstrap';
import 'jquery-ui/ui/disable-selection';
import '../scss/main.scss';
import firebase from 'firebase';
import {
  getAllChannels, getAllUsers,
} from './collaboration/userSetting/userSettingService';
import {
  fnCreateChannel,
} from './collaboration/adminSetting/adminSettingService';
import { config } from '../../../config/config';

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

import 'firebase';

import '../../../firebase/firebase';

import '../components/notification/dateFiltercontroller';

import './onboarding/main';


import './notifications/notification-controller';
import './notifications/firebase';


require('font-awesome/css/font-awesome.css');


jQuery(document).ready(() => {
  getAllChannels();
  getAllUsers();
});
