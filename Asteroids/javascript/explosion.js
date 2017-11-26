function explosion(x, y) {
	this.pos = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.counter = 0;

	this.update = function() {
		this.pos.add(this.vel);
		this.counter += 1;
	}
	this.end = function() {
		if (this.counter >= 20) {
			var index = explosions.indexOf(this);
			explosions.splice(index, 1);
		}
	}
	this.display = function() {
		push();
		stroke(255);
		point(this.pos.x, this.pos.y);
		pop();
	}
}