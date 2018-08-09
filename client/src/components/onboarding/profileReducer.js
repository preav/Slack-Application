import { createStore } from 'redux';

// Reducers
function userReducer(state = {}, action) {
  switch (action.type) {   
      case 'LOGOUT_USER': 
      return null;  

      case 'LOGIN':
      return Object.assign({}, action.obj);

      default:
      return state;
  }
}
// store initialization

export const store = createStore(userReducer, JSON.parse(window.localStorage.getItem("current_user"))||[]);

export function callCurrentUserData (userId, userData, currentTeamData) {

  const curretUser = {
    "user": {
      "userName": userData.username,
      "currentTeams": {
        "teamName": currentTeamData,
        "channals": []
      },
      "teams": userData.teams
    }};      
 return curretUser;
}