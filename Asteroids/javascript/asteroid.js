function Asteroid() {
	this.pos = createVector(random(width), random(height));
	this.vel = p5.Vector.random2D();
	this.radius = random(15, 50);
	this.max = floor(random(5, 15));
	this.vertices = [];		//Array of vertices
	this.offset = [];		//Array of radius offsets for each vertex
	for (var i = 0; i < this.max; i++) {		//Getting values for offsets
		this.offset[i] = random(-10, 10);
	}

	this.display = function() {
		push();
		translate(this.pos.x, this.pos.y);
		stroke(255);
		noFill();
		beginShape();
		for (var i = 0; i < this.max; i++) {
			var angle = map(i, 0, this.max, 0, TWO_PI);
			var r = this.radius + this.offset[i];
			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x, y);
			this.vertices.push(createVector(x,y));
		}
		endShape(CLOSE);
		pop();
	}
	this.move = function() {
		this.pos.add(this.vel);
	}
	this.checkBoundaries = function() {
		if (this.pos.x - this.radius >= width) {
			this.pos.x = -this.radius;
		}
		else if (this.pos.x + this.radius <= 0) {
			this.pos.x = width + this.radius;
		}
		if (this.pos.y + this.radius <= 0) {
			this.pos.y = height + this.radius;
		}
		else if (this.pos.y - this.radius >= height) {
			this.pos.y = -this.radius;
		}
	}
	this.setRadius = function(r) {
		this.radius = r;
	}
	this.setPos = function(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}
	this.break = function() {
		if (this.radius <= 20) {
			var index = asteroids.indexOf(this);
			asteroids.splice(index, 1);
		}
		else {
			var index = asteroids.indexOf(this);
			asteroids.splice(index, 1);
			var a1 = new Asteroid();
			var a2 = new Asteroid();
			a1.setRadius(this.radius/2);
			a2.setRadius(this.radius/2);
			var r1 = random(-3, 3);				//Slighlty altering position of both new asteroids with randomly calculated offsets
			var r2 = random(-3, 3);
			a1.setPos(this.pos.x + r1, this.pos.y - r1);
			a2.setPos(this.pos.x + r2, this.pos.y - r2);
			asteroids.push(a1);
			asteroids.push(a2);
		}
		for (var i=0; i < 10; i++) {
			explosions.push(new explosion(this.pos.x, this.pos.y));
		}
	}
}
