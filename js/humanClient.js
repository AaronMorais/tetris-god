function HumanClient() {
	var socket = io.connect(window.location.hostname);
    socket.on('connect', function () {
        socket.send('A client connected.');
    });
    socket.on('nextType', function (msg) {
    	console.log(msg);
		nextType = msg;
        invalid = true;
		$('#type').text("GOD SAYS: Next Piece is: " + nextType);
    });
    socket.on('newSpeed', function (msg) {
        console.log(msg);
        console.log(gravitySpeed);
        if(msg === "increase") {
            gravitySpeed -=50;
            if(gravitySpeed < 10) {
                gravitySpeed = 10;
            }
        } else if(msg === "decrease") {
            gravitySpeed +=50;
        }
        setGravity();
    });
    socket.on('colourScheme', function (msg) {
    	console.log(msg);
		colourScheme = msg;
    });
    socket.on('disconnect', function () {
		console.log('disconnected');
    });
}