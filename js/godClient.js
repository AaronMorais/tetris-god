function GodClient() {
		socket = io.connect(window.location.hostname);
	    socket.on('connect', function () {
	    });
	    socket.on('disconnect', function () {
    		console.log('disconnected');
        });
        socket.on('humanGridPoints', function (msg) {
			createGrid();
			for(var i = 0; i<10; i++) {
				for (var j = 0; j<22; j++) {
					var pointJSON = JSON.parse(msg)[i][j];
					if (pointJSON != null) {
						var point = new Point();
						point.x = pointJSON.x;
						point.y = pointJSON.y;
						point.fill = pointJSON.fill;
						gridPoints[i][j] = point;
					}
				}
			}	
			shape = null;
       		invalid = true;
        	draw();
        });
		socket.on('humanNext', function (msg) {
			setNext(msg);
		});
        socket.on('humanHold', function (msg) {
        	var inHoldJSON = JSON.parse(msg);
        	inHold = new Shape(inHoldJSON.type);;
        	drawHold();
        });
        socket.on('humanGameOver', function() {
        	alert("The human lost!");
			createGrid();
			shape = null;
       		invalid = true;
        	draw();

        });
        $("#O").click(function() {
	        socket.emit("setNextType", "O");
	        setNext("O");
	    });
	    $("#L").click(function() {
	        socket.emit("setNextType", "L");
	        setNext("L");
	    });
	    $("#J").click(function() {
	        socket.emit("setNextType", "J");
	        setNext("J");
	    });
	    $("#S").click(function() {
	        socket.emit("setNextType", "S");
	        setNext("S");
	    });
	    $("#Z").click(function() {
	        socket.emit("setNextType", "Z");
	        setNext("Z");
	    });
	    $("#I").click(function() {
	        socket.emit("setNextType", "I");
	        setNext("I");
	    });
	    $("#T").click(function() {
	        socket.emit("setNextType", "T");
	        setNext("T");
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