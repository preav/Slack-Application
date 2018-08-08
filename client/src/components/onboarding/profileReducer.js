import { createStore } from 'redux';

// Reducers
function userReducer(state = {}, action) {
  switch (action.type) {   
      case 'LOGOUT_USER': 
      return {};  
      case 'LOGIN':
      return {
        state,
        data: action.value
    }      
    default:
      return state;
  }
}
// store initialization

const store = createStore(userReducer, JSON.parse(window.localStorage.getItem("current_user"))||[]);
export default store;
