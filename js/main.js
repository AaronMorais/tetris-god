var ctx;
var invalid = false;
var shape;
var shapeTypes = ['O','L','J','S','Z','I','T'];
var gridPoints = [];

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	createShape();
	createGrid();
	setInterval(draw, 100);
	setInterval(gravity, 100);
	checkUserInput();
}

function createGrid() {
	gridPoints = new Array(10);
	for(var i = 0; i < 10; i++) {
		gridPoints[i] = new Array(20);
	}
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 20; j++) {
			gridPoints[i][j] = null;
		}
	}
}

function createShape() {
	var type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
	shape = new Shape(type);

	var color = get_random_color();
	for(j = 0; j<shape.points.length; j++) {
		shape.points[j].fill = color;
	}
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
			shape.moving = false;

			for(var k = 0; k<shape.points.length; k++) {
				x = shape.points[k].x;
				y = shape.points[k].y;
				gridPoints[x][y] = shape.points[k];
			}

			if(isGameOver()) {
				gameOver();
			} else {
				createShape();
			}
			return false;
		}
	}
	return true;
}

function gravity() {
	if(shape.moving) {
		if(!checkMoving()) { return; }
		for(var j = 0; j<shape.points.length; j++) {
			shape.points[j].gravity();
		}
		invalid = true;
	}
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
				break;
			case(39)://right
				move("right", tetramino);
				break;
			case(40)://down
				break;
		}
	});
}


function move(direction, tetramino){

	var bounds = (direction === "left") ? 0 : 9;
	var xTranslation = (direction === "left") ? -1 : 1;
	if(checkCollision(bounds, xTranslation, tetramino) === false){
		for(j = 0; j<tetramino.points.length; j++) {
			tetramino.points[j].x += xTranslation;
		}
	}
	invalid = true;
	draw();

}

function checkCollision(bounds, xTranslation, tetramino){
	var x;
	var y;
	for(j = 0; j<tetramino.points.length; j++) {
		x = tetramino.points[j].x;
		y = tetramino.points[j].y;
		if(x === bounds || grid[x + xTranslation][y]){
			return true;
		}
	}
	return false;
}