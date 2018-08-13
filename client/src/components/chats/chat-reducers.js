import { ADD_CHAT } from './chat-controller'

// Reducer
export function chat(state = [], action) {
    switch (action.type) {
        case ADD_CHAT:
            return addToChat(state, action);
        default:
            return state;
    }
}

export function addToChat(state, action) {
    return [
        ...state,
        {
            messageText: action.message,
            date: action.currentDateTime,
            sentByUserName: action.sentByUserName,
            sentToUserName: action.sentToUserName,
            sentByDisplayName: action.sentByDisplayName
        }
    ]
}