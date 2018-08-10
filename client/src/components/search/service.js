import firebase from 'firebase';
import viewHtml from './view';
let globallist = [
    {
        channels: [],
    },
    {
        users: [],
    },
    {
        messages: []
    },
    {
        all: []
    }
];

export function getAllChannels(teamId) {
    const db = firebase.database().ref('teams/' + teamId + '/channels');
    // const db = firebase.database().ref('teams/Team-Pragathi/channels');
    db.on('value', (channelList) => {
        channelList.forEach((channelIndex) => {
            let flag = true;
            for (let i = 0; i < globallist[0].channels.length; i++) {
                if (globallist[0].channels[i].label === channelIndex.child('channelName').val())
                    flag = false;
            }
            if (flag === true) {
                let data = {
                    category: "channel",
                    label: channelIndex.child('channelName').val()
                }
                globallist[0].channels.push(data);
                globallist[3].all.push(data);
            }
        });
    });
}

export function getAllUsers(teamId) {
    // const db = firebase.database().ref('/users');
    const db = firebase.database().ref('/teams/' + teamId + '/directMessages/users');
    db.on('value', (userList) => {
        userList.forEach((user) => {
            let flag = true;
            for (let i = 0; i < globallist[1].users.length; i++) {
                if (globallist[1].users[i].label == user.key)
                    flag = false;
            }
            if (flag == true) {
                let data = {
                    category: "people",
                    label: user.key
                }
                globallist[1].users.push(data);
                globallist[3].all.push(data);
            }
        });
    });
}

function getDirectMessages(teamId) {
    const users = firebase.database().ref('teams/' + teamId + '/directMessages/users');
    users.on('value', (snapshot) => {
        console.log("snapshot" + snapshot.val());
        const getAllUserIds = Object.values(snapshot.val());
        const abc = getAllUserIds.map((msgVal) => {
            Object.entries(msgVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let message=msgData.messageText;
                    let by=msgData.sentByUserName;
                    let to=msgData.sentToUserName;
                    let flag = true;
                    for (let i = 0; i < globallist[2].messages.length; i++) {
                        if (globallist[2].messages[i].label ===message &&
                            globallist[2].messages[i].sentby===by &&
                            globallist[2].messages[i].sentTo===to
                        )
                            flag = false;
                    }
                    if (flag == true) {
                        let data = {
                            category: "message",
                            label: message,
                            sentby: by,
                            sentTo: to
                        }
                        globallist[2].messages.push(data);
                        globallist[3].all.push(data);
                    }
                });
            });
        });
    });
}

/*
function getChannelMessages(teamId) {
    const channelMsg = firebase.database().ref(teamId+'/channelMsg/');
    channelMsg.on('value', (snapshot) => {
        const getAllChannelValue = Object.values(snapshot.val());
        const abc = getAllChannelValue.map((chnVal) => {
            Object.entries(chnVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let message=msgData.messageText;
                    // let rcvDate=msgData.date;
                    // let by=msgData.sentBy;
                    // let msgId=msgData.messageId;
                    let data={
                        category : "message",
                        label: message,
                        // date: rcvDate,
                        // sentby: by,
                        // id: msgId 
                    }
                    globallist[2].messages.push(data);
                    globallist[3].all.push(data);
                });
            });
        });
    });
}
*/

export function getAllMessages(teamId) {
    // alert(teamId);
    getDirectMessages(teamId);
    // getChannelMessages(teamId);
}

export function searchAllChannels() {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $("#tags").autocomplete({
            minLength: 0,
            source: globallist[0].channels,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", value: "No results found" };
                    ui.content.push(noResult);
                }
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $(`<li class="list-group-item">${item.value}</li>`)
                    .appendTo(ul);
            };
    });
}

export function searchAllUsers() {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $("#tags").autocomplete({
            minLength: 0,
            source: globallist[1].users,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", value: "No results found" };
                    ui.content.push(noResult);
                }
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $(`<li class="list-group-item">${item.value}</li>`)
                    .appendTo(ul);
            };
    });
}

export function searchAll() {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";
    $(function () {
        $.widget("custom.catcomplete", $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
            },
            _renderItem: function( ul, item ) {
                if(item.category ==="message"){
                   return $("<li>")
                  .attr( "data-value", item.value )
                  .append( item.label )
                  .append(item.sentby)
                  .append(item.sentTo)
                  .appendTo( ul );
                }
                return $( "<li>" )
                  .attr( "data-value", item.value )
                  .append( item.label )
                  .appendTo( ul );
              },
            _renderMenu: function (ul, items) {
                var that = this,
                    currentCategory = "";
                $.each(items, function (index, item) {
                    var li;
                    if (item.category != currentCategory) {
                        ul.append("<li class='ui-autocomplete-category'><strong>" + item.category + "</strong></li>");
                        currentCategory = item.category;
                    }
                    li = that._renderItemData(ul, item);
                    if (item.category) {
                        li.attr("aria-label", item.category + " : " + item.label);
                    }
                });
            }
        });
        $("#tags").catcomplete({
            minLength: 0,
            source: globallist[3].all,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", value: "No results found" };
                    ui.content.push(noResult);
                }
            }
        });
    });
}

export default globallist;