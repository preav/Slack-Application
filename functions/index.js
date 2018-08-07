const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// To handle CROSS-ORIGIN exception
const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    response.send("Hello Slack Developers from Firebase!");
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
    cors(request, response, () => {});
    const userId = request.query.userId;
    const userData = request.body;
    console.log("userId: " + userId);
    console.log(request.query);
    console.log(request.body);

    admin.database().ref('/users/' + userId).once('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        console.log(snapshot.val() === null);

        if (snapshot.val() === null) {
            return admin.database().ref('/users/' + userId).set(userData, (error) => {
                //console.log(snapshot);
                if (error) {
                    console.log("Error occurred while saving user: " + error);
                    return response.json(error);
                } else {
                    console.log("User saved successfully");
                    return response.json("User saved successfully");
                }
            });
        } else {
            return admin.database().ref('/users/' + userId).update(userData, (error) => {
                //console.log(snapshot);
                if (error) {
                    console.log("Error occurred while updating user: " + error);
                    return response.json(error);
                } else {
                    console.log("User updated successfully");
                    return response.json("User updated successfully");
                }
            });
        }
    });
});

// Get user Info
// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
exports.getUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    const userId = request.query.userId;
    console.log("userId: " + userId);

    return admin.database().ref('/users/' + userId).once('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        response.json(data);
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