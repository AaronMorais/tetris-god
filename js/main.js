var ctx;
var shapes = [];

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	createShape();
	setInterval(draw, 1000);
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

function gravity() {
	for(i = 0; i<shapes.length; i++) {
		for(j = 0; j<shapes[i].points.length; j++) {
			shapes[i].points[j].y +=1;
		}
	}
}

function draw() {
	ctx.clearRect(0,0, 400, 800);
	gravity();
	for(i = 0; i<shapes.length; i++) {
		shapes[i].draw();
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
	ctx.fillRect(this.x*10, this.y*10, this.w, this.h);
}