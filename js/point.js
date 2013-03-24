function Point(x,y) {
	this.x = x;
	this.y = y;
	this.w = 40;
	this.h = 40;
	this.fill = '#000FF';

	this.draw = function() {
		ctx.fillStyle = this.fill;
		ctx.fillRect(this.x*40, this.y*40, this.w, this.h);
	}

	this.gravity = function() {
		this.y +=1;
	}
}