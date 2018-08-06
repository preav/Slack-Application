const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// To handle CROSS-ORIGIN exception
const cors = require('cors')({origin: true});

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
// 	"data":
// 	{
// 		"username":"onetwothreefour",
// 		"email":"xyz@mail.com",
// 		"phone":"239472974927"
// 	},
// 	"action":"UPDATE_USER"
// }
exports.saveUpdateUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    const userId = request.query.userId;
    const data = request.body.data;
    const action = request.body.action;
    console.log("userId: "+userId);
    console.log(request.query);
    console.log(request.body);
    console.log("Action: "+action);

    switch(action)
    {
        case "CREATE_USER":
        return admin.database().ref('/users/'+userId).set(data, (error)  => {
            //console.log(snapshot);
            if(error)
            {
                console.log("Error occurred while saving user: "+error);
                return response.json("Error occurred while saving user: "+error);
            }
            else
            {
                console.log("User saved successfully");
                return response.json("User saved successfully");
            }
        });
        case "UPDATE_USER":
        return admin.database().ref('/users/'+userId).update(data, (error)  => {
            //console.log(snapshot);
            if(error)
            {
                console.log("Error occurred while updating user: "+error);
                return response.json("Error occurred while updating user: "+error);
            }
            else
            {
                console.log("User updated successfully");
                return response.json("User updated successfully");
            }
        });
    }
    
});

// Get user Info
// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
exports.getUser = functions.https.onRequest((request,response) => {
    cors(request, response, () => {});
    const userId = request.query.userId;
    console.log("userId: "+userId);

    return admin.database().ref('/users/'+userId).once('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        response.json(data);
     });
});