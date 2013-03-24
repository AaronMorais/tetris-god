var ctx;
var invalid = false;
var shapes = [];

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	createShape();
	setInterval(draw, 100);
	setInterval(gravity, 1000);
}

function createShape() {
	var shape = new Shape;

	var point = new Point;
	point.x = 0;
	point.y = 0;
	shape.points.push(point);

	point = new Point;
	point.x = 1;
	point.y = 1;
	shape.points.push(point);

	point = new Point;
	point.x = 0;
	point.y = 1;
	shape.points.push(point);

	point = new Point;
	point.x = 1;
	point.y = 0;
	shape.points.push(point);

	shapes.push(shape);
}

function checkMoving() {
	for(i = 0; i<shapes.length; i++) {
		if(shapes[i].moving = false) {
			break;
		}
		for(j = 0; j<shapes[i].points.length; j++) {
			if(shapes[i].points[j].y >=19) {
				shapes[i].moving = false;
			}
		}
	}
}

function gravity() {
	checkMoving();
	for(i = 0; i<shapes.length; i++) {
		shapes[i].moving = true;
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

function Shape() {
	this.points = [];
	this.moving = true;
}

Shape.prototype.draw = function() {
	for(j = 0; j<this.points.length; j++) {
		this.points[j].draw();
	}
}

function Point() {
	this.x = 0;
	this.y = 0;
	this.w = 40;
	this.h = 40;
	this.fill = '#000FF';
}

Point.prototype.draw = function() {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x*40, this.y*40, this.w, this.h);
}