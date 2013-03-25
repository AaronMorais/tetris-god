function Shape(type, colourScheme){
	this.points = [];
	this.initialOffset = 3;
	var self = this;
	this.colourScheme = {
		'Standard': {
			'O': '#FFF000',
			'L': '#FF9900',
			'J': '#0000FF',
			'S': '#00FF00',
			'Z': '#FF0000',
			'I': '#66FFFF',
			'T': '#990099'
		},

		'Dull' : {
			'O': '#202020',
			'L': '#404040',
			'J': '#606060',
			'S': '#808080',
			'Z': '#A0A0A0',
			'I': '#000000',
			'T': '#C0C0C0'
		},

		'Black' : {
			'O': '#000000',
			'L': '#000000',
			'J': '#000000',
			'S': '#000000',
			'Z': '#000000',
			'I': '#000000',
			'T': '#000000'
		},

		'Random' : {
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


	var blockPoints = {
		'O': [new Point(0,0), new Point(0,1), new Point(1,0), new Point(1,1)],
		'L': [new Point(0,1), new Point(1,1), new Point(2,0), new Point(2,1)],
		'J': [new Point(0,0), new Point(0,1), new Point(1,1), new Point(2,1)],
		'S': [new Point(1,0), new Point(2,0), new Point(0,1), new Point(1,1)],
		'Z': [new Point(0,0), new Point(1,0), new Point(1,1), new Point(2,1)],
		'I': [new Point(0,1), new Point(1,1), new Point(2,1), new Point(3,1)],
		'T': [new Point(1,1), new Point(0,1), new Point(2,1), new Point(1,0)]
	};

	this.points = blockPoints[type];
	
	switch(type){
		case 'O':
			this.pivot = new Point(0.5, 0.5);
			this.initialOffset = 4;
			break;
		case 'I':
			this.pivot = new Point(1.5,1.5);
			break;
		default :
			this.pivot = new Point(1,1);

	}

	this.draw  = function() {
		for(j = 0; j<this.points.length; j++) {
			this.points[j].draw();
		}
	};

	return this;
}