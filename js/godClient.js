function GodClient() {
		socket = io.connect(window.location.hostname);
	    socket.on('connect', function () {
	        socket.send('A client connected.');
	    });
	    socket.on('disconnect', function () {
    		console.log('disconnected');
        });
        $("#O").click(function() {
	        socket.emit("setNextType", "O");
	    });
	    $("#L").click(function() {
	        socket.emit("setNextType", "L");
	    });
	    $("#J").click(function() {
	        socket.emit("setNextType", "J");
	    });
	    $("#S").click(function() {
	        socket.emit("setNextType", "S");
	    });
	    $("#Z").click(function() {
	        socket.emit("setNextType", "Z");
	    });
	    $("#I").click(function() {
	        socket.emit("setNextType", "I");
	    });
	    $("#T").click(function() {
	        socket.emit("setNextType", "T");
	    });
	    $("#Random").click(function() {
	        socket.emit("setColour", "Random");
	    });
	    $("#Standard").click(function() {
	        socket.emit("setColour", "Standard");
	    });
	    $("#Black").click(function() {
	        socket.emit("setColour", "Black");
	    });
	    $("#Dull").click(function() {
	        socket.emit("setColour", "Dull");
	    });
	    $("#Increase").click(function() {
	        socket.emit("setNewSpeed", "increase");
	    });
	    $("#Decrease").click(function() {
	        socket.emit("setNewSpeed", "decrease");
	    });
}