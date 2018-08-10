import './firebase-config';
import firebase from 'firebase';
import apiURL from '../client/src/components/constants';

// Get a reference to the database service
// const database = firebase.database();

export function saveUpdateUser(userId, userData) {
  // console.log(`${apiURL}/saveUpdateUser?userId=${userId}`);
  console.log(userData);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${apiURL}/saveUpdateUser?userId=${userId}`,
      type: 'POST',
      data: JSON.stringify(userData),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'text',
      success(data) {
        resolve(data);
      },
      error(e) {
        reject(e.statusText);
      },
    });
  });
}

export function saveUpdateTeam(teamName, teamData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${apiURL}/saveUpdateTeam?teamName=${teamName}`,
      type: 'POST',
      data: JSON.stringify(teamData),
      contentType: 'application/json;charset=UTF-8',
      dataType: 'text',
      success(data) {
        resolve(data);
      },
      error(e) {
        reject(e.statusText);
      },
    });
  });
}

export function getCurrentUserDetails() {
  const userUID = firebase.auth().currentUser.uid;
  console.log(userUID);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${apiURL}/getUser?userId=${userUID}`,
      type: 'GET',
      // data: {varName : varValue},
      success(data) {
        resolve(data);
      },
      error(e) {
        console.log(e);
        reject(e);
      },
    });
  });
}

export async function getTeamDetail(teamName) {
  const result = await $.ajax({
    url: `${apiURL}/getTeam?teamName=${teamName}`,
    type: 'GET',
    // data: {varName : varValue},
  });
  return result;
}
