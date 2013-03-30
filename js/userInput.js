var KeyCode = {
	"LEFT" : 37,
	"RIGHT" : 39,
	"UP" : 38,
	"DOWN" : 40,
	"OPTION" : 18,
	"CONTROL" : 17,
	"SHIFT" : 16,
	"SPACEBAR" : 32
};

var gravityAcceleration = 2;

function UserInput(){
	$(window).keydown(function(e) {
		if(!shape) { return;}
		var key = e.keyCode;
		switch(key){
			case(KeyCode.LEFT):
				shape.move(Direction.LEFT);
				break;
			case(KeyCode.UP):
				shape.rotate(Direction.UP);
				break;
			case(KeyCode.RIGHT):
				shape.move(Direction.RIGHT);
				break;
			case(KeyCode.DOWN):
				for(var i=0; i<gravityAcceleration; i++) {
					gravity();
				}
				gravityAcceleration *=10;
				break;
			case(KeyCode.OPTION): 
				shape.rotate(Direction.CCW);
				break;
			case(KeyCode.CONTROL): 
				shape.rotate(Direction.CCW);
				break;
			case(KeyCode.SHIFT):
				hold();
				break;
			case(KeyCode.SPACEBAR):
				recursiveGravity();
				break;
		}
		draw();
	});
		$(window).keydown(function(e) {
			if(!shape) { return;}
			var key = e.keyCode;
			switch(key){
				case(KeyCode.DOWN):
					gravityAcceleration = 2;
				break;
			}
	});
}