import 'jquery';
import 'popper.js';
import 'bootstrap';
import "../scss/style.scss";
import { recastAPIservice } from './recastai/recastAPI-service';

var enteredCommand = document.getElementById("enteredCommand");

enteredCommand.addEventListener("keydown", function (e) {
    //e.preventDefault();
   
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
         //calling recast api
         recastAPIservice(e.target.value).then((recastResponse) => {
            console.log('main.js action name = '+recastResponse.intents[0].slug);  
            if(recastResponse.intents[0].slug === 'create-git-repo'){
                const widgetData = {
                    id : '',
                    commandEntered : e.target.value,
                    taskWidgetName : recastResponse.intents[0].slug, 
                    repositoryName : recastResponse.entities.git_repo[0].value,
                    repositoryCmt : ''
                }

console.log('widgetData=' + widgetData);
            }else if(recastResponse.intents[0].slug === 'create-git-issue'){
                store.dispatch({
                    type : recastResponse.intents[0].slug, 
                    data: {taskWidgetName: recastResponse.intents[0].slug, 
                            repositoryName: recastResponse.entities.git_repo[0].value, 
                            issuename: recastResponse.entities.git_issue[0].value
                        }
                }); 
            }else if(recastResponse.intents[0].slug === 'fetch-all-git-issue'){

                getAllIssuesForRepoService(recastResponse.entities.git_repo[0].value).then((gitAllIssueRes) => {
                    console.log('in command line - gitAllIssueRes ='+gitAllIssueRes);
                    store.dispatch({
                        type : recastResponse.intents[0].slug, 
                        data: {taskWidgetName: recastResponse.intents[0].slug, 
                                repositoryName: recastResponse.entities.git_repo[0].value,
                                listOfIssues : gitAllIssueRes
                            }
                    });
                });

                 
            }else if(recastResponse.intents[0].slug === 'add-git-coleborator'){
                addCollaboratorCtrl(recastResponse.entities.git_repo[0].value, recastResponse.entities.git_collaborator[0].value);
            }
        }).catch(function(err){
            console.log(err, 'error in main.js ...-');
        });
    }
});

