import { hitEnter } from './command-line';
import { getUserChatHistory } from './chat-history/chathistory-controller';

import './todolist/todolist-controller';
$(document).ready(function() {
  // const enteredCommand = document.querySelector('.emojionearea-editor');

  $(".emojionearea").keydown(function(e){
    alert("Hello");
    if (e.keyCode === 13) {
      hitEnter(e);
    }
  })

  // enteredCommand.addEventListener('keydown', (e) => {
  //   // e.preventDefault();
  //   if (e.keyCode === 13) {
  //     hitEnter(e);
  //   }
  // });
})


getUserChatHistory('testUser1'); // pass real user
