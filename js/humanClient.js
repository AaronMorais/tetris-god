function HumanClient() {
	this.socket = io.connect(window.location.hostname);
    this.socket.on('nextType', function (msg) {
    	console.log(msg);
		nextType = msg;
        invalid = true;
		$('#type').text("GOD SAYS: Next Piece is: " + nextType);
    });
    this.socket.on('newSpeed', function (msg) {
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
    this.socket.on('colourScheme', function (msg) {
    	console.log(msg);
		colourScheme = msg;
    });
    this.socket.on('disconnect', function () {
		console.log('disconnected');
    });
}