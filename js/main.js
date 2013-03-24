var ctx;
var invalid = false;
var shapes = [];

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	createShape();
	setInterval(draw, 100);
	setInterval(gravity, 200);
}

function createShape() {
	var shape = new Shape('L');


	var color = get_random_color();
	for(j = 0; j<shape.points.length; j++) {
		shape.points[j].fill = color;
	}

	shapes.push(shape);
}

function checkMoving() {
	for(i = 0; i<shapes.length; i++) {
		if(shapes[i].moving === false) {
			break;
		}
		for(j = 0; j<shapes[i].points.length; j++) {
			if(shapes[i].points[j].y >=19) {
				shapes[i].moving = false;
				createShape();
			}
		}
	}
}

function gravity() {
	checkMoving();
	for(i = 0; i<shapes.length; i++) {
		if(shapes[i].moving) {
			for(j = 0; j<shapes[i].points.length; j++) {
				shapes[i].points[j].y +=1;
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



function Point(x,y) {
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;
	this.fill = '#000FF';
}

Point.prototype.draw = function() {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x*40, this.y*40, this.w, this.h);
};

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
