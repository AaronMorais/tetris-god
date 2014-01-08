var connect = require('connect');
var io = require('socket.io');


var port = process.env.PORT || 8080;
var server = connect.createServer(
	connect.static(__dirname)
).listen(port)
socket = io.listen(server);

socket.on('connection', function (socket) {
    socket.on('setNextType', function (data) {
		console.log(data);
        socket.broadcast.emit("nextType",data);
    });
    socket.on('setNewSpeed', function (data) {
		console.log(data);
        socket.broadcast.emit("newSpeed",data);
    });
    socket.on('setColour', function (data) {
		console.log(data);
        socket.broadcast.emit("colourScheme",data);
    });
    socket.on('humanGridPoints', function (data) {
        socket.broadcast.emit("humanGridPoints",data);
    });
    socket.on('humanHold', function (data) {
        socket.broadcast.emit("humanHold",data);
    });
    socket.on('humanNext', function (data) {
        socket.broadcast.emit("humanNext",data);
    });
    socket.on('humanGameOver', function (data) {
        socket.broadcast.emit("humanGameOver",data);
    });
});
