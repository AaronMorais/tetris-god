var connect = require('connect');
var io = require('socket.io')

var server = connect.createServer(
	connect.static(__dirname)
).listen(8080)
socket = io.listen(server);

socket.on('connection', function (socket) {
    socket.on('setNextType', function (data) {
    	console.log(data);
        socket.broadcast.emit("nextType",data);
    });
});
