import 'jquery';
import 'jquery-ui/ui/widgets/sortable';

import 'jquery-ui/ui/widgets/autocomplete';

import 'popper.js';
import 'bootstrap';
import 'jquery-ui/ui/disable-selection';
import '../scss/main.scss';
import firebase from 'firebase';

import {
    fnCreateChannel,
} from './collaboration/adminSetting/adminSettingService';
import { config } from '../../../config/config';

import 'emojione';

import 'emojionearea';

// import for slackbot main.js
import 'datejs';
import './slackbot/main';

import './chats/chat-service';

import 'firebase';

import '../../../firebase/firebase';

import '../components/notification/dateFiltercontroller';

import './onboarding/main';


import './notifications/notification-controller';


import '../components/search/controller';

import '../../../firebase/firebase';
import { hitEnter } from './slackbot/command-line';
require('font-awesome/css/font-awesome.css');

import { sendMessage } from '../components/chats/chat-service';

$("#enteredCommand").emojioneArea({
    inline: false,
    pickerPosition: 'top',
    events: {
        keypress: function (editor, event) {
            if (event.which == 13) {
                event.preventDefault();
                var enteredValue = $('#enteredCommand').data("emojioneArea").getText();
                var slackWindow = $("#enteredCommand").attr('data-slackbot');
                if (slackWindow == "true") {
                    hitEnter(enteredValue);
                    $('#enteredCommand').data("emojioneArea").setText('');
                } else {
                    sendMessage();
                }

            }
        }
    }
});
