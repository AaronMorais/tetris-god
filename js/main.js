var ctx;
var invalid = false;
var shape;
var shapeTypes = ['O','L','J','S','Z','I','T'];
var gridPoints = [];
var nextType;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	setNext();
	createShape();
	createGrid();
	setInterval(draw, 100);
	setInterval(gravity, 1000);
	checkUserInput();
}

function createGrid() {
	gridPoints = new Array(10);
	var i;
	for(i = 0; i < 10; i++) {
		gridPoints[i] = new Array(20);
	}
	for(i = 0; i < 10; i++) {
		for(var j = 0; j < 20; j++) {
			gridPoints[i][j] = null;
		}
	}
}

function createShape() {
	shape = new Shape(nextType);
	var color = get_random_color();
	for(j = 0; j<shape.points.length; j++) {
		shape.points[j].fill = color;
	}
	setNext();
}

function setNext() {
	var type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
	nextType = type;
	$('#type').text("Next Piece is: " + nextType);
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
	for(var j = 0; j<shape.points.length; j++) {
		x = shape.points[j].x;
		y = shape.points[j].y + 1;

		if(shape.points[j].y >=19 || gridPoints[x][y]) {
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
		for(var j = 0; j<shape.points.length; j++) {
			shape.points[j].gravity();
		}
		shape.pivot.gravity();
	}
	invalid = true;
}

function draw() {
	if(invalid) {
		ctx.clearRect(0,0, 400, 800);
		shape.draw();
		for(var i = 0; i < 10; i++) {
			for(var j = 0; j < 20; j++) {
				if(gridPoints[i][j]) {
					gridPoints[i][j].draw();
				}
			}
		}
		invalid = false;
	}
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function checkUserInput(){
	$(window).keydown(function(e) {
		var tetramino = shape;
		var key = e.keyCode;
		switch(key){
			case(37)://left
				move("left", tetramino);
				break;
			case(38)://up
				rotate('cw', tetramino);
				break;
			case(39)://right
				move("right", tetramino);
				break;
			case(40)://down
				gravity();
				gravity();
				break;
			case(18): //option
				rotate('ccw', tetramino);
				break;
			case(32)://spacebar
				break;
		}
	});
}


function move(direction, tetramino){

	var bounds = (direction === "left") ? 0 : 9;
	var xTranslation = (direction === "left") ? -1 : 1;
	
	var Translate = function(point){
		return {
			x: point.x + xTranslation,
			y: point.y
		};
	};

	if(!checkCollision(Translate, tetramino)){
		for(j = 0; j<tetramino.points.length; j++) {
			tetramino.points[j].x += xTranslation;
		}
		tetramino.pivot.x += xTranslation;
		invalid = true;
		draw();
	}

}

function checkCollision(Translation, tetramino){
	var x;
	var y;
	for(j = 0; j<tetramino.points.length; j++) {
		x = tetramino.points[j].x;
		y = tetramino.points[j].y;
		newX = Translation(tetramino.points[j]).x;
		newY = Translation(tetramino.points[j]).y;
		if(newX < 0 || newX > 9 || gridPoints[newX][newY]){
			return true;
		}
	}
	return false;

}

function rotate(direction,tetramino){

	var change = (direction === "ccw" ? 1 : -1);
	var Translate = function(point){
		return{
			x: (point.y - tetramino.pivot.y) * change + tetramino.pivot.x,
			y: (point.x - tetramino.pivot.x) * -change + tetramino.pivot.y
		};
	};

	if(!checkCollision(Translate, tetramino)){
		for(j = 0; j<tetramino.points.length; j++) {
			x = tetramino.points[j].x - tetramino.pivot.x;
			y = tetramino.points[j].y - tetramino.pivot.y;
			newX = Translate(tetramino.points[j]).x;
			newY = Translate(tetramino.points[j]).y;
			if(newX >=0 && newX < 10 && !gridPoints[newX][newY]){
				tetramino.points[j].x = newX;
				tetramino.points[j].y = newY;

			}
		}
		invalid = true;
		draw();
	}
}

