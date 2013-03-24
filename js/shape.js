function Shape(type){
	this.points = [];
	this.moving = true;

	switch(type){
		case 'O':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,0));
			this.points.push(new Point(1,1));
			break;
		case 'L':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(0,2));
			this.points.push(new Point(1,2));
			break;
		case 'J':
			this.points.push(new Point(1,0));
			this.points.push(new Point(1,1));
			this.points.push(new Point(1,2));
			this.points.push(new Point(0,2));
			break;
		case 'S':
			this.points.push(new Point(1,0));
			this.points.push(new Point(2,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			break;
		case 'Z':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			this.points.push(new Point(1,2));
			break;
		case 'I':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(0,2));
			this.points.push(new Point(0,3));
			break;
		case 'T':
			this.points.push(new Point(0,0));
			this.points.push(new Point(1,0));
			this.points.push(new Point(2,0));
			this.points.push(new Point(1,1));
			break;
	}

	this.draw  = function() {
		for(j = 0; j<this.points.length; j++) {
			this.points[j].draw();
		}
	};

	return this;
}