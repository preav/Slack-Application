// <<<<<<<<<< FOR DESKTOP NOTIFICATIONS >>>>>>>>>>>>>

let notificationList = []
export const getnotificationList = () => {
        return notificationList
    }
    // checks window state
var vis = (function() {
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var visible = vis(); // gives current state

// registers a handler for visibility changes
// enable web browser notifications as well when browser is active and
// if not, keep both, desk and web notification avtive, write that
// login instead of console statement
vis(function() {
    vis() ? console.log('visible') : DesktopNotification();
});

//0. give permission to browser to send notifications
function DesktopNotification() {
    console.log("permission")
    var currentWindow = window;
    if (Notification && Notification.permission === 'default') {
        Notification.requestPermission(function(permission) {
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
        })
    }
    desktopNotification(currentWindow);
}

//1.check permission 
//we can request permission here again if its value is 'default' //using the previously discussed code
function desktopNotification(currentWindow) {
    console.log('desk not called')
    if (Notification.permission === "granted") {
        console.log("granted")
        var msgInfo = { "messageText": "", "sentBy": "" };
        // sendDesktopNotification(msgInfo, currentWindow);
    } else {
        console.log("not granted")
    }
}

//2. send Notification
export function sendDesktopNotification(msgInfo, currentWindow) {
    let notification = new Notification('Message from ' + msgInfo.sentBy, {
        //icon: "user profile icon, fetch from DB",
        body: msgInfo.messageText,
        tag: "multiple notifications"
    });

    //Demo
    notificationList.push(msgInfo)
        //’tag’ handles muti tab scenario i.e when multiple tabs are
        // open then only one notification is sent

    //3. handle notification events and set timeout
    notification.onclick = function() {
        currentWindow.focus();
    };
    setTimeout(notification.close.bind(notification), 5000);
}