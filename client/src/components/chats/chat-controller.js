export const ADD_CHAT = 'ADD_CHAT';

//action creators
export function addChatToStore(message, currentDateTime, sentByUserName, sentToUserName, sentByDisplayName) {
    return {
        type: ADD_CHAT,
        message,
        currentDateTime,
        sentByUserName,
        sentToUserName,
        sentByDisplayName
    }
}


