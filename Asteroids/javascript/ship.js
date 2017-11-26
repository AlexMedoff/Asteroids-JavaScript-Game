function Ship() {
	this.pos = createVector(width/2, height/2);		//Vector for center of traingle
	this.radius = 10;
	this.angle = 90;
	this.friction = .97; 	//Multiplyer for friction on ship
	this.vel = createVector(0,0);
	this.bullets = [];
	this.loop = true;

	this.turn = function(a) {
		this.angle += a;
	}

	this.move = function() {		//Adding Velocity vector to position vector and applying friction constant
		this.pos.add(this.vel);
		this.vel.mult(this.friction);
	}

	this.force = function() {		//Accelerating the velocity vector
		var force = p5.Vector.fromAngle(toRad(this.angle) - PI/2);
		force.mult(.7);
		this.vel.add(force.mult(keys[0]));
	}

	this.shoot = function() {
		var b = new Bullet(this.pos.x, this.pos.y, this.vel, this.angle);
		this.bullets.push(b);
	}

	this.display = function() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(toRad(this.angle));
		noFill();
		stroke(255);
		triangle(-this.radius, this.radius, this.radius, this.radius, 0, -(this.radius*1.5));
		pop();
	}

	this.checkBoundaries = function() {		//Wraps ship around screen
		if (this.loop) {
			if (this.pos.x - this.radius*1.5 >= width) {
				this.pos.x = -this.radius;
			}
			else if (this.pos.x + this.radius*1.5 <= 0) {
				this.pos.x = width + this.radius;
			}
			if (this.pos.y + this.radius*1.5 <= 0) {
				this.pos.y = height + this.radius;
			}
			else if (this.pos.y - this.radius*1.5 >= height) {
				this.pos.y = -this.radius;
			}
		}

	}	
	this.hits = function(a) {		//Checking if ship hits asteroid
		if (dist(a.pos.x, a.pos.y, this.pos.x, this.pos.y) <= this.radius + a.radius) {
			return true;
		}
		return false;
	}
	this.end = function() {
		this.loop = false;		//Stopping checkBoundaries() from running
		for (var i=0; i < 10; i++) {								//Explosion effect
			explosions.push(new explosion(this.pos.x, this.pos.y));
		}
		this.pos.x = width*10;			//Putting ship way offscreen
		this.pos.y = height*10;
	}
}