var keys = [0, 0];		//Array of values to be entered into movement functions

var ship;		//Player Ship

function setup() {
	createCanvas(windowWidth/1.5, windowHeight/1.5);		//Creates Canvas
	ship = new Ship();
}

function draw() {
	background(20);		//Background color on grayscale

	checkKeysDown();
	ship.turn(keys[1]);
	ship.force();
	ship.move();
	for (i=0; i < ship.bullets.length; i++) {		//Displays all bullets in array
		ship.bullets[i].move();
		ship.bullets[i].display();
	}
	ship.checkBoundaries();
	ship.display();
}

function checkKeysDown() {
	if (keyIsDown(UP_ARROW)) {
		keys[0] = .3;
	}
	if (keyIsDown(LEFT_ARROW)) {
		keys[1] = -5;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		keys[1] = 5;
	}
}


function keyPressed() {
	if (keyCode === 32) {
		ship.shoot();
	}
}

function keyReleased() {
	if(keyCode == UP_ARROW) {
		keys[0] = 0;
	}
	if(keyCode == RIGHT_ARROW) {
		keys[1] = 0;
	}
	if(keyCode == LEFT_ARROW) {
		keys[1] = 0;
	}
}

function toRad(angle) {
	return angle * (Math.PI/180);
}

function Ship() {
	this.pos = createVector(width/2, height/2);		//Vector for center of traingle
	this.radius = 10;
	this.angle = 90;
	this.friction = .98; 	//Multiplyer for friction on ship
	this.vel = createVector(0,0);
	this.bullets = [];

	this.turn = function(a) {
		this.angle += a;
	}

	this.move = function() {		//Adding Velocity vector to position vector and applying friction constant
		this.pos.add(this.vel);
		this.vel.mult(this.friction);
	}

	this.force = function() {		//Accelerating the velocity vector
		var force = p5.Vector.fromAngle(toRad(this.angle) - PI/2);
		this.vel.add(force.mult(keys[0]));
	}

	this.shoot = function() {
		var b = new Bullet(this.pos.x, this.pos.y, this.vel, this.angle);
		this.bullets.push(b);
	}

	this.display = function() {
		translate(this.pos.x, this.pos.y);
		rotate(toRad(this.angle));
		noFill();
		stroke(255);
		triangle(-this.radius, this.radius, this.radius, this.radius, 0, -(this.radius*1.5));
	}

	this.checkBoundaries = function() {
		if (this.pos.x - this.radius*1.5 >= width) {
			this.pos.x = -this.radius;
		}
		if (this.pos.x + this.radius*1.5 <= 0) {
			this.pos.x = width + this.radius;
		}
		if (this.pos.y + this.radius*1.5 <= 0) {
			this.pos.y = height + this.radius;
		}
		if (this.pos.y - this.radius*1.5 >= height) {
			this.pos.y = -this.radius;
		}
	}
	
}

function Asteroid() {

}

function Bullet(x, y, velocity_vector, a) {
	this.pos = createVector(x, y);
	this.host_angle = a;
	this.velocity = p5.Vector.fromAngle(toRad(a) - PI/2);

	this.move = function() {
		this.pos.add(p5.Vector.mult(this.velocity, 10));
	}

	this.display = function() {
		stroke(255);
		line(this.pos.x, this.pos.y, this.pos.x + (5*Math.cos(toRad(this.host_angle) - PI/2)), this.pos.y + (5*Math.sin(toRad(this.host_angle) - PI/2)));		//Creates a 5px long line in direction of ship's current vel
	}
}