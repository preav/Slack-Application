export const ADD_CHAT = 'ADD_CHAT';

//action creators
export function addChatToStore(message, currentDateTime, sentBy) {
    return {
        type: ADD_CHAT,
        message,
        currentDateTime,
        sentBy
    }
}

$('#enteredCommand').emojioneArea({ pickerPosition : "top"});