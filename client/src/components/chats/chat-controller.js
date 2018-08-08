export const ADD_CHAT = 'ADD_CHAT';
import { hitEnter } from '../slackbot/command-line';

//action creators
export function addChatToStore(message, currentDateTime, sentBy, sentTo) {
    return {
        type: ADD_CHAT,
        message,
        currentDateTime,
        sentBy,
        sentTo
    }
}


