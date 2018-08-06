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


require('font-awesome/css/font-awesome.css');


jQuery(document).ready(() => {
  getAllChannels();
  getAllUsers();
});
