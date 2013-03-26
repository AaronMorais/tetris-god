function Point(x,y) {
	this.x = x;
	this.y = y;
	this.w = blocksize;
	this.h = blocksize;
	this.fill = '#0000FF';

	this.draw = function(location) {
		context = location ? location : ctx;
		if(this.y < 2) { return;}
		context.fillStyle = this.fill;
		context.fillRect(this.x*blocksize, (this.y-2)*blocksize, this.w, this.h);
	};

	this.gravity = function() {
		this.y +=1;
	};
}