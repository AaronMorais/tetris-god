function Shape(type, colourScheme){
	this.points = [];
	this.initialOffset = 3;
	this.colourScheme = {
		'standard': {
			'O': '#FFF000',
			'L': '#FF9900',
			'J': '#0000FF',
			'S': '#00FF00',
			'Z': '#FF0000',
			'I': '#66FFFF',
			'T': '#990099'
		}
	};

	this.colour = this.colourScheme[colourScheme ? colourScheme : 'standard'][type];
	switch(type){
		case 'O':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,0));
			this.points.push(new Point(1,1));
			this.pivot = new Point(0.5, 0.5);
			this.initialOffset = 4;
			break;
		case 'L':
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			this.points.push(new Point(2,0));
			this.points.push(new Point(2,1));
			this.pivot = new Point(1,1);
			break;
		case 'J':
			this.points.push(new Point(0,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			this.points.push(new Point(2,1));
			this.pivot = new Point(1,1);
			break;
		case 'S':
			this.points.push(new Point(1,0));
			this.points.push(new Point(2,0));
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			this.pivot = new Point(1,1);
			break;
		case 'Z':
			this.points.push(new Point(0,0));
			this.points.push(new Point(1,0));
			this.points.push(new Point(1,1));
			this.points.push(new Point(2,1));
			this.pivot = new Point(1,1);
			break;
		case 'I':
			this.points.push(new Point(0,1));
			this.points.push(new Point(1,1));
			this.points.push(new Point(2,1));
			this.points.push(new Point(3,1));
			this.pivot = new Point(1.5,1.5);
			break;
		case 'T':
			this.points.push(new Point(1,1));
			this.points.push(new Point(0,1));
			this.points.push(new Point(2,1));
			this.points.push(new Point(1,0));
			this.pivot = new Point(1,0);
			break;
	}

	this.draw  = function() {
		for(j = 0; j<this.points.length; j++) {
			this.points[j].draw();
		}
	};

	return this;
}