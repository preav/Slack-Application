import { recastAPIservice } from '../recastai/recastAPI-service';

import { createRepository } from './gitbot-controller';

export const hitEnter = function (e) {
  if (e.keyCode === 13) { // checks whether the pressed key is "Enter"
  // calling recast api
    recastAPIservice(e.target.value).then((recastResponse) => {
      console.log(`command-line-cotroller.js  recastResponse slug= ${recastResponse.intents[0].slug}`);
      if (recastResponse.intents[0].slug === 'create-git-repo') {
        const widgetData = {
          id: '',
          commandEntered: e.target.value,
          taskWidgetName: recastResponse.intents[0].slug,
          repositoryName: recastResponse.entities.git_repo[0].value,
          repositoryCmt: '',
        };

        console.log(`widgetData=${widgetData}`);

        // save createRepository widget state to database code --> calling gitbot-controller
        createRepository(widgetData);
      }
    }).catch((err) => {
      console.log(err, 'error in command-line-controller.js ...');
    });
  }
};
