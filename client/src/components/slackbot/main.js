import { hitEnter } from './command-line';
import { getUserChatHistory } from './chat-history/chathistory-controller';
import './todolist/todolist-controller';
import { sendReminderMeaageOnTime } from './reminder/reminder-controller';

// const enteredCommand = document.getElementById('enteredCommand');

// enteredCommand.addEventListener('keydown', (e) => {
//   // e.preventDefault();
//   if (e.keyCode === 13) {
//     hitEnter(e);
//   }
// });

getUserChatHistory('testUser1'); // pass real user

setInterval(function(){ sendReminderMeaageOnTime(); }, 10000);

