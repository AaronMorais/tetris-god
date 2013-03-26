function Ghost(shape){
	
	this.points = [];

	var pointDrawOverride = function(){
		if(this.y < 2) { return;}
   		
   		ctx.beginPath();
		ctx.strokeStyle = this.fill;
		ctx.rect(this.x*blocksize, (this.y-2)*blocksize, this.w, this.h);
		ctx.stroke();
	};

	for(var j = 0; j<shape.points.length; j++) {
		this.points.push(new Point (shape.points[j].x, shape.points[j].y));
		this.points[j].fill = '#000000';
		this.points[j].draw = pointDrawOverride;

	}

	var self = this;
	this.update = function(){
		var canLand = true;
		var shift = 0;
		for(var i = 0; i<21 && canLand; i++){
			for(j = 0; j<self.points.length; j++){
				if(gridPoints[shape.points[j].x][shape.points[j].y + i] || shape.points[j].y + i > 21){
					canLand = false;
					shift = i - 1;
					break;
				}
			}
		}
		if(shift){
			for(var k = 0; k<shape.points.length; k++) {
				self.points[k].y = shape.points[k].y + shift;
			}
		}
		this.draw();
	};

	this.draw  = function() {
		for(j = 0; j<this.points.length; j++) {
			this.points[j].draw();
		}
	};
	
}