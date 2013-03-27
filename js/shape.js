function Shape(type, colourScheme){

	this.type = type;
	this.points = [];
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

	this.colour = this.colourScheme[colourScheme][this.type];


	var blockPoints = {
		'O': [new Point(0,0), new Point(0,1), new Point(1,0), new Point(1,1)],
		'L': [new Point(0,1), new Point(1,1), new Point(2,0), new Point(2,1)],
		'J': [new Point(0,0), new Point(0,1), new Point(1,1), new Point(2,1)],
		'S': [new Point(1,0), new Point(2,0), new Point(0,1), new Point(1,1)],
		'Z': [new Point(0,0), new Point(1,0), new Point(1,1), new Point(2,1)],
		'I': [new Point(0,1), new Point(1,1), new Point(2,1), new Point(3,1)],
		'T': [new Point(1,1), new Point(0,1), new Point(2,1), new Point(1,0)]
	};

	this.points = blockPoints[this.type];

	switch(type){
		case 'O':
			this.pivot = new Point(0.5, 0.5);
			this.initialOffset = 4;
			break;
		case 'I':
			this.pivot = new Point(1.5,1.5);
			this.initialOffset = 3;
			break;
		default :
			this.pivot = new Point(1,1);
			this.initialOffset = 3;

	}

	this.resetPoints = function(){
		this.points = blockPoints[this.type];
	};

	this.draw  = function() {
		for(j = 0; j<this.points.length; j++) {
			this.points[j].draw();
		}
		this.ghost.update();
	};

	this.previewAs = function(view){
		view.clearRect(0, 0, canvas.width, canvas.height);
		view.beginPath();
		for(j = 0; j<this.points.length; j++) {
			this.points[j].fill = this.colour;
			this.points[j].x += (this.initialOffset - 3);
			this.points[j].y += 3;
			this.points[j].draw(view);
		}
	};

	this.gravity = function(){
		for(var j = 0; j<this.points.length; j++) {
			this.points[j].gravity();
			this.ghost.points[j].gravity();
		}
		this.pivot.gravity();

		this.ghost.update();
	};

	this.move = function(direction, units){

		var xTranslation = (direction === "left") ? -1 : 1;
		
		if(units){
			xTranslation *= units;
		}

		var Translate = function(point){
			return {
				x: point.x + xTranslation,
				y: point.y
			};
		};

		if(!checkCollision(Translate, this.points)){
			for(j = 0; j<this.points.length; j++) {
				this.points[j].x += xTranslation;
				this.ghost.points[j].x += xTranslation;
			}
			this.pivot.x += xTranslation;

			this.ghost.update();

			invalid = true;
		}

	};


	this.rotate = function(direction){

		var change = (direction === "ccw" ? 1 : -1);
		var self = this;
		var Translate = function(point){
			return{
				x: (point.y - self.pivot.y) * change + self.pivot.x,
				y: (point.x - self.pivot.x) * -change + self.pivot.y
			};
		};

		if(!checkCollision(Translate, this.points)){
			for(j = 0; j<this.points.length; j++) {
				var afterRotation = Translate(this.points[j]);
				this.ghost.points[j].x = afterRotation.x;
				this.ghost.points[j].y = afterRotation.y;
				this.points[j].x = afterRotation.x;
				this.points[j].y = afterRotation.y;

			}

			this.ghost.update();
			invalid = true;
		}
	};

	var checkCollision = function(Translation, points){
		var x;
		var y;
		for(j = 0; j<points.length; j++) {
			point = points[j];
			newX = Translation(point).x;
			newY = Translation(point).y;
			if(newX < 0 || newX > 9 || newY > 19 || gridPoints[newX][newY]){
				return true;

			}
		}
		return false;

	};



	this.ghost = new Ghost(this);


	return this;
}