export const ADD_CHAT = 'ADD_CHAT';

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


