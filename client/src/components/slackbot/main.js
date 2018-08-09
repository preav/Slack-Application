import { getUserSlackbotChatHistory } from './chat-history/chathistory-controller';
import './todolist/todolist-controller';
import { sendReminderMeaageOnTime } from './reminder/reminder-controller';

// const enteredCommand = document.getElementById('enteredCommand');

// enteredCommand.addEventListener('keydown', (e) => {
//   // e.preventDefault();
//   if (e.keyCode === 13) {
//     hitEnter(e);
//   }
// });

const user = JSON.parse(window.localStorage.getItem("current_user"));
getUserSlackbotChatHistory(user.user.userName); 

setInterval(function(){ sendReminderMeaageOnTime(); }, 10000);

