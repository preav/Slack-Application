const express = require("express");
const os = require("os");
const app = express();
//const socketioJwt = require("socketio-jwt");
app.use(express.static("public/dist"));

const _ = require('lodash');

app.get("/api/getUsername", (req, res) =>
  res.send({
    usernameww: os.userInfo().username
  })
);
const server = app.listen(process.env.PORT|| 8080);
//const io = require('socket.io').listen(server);
