import './firebase-config';
import firebase from 'firebase';

// Get a reference to the database service
const database = firebase.database();

export function writeUserData(userObject) {
  // to Write the data
  database.ref(`users/${userObject.uid}`).set({
    username: userObject.username,
    accessToken: userObject.accessToken,
    name: userObject.name,
    email: userObject.email,
    profilePicture: userObject.profilePicture,
    phoneNumber: userObject.phoneNumber,
    gitURL: userObject.gitURL,
    teams: userObject.teams,
    status: userObject.status,
    permission: userObject.permission,
  });
}

export function saveUpdateUser(userObject) {
  // read the data
  database.ref(`/users/${userObject.uid}`).once('value', (snapshot) => {
    // console.log(snapshot.val());

    if (snapshot.val() != null) {
      console.log('User found in database ');
      //   const uId = snapshot.key;
      //   const { name, email, profilePicture } = snapshot.val();
      //   console.log('User', snapshot.val());
      //   console.log(`user object: ${uId}, ${name}, ${email}, ${profilePicture}`);
      //   console.log(user);
    } else {
      console.log('User not found in database: Saving user');
      writeUserData(userObject);
    }
  });
}

export function writeTeamData(teamObject) {
  database.ref(`teams/${teamObject.teamName}`).set({
    companyName: teamObject.companyName,
    private: teamObject.private,
    users: teamObject.users,
    admins: teamObject.admins,
  });
}

export function saveUpdateTeam(teamObject) {
  database.ref(`/teams/${teamObject.teamName}`).once('value', (snapshot) => {
    if (snapshot.val() != null) {
      console.log('Team found in database');
    } else {
      console.log('Team not found in database: Saving team');
      writeTeamData(teamObject);
    }
  });
}

export function getTeamsOfCurrentUser() {
  const userUID = firebase.auth().currentUser.uid;
  console.log(userUID);

  const joinedTeams = [];
  database.ref('/teams/').orderByValue().on('value', (snapshot) => {
    // console.log(snapshot.val());
    $.each(snapshot.val(), (key, val) => {
      // console.log(key);
      // console.log(val);
      $.each(val.users, (k, v) => {
        // console.log(k);
        // console.log(v);
        if (userUID === v) {
          joinedTeams.push(key);
        }
      });
    });

    console.log(joinedTeams);

    // Adding
    if (joinedTeams.length === 0) {
      $('#teamsDisplayHeader').empty().append("You're not of part of any Slack workspace yet.");
    } else {
      $('#teamsDisplayHeader').empty().append("You're already a member of these Slack workspaces:");
      $('#teamsDisplay').empty();
      $.each(joinedTeams, (k, v) => {
        $('#teamsDisplay').append(`<a class="team-link" href="javascript:void(0)">${v}</a>`);
      });
    }
  });
}

// writeUserData(
//   {
//     userId: '2',
//     name: 'Ocean Life',
//     email: 'oceank007@gmail.com',
//     imageUrl: 'https://myimage1.png',
//     teams: ['team-one', 'team-two'],
//     status: 'active',
//     permission: { write: false, read: true },
//   },
// );
// getUserData(2);
