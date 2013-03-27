var ctx, ctxNext;
var invalid = false;
var shape;
var shapeTypes = ['O','L','J','S','Z','I','T'];
var gridPoints = [];
var nextType;
var colourScheme = "Standard";
var blocksize = 30;
var gravitySpeed = 1000;
var gravityTimer;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvasNext = document.getElementById('next-preview');
	ctxNext = canvasNext.getContext('2d');
	setNext();
	createGrid();
	createShape();
	setInterval(draw, 100);
	setGravity();
	checkUserInput();
}

function createGrid() {
	gridPoints = new Array(10);
	var i;
	for(i = 0; i < 10; i++) {
		gridPoints[i] = new Array(22);
	}
	for(i = 0; i < 10; i++) {
		for(var j = 0; j < 22; j++) {
			gridPoints[i][j] = null;
		}
	}
}

function createShape() {
	shape = new Shape(nextType, colourScheme);
	for(j = 0; j<shape.points.length; j++) {
		shape.points[j].fill = shape.colour;
	}
	shape.move("right", shape.initialOffset);
	setNext();
}

function setGravity() {
	gravity();
	clearInterval(gravityTimer);
	gravityTimer = setInterval(gravity, gravitySpeed);
}

function setNext() {
	var type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
	nextType = type;
	$('#type').text("Next Piece is: " + nextType);
	drawNextShape();
}

function drawNextShape() {
	var nextShape = new Shape(nextType, colourScheme);
	nextShape.preview();
}

function isGameOver() {
	for(var i=0; i<gridPoints.length; i++) {
		if(gridPoints[i][0] || gridPoints[i][1]) {
			return true;
		}
	}
	return false;
}

function gameOver() {
	console.log("game over");
	setTimeout(function() {	location.reload();},1000);
}

function checkMoving() {
	if(!shape) {return;}
	for(var j = 0; j<shape.points.length; j++) {
		x = shape.points[j].x;
		y = shape.points[j].y + 1;

		if(shape.points[j].y >=21 || gridPoints[x][y]) {
			for(var k = 0; k<shape.points.length; k++) {
				x = shape.points[k].x;
				y = shape.points[k].y;
				gridPoints[x][y] = shape.points[k];
			}
			shape = null;
			
			if(isGameOver()) {
				gameOver();
			} else {
				checkRow();
				createShape();
			}
			return false;
		}
	}
	return true;
}

function checkRow() {
	for(var i=0; i<gridPoints[0].length; i++) {
		//check if row is complete and should be removed
		var complete = true;
		var completeY;
		for(var j=0; j<gridPoints.length; j++) {
			if(!gridPoints[j][i]) {
				complete = false;
				completeY = i;
			}
		}

		if(complete) {
			//remove row points by making them null
			for(var k=0; k<gridPoints.length; k++) {
				gridPoints[k][i] = null;
			}
			//shift down all rows above deleted row
			for(var l=0; l<gridPoints.length; l++) {
				for(var m=completeY; m>=0; m--) {
					var point = gridPoints[l][m];
					if(point) {
						point.y +=1;
						gridPoints[l][m+1] = point;
						gridPoints[l][m] = null;
					}
				}
			}
			invalid = true;
			draw();
			i--;
		}
	}
}

function gravity() {
	if(shape) {
		if(!checkMoving()) { return; }
		shape.gravity();
	}
	invalid = true;
	return shape ? true : false;
}

function recursiveGravity() {
	if(gravity()){
		recursiveGravity();
	}
}

function draw() {
	if(invalid) {
	  	drawNextShape();

		width = window.innerWidth;
	  	height = window.innerHeight - 100;
		width = height/2;

	 	ctx.canvas.width  = width;
	  	ctx.canvas.height = height;

	  	blocksize = ctx.canvas.width/10;

		ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

		if(shape) {
			shape.draw();
		}
		for(var i = 0; i < 10; i++) {
			for(var j = 0; j < 22; j++) {
				if(gridPoints[i][j]) {
					gridPoints[i][j].draw();
				}
			}
		}
		invalid = false;
	}
}

var gravityAcceleration = 2;
function checkUserInput(){
	$(window).keydown(function(e) {
		if(!shape) { return;}
		var key = e.keyCode;
		switch(key){
			case(37)://left
				shape.move("left");
				break;
			case(38)://up
				shape.rotate('cw');
				break;
			case(39)://right
				shape.move("right");
				break;
			case(40)://down
				for(var i=0; i<gravityAcceleration; i++) {
					gravity();
				}
				gravityAcceleration *=10;
				break;
			case(18): //option
				shape.rotate('ccw');
				break;
			case(17): //control
				shape.rotate('ccw');
				break;
			case(32)://spacebar
				recursiveGravity();
				break;
		}
		draw();
	});
		$(window).keydown(function(e) {
			if(!shape) { return;}
			var key = e.keyCode;
			switch(key){
				case(40)://down
					gravityAcceleration = 2;
				break;
			}
	});
}

