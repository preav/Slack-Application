import { hitEnter } from './command-line';

import './todolist/todolist-controller';

const enteredCommand = document.getElementById('enteredCommand');

enteredCommand.addEventListener('keydown', (e) => {
  // e.preventDefault();
  if (e.keyCode === 13) {
    hitEnter(e);
  }
});
