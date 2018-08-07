const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp();


exports.sendNotification = functions.database.ref('/conversations/userID001/messages')
    .onWrite((change, context) => {
        const messageUid = context.params.messageUid;


        if (!change.after.val()) {
            return console.log('User ', messageUid);
        }
        console.log('We have a new Message UID:', messageUid);


        // Get the sender profile.
        const getUserProfile = admin.auth().getUser(messageUid);

        // The snapshot to the user's tokens.
        let tokensSnapshot;

        // The array containing all the user's tokens.
        let tokens;

        return Promise.all([getDeviceTokensPromise, getUserProfile]).then(results => {
            tokensSnapshot = results[0];
            const follower = results[1];

            // Check if there are any device tokens.
            if (!tokensSnapshot.hasChildren()) {
                return console.log('There are no notification tokens to send to.');
            }
            console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
            console.log('Fetched follower profile', follower);

            // Notification details.
            const payload = {
                notification: {
                    title: 'You have a new Message!',
                    body: `${follower.displayName} is now following you.`,
                    icon: follower.photoURL
                }
            };

            // Listing all tokens as an array.
            tokens = Object.keys(tokensSnapshot.val());
            // Send notifications to all tokens.
            return admin.messaging().sendToDevice(tokens, payload);
        }).then((response) => {
            // For each message check if there was an error.
            const tokensToRemove = [];
            response.results.forEach((result, index) => {
                const error = result.error;
                if (error) {
                    console.error('Failure sending notification to', tokens[index], error);
                    // Cleanup the tokens who are not registered anymore.
                    if (error.code === 'messaging/invalid-registration-token' ||
                        error.code === 'messaging/registration-token-not-registered') {
                        tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
                    }
                }
            });
            return Promise.all(tokensToRemove);
        });
    });