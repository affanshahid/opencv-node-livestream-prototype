var express = require('express');
var socketio = require('socket.io');
var http = require('http');

var app = express();
var rawServer = http.createServer(app);
var io = socketio(rawServer);

var PORT = process.env.PORT || 8080;

app.use(express.static('./public'));

rawServer.listen(PORT, function() {
    console.log('Server running on port: ' + PORT + '!');
});

io.on('connection', require('./socket.js'));