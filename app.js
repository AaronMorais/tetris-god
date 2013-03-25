var connect = require('connect');
var io = require('socket.io')


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
});
