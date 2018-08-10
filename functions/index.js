const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// To handle CROSS-ORIGIN exception
const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        response.send("Hello Slack Developers from Firebase!");
    });
});


// Save update user.

// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
// **JSON FORMAT**
// {
//     "username":"onetwothreefour",
//     "email":"xyz@mail.com",
//     "phone":"239472974927"
// }
exports.saveUpdateUser = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const userId = request.query.userId;
        const userData = request.body;
        console.log("userId: " + userId);
        console.log(request.query);
        console.log(request.body);
        console.log("Request method: "+request.method);

        admin.database().ref('/users/' + userId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            console.log(snapshot.val() === null);

            if (snapshot.val() === null) {
                admin.database().ref('/users/' + userId).set(userData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while saving user: " + error);
                        response.send(error);
                    } else {
                        console.log("User saved successfully");
                        response.send("User saved successfully");
                    }
                });
            } else {
                admin.database().ref('/users/' + userId).update(userData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while updating user: " + error);
                        response.send(error);
                    } else {
                        console.log("User updated successfully");
                        response.send("User updated successfully");
                    }
                });
            }
        });
    });
});

// Get user Info
// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
exports.getUser = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const userId = request.query.userId;
        console.log("userId: " + userId);

        admin.database().ref('/users/' + userId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            response.send(data);
        });
    });
});



exports.sendNotifications = functions.database.ref('/team6/directMessages/users/{userId}').onWrite((event) => {
    // Exit if data already created
    if (event.data.previous.val()) {
        return;
    }

    // Exit when the data is deleted
    if (!event.data.exists()) {
        return;
    }

    // Setup notification
    const NOTIFICATION_SNAPSHOT = event.data;
    const payload = {
        notification: {
            title: `New Message from ${NOTIFICATION_SNAPSHOT.val().user}!`,
            body: NOTIFICATION_SNAPSHOT.val().message,
            icon: NOTIFICATION_SNAPSHOT.val().userProfileImg,
            click_action: `https://${functions.config().firebase.authDomain}`,
        },
    };

    function cleanInvalidTokens(tokensWithKey, results) {
        const invalidTokens = [];

        results.forEach((result, i) => {
            if (!result.error) return;

            console.error('Failure sending notification to', tokensWithKey[i].token, result.error);

            switch (result.error.code) {
                case 'messaging/invalid-registration-token':
                case 'messaging/registration-token-not-registered':
                    invalidTokens.push(admin.database().ref('/tokens').child(tokensWithKey[i].key).remove());
                    break;
                default:
                    break;
            }
        });

        return Promise.all(invalidTokens);
    }


    return admin.database().ref('/tokens').once('value').then((data) => {
        if (!data.val()) return;

        const snapshot = data.val();
        const tokensWithKey = [];
        const tokens = [];

        for (const key in snapshot) {
            tokens.push(snapshot[key].token);
            tokensWithKey.push({
                token: snapshot[key].token,
                key,
            });
        }

        return admin.messaging().sendToDevice(tokens, payload)
            .then(response => cleanInvalidTokens(tokensWithKey, response.results))
            .then(() => admin.database().ref('/notifications').child(NOTIFICATION_SNAPSHOT.key).remove());
    });
});

// Create/Update Team
// **URL FORMAT**
//saveUpdateTeam?teamName=team-one
// **JSON FORMAT**
// {
//     "admins":["user1","user2"],
//     "companyName":"Sapient"
// }
exports.saveUpdateTeam = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const teamId = request.query.teamName;
        const teamData = request.body;
        console.log("teamId: " + teamId);
        console.log(request.query);
        console.log(request.body);
        console.log("Request method: "+request.method);

        admin.database().ref('/teams/' + teamId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            console.log(snapshot.val() === null);

            if (snapshot.val() === null) {
                admin.database().ref('/teams/' + teamId).set(teamData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while saving team: " + error);
                        response.send(error);
                    } else {
                        console.log("Team saved successfully");
                        response.send("Team saved successfully");
                    }
                });
            } else {
                admin.database().ref('/teams/' + teamId).update(teamData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while updating team: " + error);
                        response.send(error);
                    } else {
                        console.log("Team updated successfully");
                        response.send("Team updated successfully");
                    }
                });
            }
        });
    });
});

// Get user Info
// **URL FORMAT**
//saveUpdateTeam?teamName=team-one
exports.getTeam = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const teamId = request.query.teamName;
        console.log("teamId: " + teamId);

        admin.database().ref('/teams/' + teamId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            response.send(data);
        });
    });
});

exports.deleteTeam = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const teamId = request.query.teamName;
        admin.database().ref('/teams/' + teamId).remove();
    });
 });