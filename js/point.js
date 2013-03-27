function Point(x,y) {
	this.x = x;
	this.y = y;
	// this.w = blocksize;
	// this.h = blocksize;
	this.fill = '#000FF';

	this.draw = function() {
		if(this.y < 2) { return;}
		ctx.fillStyle = this.fill;
		ctx.fillRect(this.x*blocksize, (this.y-2)*blocksize, blocksize, blocksize);
	};

	this.gravity = function() {
		this.y +=1;
	};
}