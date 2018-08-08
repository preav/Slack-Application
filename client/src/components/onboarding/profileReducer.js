import { createStore } from 'redux';

// Reducers
function userReducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_USER': 
      return [state, action.payload]; 
      case 'LOGOUT_USER': 
      return [state, action.payload];   
    default:
      return state;
  }
}
// store initialization

const store = createStore(userReducer, JSON.parse(window.localStorage.getItem("current_user"))||[]);
export default store;
