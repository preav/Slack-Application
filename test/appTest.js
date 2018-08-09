const assert = require('chai').assert;
const app = require('../app');
//const createTodolistService = require('../client/src/components/slackbot/todolist/todolist-service');
import { createTodolistService,
    updateSlackBotTodolistResponse,
    getTodolistForUserService,
    markOrUnmarkOrDelete } from '../client/src/components/slackbot/todolist/todolist-service';
import { createReminderService,
    updateSlackBotReminderResponse,
    getReminderForUserService } from '../client/src/components/slackbot/reminder/reminder-service';
import { recastAPIservice } from '../client/src/components/slackbot/recastai/recastAPI-service';
import { createOtherbotService,
    updateSlackBotOtherbotResponse } from '../client/src/components/slackbot/otherbot/otherbot-service';
import { getChatHistoryForUserService } from '../client/src/components/slackbot/chat-history/chathistory-service'; 
import { createCalendarEventService,
    updateSlackBotCalendarResponse,
    getCalendarForUserService } from '../client/src/components/slackbot/calendar/calendar-service';
import { getGithubToken,
    createRepoFirebaseService,
    createRepoGithubService,
    createIssueGithubService,
    updateSlackBotResponse } from  '../client/src/components/slackbot/gitbot/gitbot-service';

describe('App', function () {
    describe('sayHello', function () {
        it('app should return hello', function () {
            let result = app.sayHello();
            assert.equal(result, 'hello');
        });

        it('sayHello should return type string', function () {
            let result = app.sayHello();
            assert.typeOf(result, 'string');
        });
    });

    describe('addNumbers', function () {
        it('addNumbers result should be more than 5', function () {
            let result = app.addNumbers(5, 6);
            assert.isAbove(result, 5);
        });

        it('addNumbers should return a result of type number', function () {
            let result = app.addNumbers(5, 6);
            assert.typeOf(result, 'number');
        });
    });

    describe('Test for todolist-service.js', function () {
        const widgetData_createTodolistService = {
            id: '',
            commandEntered: 'add a task to todolist for completing testing by today.',
            widgetName: 'todolist',
            task: 'completing testing by today-test cases',
            userId: 'testUser1',
            creatDate: '12/12/2012',
            creatTime: '12:12:12',
            currentdateTime: '12/12/2012 12:12:12',
            botResponse: '',
            taskCompleted: 'unchecked',
          };
        it('todolist task should get created. test -1', function () {
            createTodolistService(widgetData_createTodolistService).then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes.id, 'string');
            });
        });

        const botResponse = 'bot response from testing. test -2';
        it('todolist task should get updated', function() {
            updateSlackBotTodolistResponse(widgetData_createTodolistService, botResponse).then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes.botResponse, 'string');
            });
        });

        it('fetch todolist task for a user id- testUser1 test -3', function () {
            getTodolistForUserService('testUser1').then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes, 'string');
            });
        });

        it('mark todolist task as completed for a user id- testUser1 and task id -LJNHcm4Y5iAmmnWqfRD test -4', function () {
            markOrUnmarkOrDelete('unchecked','-LJNHcm4Y5iAmmnWqfRD','testUser1').then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes, 'string');
            });
        });
    });

    describe('Test for reminder-service.js', function () {
        const widgetData_reminder_service = {
            id: '',
            commandEntered: 'remind rahul at 5 pm today to go home.',
            widgetName: 'reminder',
            reminderTime: '5 pm',
            reminderDate: 'today',
            remindeeUser: 'rahul',
            userId: 'testUser1',
            creatDate: '12/12/2012',
            creatTime: '12:12:12',
            currentdateTime: '12/12/2012 12:12:12',
            botResponse: '',
          };
        it('save reminder data into firebase database. test -5', function () {
            createReminderService(widgetData_reminder_service).then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes.id, 'string');
            });
        });

        const botResponse = 'Sure I will remind (rahul) at today 5 pm';
        it('reminder should get updated test -6', function() {
            updateSlackBotReminderResponse(widgetData_reminder_service, botResponse).then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes.botResponse, 'string');
            });
        });

        it('fetch list of reminders for a user id- testUser1 test -7', function () {
            getReminderForUserService('testUser1').then((firebaseTodolistdRes)=>{
                assert.typeOf(firebaseTodolistdRes, 'string');
            });
        });
    });

    describe('Test for recastAPI-service.js', function () {
        const commandEntered = 'Please create a git repository with name js-repository.';
        it('recast should response back. test -8', function() {
            recastAPIservice(commandEntered).then((recastRes)=>{
                assert.equal(recastRes.intents[0].slug, 'create-git-repo');
            });
        });
    });

    describe('Test for other-service.js', function () {
        const widgetData_other_service = {
            id: '',
            commandEntered: 'Add deepak to coding channel.',
            widgetName: 'otherbot',
            channelName: 'coding',
            targetUser: 'deepak',
            userId: 'testUser1',
            creatDate: '12/12/2012',
            creatTime: '12:12:12',
            currentdateTime: '12/12/2012 12:12:12',
            botResponse: '',
          };
        it('save otherbot data into firebase database. test -9', function () {
            createOtherbotService(widgetData_other_service).then((firebaseOtherbotRes)=>{
                assert.typeOf(firebaseOtherbotRes.id, 'string');
            });
        });

        const botResponse = 'I have sent an acceptance request to (deepak).';
        it('otherbot should get updated test -10', function() {
            updateSlackBotOtherbotResponse(widgetData_other_service, botResponse).then((firebaseOtherbotRes)=>{
                assert.typeOf(firebaseOtherbotRes.botResponse, 'string');
            });
        });
    });

    describe('Test for chathistory-service.js', function () {
        it('chat history should fetched. test -11', function() {
            getChatHistoryForUserService('testUser1').then((chathistory)=>{
                assert.typeOf(chathistory, 'string');
            });
        });
    });

    describe('Test for calendar-service.js', function () {
        const widgetData_calendar_service = {
            id: '',
            commandEntered: 'New appointment with Andrew Tuesday at noon',
            widgetName: 'calendar-schedule',
            calendarEvent: 'appointment with Andrew',
            userId: 'testUser1',
            creatDate: '12/12/2012',
            creatTime: '12:12:12',
            currentdateTime: '12/12/2012 12:12:12',
            botResponse: '',
          };
        it('save calendar data into firebase database. test -12', function () {
            createCalendarEventService(widgetData_calendar_service).then((firebaseCalendarRes)=>{
                assert.typeOf(firebaseCalendarRes.id, 'string');
            });
        });

        const botResponse = 'I create a calendar event (new appointment), please check your calendar.';
        it('calendar event should get updated test -13', function() {
            updateSlackBotCalendarResponse(widgetData_calendar_service, botResponse).then((firebaseCalendarRes)=>{
                assert.typeOf(firebaseCalendarRes.botResponse, 'string');
            });
        });

        it('fetch list of calendar event for a user id- testUser1 test -14', function () {
            getCalendarForUserService('testUser1').then((firebaseCalendarRes)=>{
                assert.typeOf(firebaseCalendarRes, 'string');
            });
        });
    });

    describe('Test for gitbot-service.js', function () {
        it('fetch github api token test -15', function () {
            getGithubToken().then((firebaseGitbotRes)=>{
                assert.typeOf(firebaseGitbotRes, 'string');
            });
        });

        const widgetData_gitbot_service = {
            commandEntered: 'Please create a git repository with name js89-repository.',
            widgetName: 'create-git-repo',
            repositoryName: 'js89-repository',
            userId: 'testUser1',
            creatDate: '12/12/2012',
            creatTime: '12:12:12',
            currentdateTime: '12/12/2012 12:12:12',
          };
        it('save data for create repository into firebase database. test -16', function () {
            createRepoFirebaseService(widgetData_gitbot_service).then((firebaseGitbotRes)=>{
                assert.typeOf(firebaseGitbotRes.id, 'string');
            });
        });

        //const botResponse = 'I create a calendar event (new appointment), please check your calendar.';
        it('create repository into github account test -17', function() {
            createRepoGithubService('js89-repository').then((firebaseGitbotRes)=>{
                assert.typeOf(firebaseGitbotRes, 'string');
            });
        });

        it('create issue into github account for a repo. test -18', function() {
            createIssueGithubService('js89-repository', 'test-issue').then((firebaseGitbotRes)=>{
                assert.typeOf(firebaseGitbotRes, 'string');
            });
        });

        const botResponse = 'I have created repository (js89-repository) on github.';
        it('update slack response to firebase database test -19', function() {
            updateSlackBotResponse(widgetData_gitbot_service, botResponse).then((firebaseGitbotRes)=>{
                assert.typeOf(firebaseGitbotRes.botResponse, 'string');
            });
        });
    });

});



