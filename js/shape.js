function Shape(type, colourScheme){
	this.points = [];
	this.initialOffset = 3;
	var self = this;
	this.colourScheme = {
		'standard': {
			'O': '#FFF000',
			'L': '#FF9900',
			'J': '#0000FF',
			'S': '#00FF00',
			'Z': '#FF0000',
			'I': '#66FFFF',
			'T': '#990099'
		},

		'dull' : {
			'O': '#202020',
			'L': '#404040',
			'J': '#606060',
			'S': '#808080',
			'Z': '#A0A0A0',
			'I': '#000000',
			'T': '#C0C0C0'
		},

		'black' : {
			'O': '#000000',
			'L': '#000000',
			'J': '#000000',
			'S': '#000000',
			'Z': '#000000',
			'I': '#000000',
			'T': '#000000'
		},

		'random' : {
			'O': get_random_colour(),
			'L': get_random_colour(),
			'J': get_random_colour(),
			'S': get_random_colour(),
			'Z': get_random_colour(),
			'I': get_random_colour(),
			'T': get_random_colour()
		}

	};

	function get_random_colour() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}

	this.colour = this.colourScheme[colourScheme][type];
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