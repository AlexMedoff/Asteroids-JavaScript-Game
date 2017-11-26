function Bullet(x, y, velocity_vector, a) {
	this.pos = createVector(x,y);
	this.counter = 0;		//Counter to count how long it has been traveling
	this.host_angle = a;
	this.velocity = p5.Vector.fromAngle(toRad(a) - PI/2);

	this.move = function() {
		this.pos.add(p5.Vector.mult(this.velocity, 10));
		this.counter += 1;
	}

	this.display = function() {
		push();
		stroke(255);
		line(this.pos.x, this.pos.y, this.pos.x + (5*Math.cos(toRad(this.host_angle) - PI/2)), this.pos.y + (5*Math.sin(toRad(this.host_angle) - PI/2)));
		pop();			//Creates a 5px long line in direction of ship's current vel ^^^^^
	}
	this.checkBoundaries = function() {
		if (this.pos.x >= width) {
			this.pos.x = 0;
		}
		else if (this.pos.x <= 0) {
			this.pos.x = width;
		}
		if (this.pos.y<= 0) {
			this.pos.y = height;
		}
		else if (this.pos.y >= height) {
			this.pos.y = 0;
		}
	}
	this.distance = function() {
		if (this.counter >= 30) {
			return true;
		}
		else {
			return false;
		}
	}
	this.checkCollision = function(a) {		//Takes an asteroid or ship object as parameter
		if (dist(this.pos.x, this.pos.y, a.pos.x, a.pos.y) <= a.radius + 10) {		//Adding 10 to radius to account for some extra length from offsets
			return true;
		}
		else { return false; }
	}
}