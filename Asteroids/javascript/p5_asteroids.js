var keys = [0, 0, 0];		//Array of values to be entered into movement functions

var ship;		//Player Ship
function setup() {
	createCanvas(600, 600);		//Creates Canvas
	ship = new Ship();
}

function draw() {
	background(20);		//Background color on grayscale

	ship.display();

}

function keyPressed() {
	if(keyCode == UP_ARROW) {
		keys[0] = 0;
	}
	if(keyCode == RIGHT_ARROW) {
		keys[1] = 10;
	}
	if(keyCode == LEFT_ARROW) {
		keys[2] = 10;
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
		keys[2] = 0;
	}
}

function toRad(angle) {
	return angle * (Math.PI/180);
}

function Ship() {
	this.pos = createVector(width/2, height/2);		//Vector for center of traingle
	this.radius = 5;
	this.angle = 90;

	this.turn = function(a) {
		rotate(a);
	}

	this.display = function() {
		translate(this.pos.x, this.pos.y);
		nofill();
		stroke(255);
		triangle(-this.radius, this.radius, this.radius, -this.radius, 0, this,radius);
	}
	
}

function asteroids() {

}