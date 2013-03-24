var ctx;
var invalid = false;
var shapes = [];
var shapeTypes = ['O','L','J','S','Z','I','T'];
var grid = [];

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	createShape();
	createGrid();
	setInterval(draw, 100);
	setInterval(gravity, 50);
	checkUserInput();
}

function createGrid() {
	grid = new Array(10);
	for(i = 0; i < 10; i++) {
		grid[i] = new Array(20);
	}
	for(i = 0; i < 10; i++) {
		for(j = 0; j < 20; j++) {
			grid[i][j] = false;
		}
	}
}

function createShape() {
	var type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
	var shape = new Shape(type);

	var color = get_random_color();
	for(j = 0; j<shape.points.length; j++) {
		shape.points[j].fill = color;
	}

	shapes.push(shape);
}

function isGameOver() {
	for(i=0; i<grid.length; i++) {
		if(grid[i][0] || grid[i][1]) {
			return true;
		}
	}
	return false;
}

function gameOver() {
	console.log("game over");
}

function checkMoving() {
	for(i = 0; i<shapes.length; i++) {
		if(shapes[i].moving === false) {
			continue;
		}
		for(j = 0; j<shapes[i].points.length; j++) {
			x = shapes[i].points[j].x;
			y = shapes[i].points[j].y;
			if(shapes[i].points[j].y >=19 || grid[x][y+1]) {
				shapes[i].moving = false;
				for(k = 0; k<shapes[i].points.length; k++) {
					x = shapes[i].points[k].x;
					y = shapes[i].points[k].y;
					grid[x][y] = true;
				}
				if(isGameOver()) {
					gameOver();
				} else {
					createShape();
				}
				break;
			}
		}
	}
}

function gravity() {
	checkMoving();
	for(i = 0; i<shapes.length; i++) {
		if(shapes[i].moving) {
			for(j = 0; j<shapes[i].points.length; j++) {
				shapes[i].points[j].gravity();
			}
			invalid = true;
		}
	}
}

function draw() {
	if(invalid) {
		ctx.clearRect(0,0, 400, 800);
		for(i = 0; i<shapes.length; i++) {
			shapes[i].draw();
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
		var movingShape = shapes[shapes.length - 1];
		var key = e.keyCode;
		switch(key){
			case(37)://left
				for(j = 0; j<movingShape.points.length; j++) {
					movingShape.points[j].x -= 1;
				}
				
				break;
			case(38)://up
				break;
			case(39)://right
				for(j = 0; j<movingShape.points.length; j++) {
					movingShape.points[j].x += 1;
				}
				break;
			case(40)://down
				break;
		}
	});
}

