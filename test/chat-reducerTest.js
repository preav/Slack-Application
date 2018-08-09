import { assert } from 'chai';
import { createStore } from 'redux';
import { chat } from '../client/src/components/chats/chat-reducers';
import { addChatToStore } from '../client/src/components/chats/chat-controller';

describe('ChatReducer', () => {
  it('should add a Chat', () => {
        // Set
        const messageText = 'Hello';
        const sentBy = 'anilkumar-bv';
        const sentTo = 'deekumar18';
        const currentDateTime = Date.now();
        const store = createStore(chat);

        // Act
        store.dispatch(addChatToStore(messageText, currentDateTime, sentBy, sentTo));
        console.log('Store.state', store.getState());
        const result = store.getState();

        // Assert
        assert.equal(result[0].sentBy, 'anilkumar-bv');
    });
});