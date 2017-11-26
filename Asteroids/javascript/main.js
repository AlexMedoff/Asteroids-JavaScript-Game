var keys = [0, 0];		//Array of values to be entered into movement functions

var ship;		//Player Ship

var toRemove = []		//Array used as middleman in removing bullets from "bullets" array

var asteroids = []		//Array of asteroids

var explosions = [];	//Array of explosion dots

function setup() {
	createCanvas(750, 500);		//Creates Canvas
	ship = new Ship();

	var redo = true;		//Boolean that will be set to figure out whether or not new asteroids must be configured

	for (var i = 0; i < 10; i++) {
		while(redo){
			var a = new Asteroid();
			if (!ship.hits(a)) {
				asteroids.push(a);
				redo = false;
			}
		}
		redo = true;
	}
}

function draw() {
	background(20);		//Background color on grayscale

	checkKeysDown();
	ship.turn(keys[1]);
	ship.force();
	ship.move();
	for (var i=0; i < ship.bullets.length; i++) {		//Displays all bullets in array
		ship.bullets[i].move();
		ship.bullets[i].checkBoundaries();
		ship.bullets[i].display();		//Displaying bullets
		for (var j=0; j < asteroids.length; j++) {		//Collision detection with asteroids
			if (ship.bullets[i].checkCollision(asteroids[j])) {
				asteroids[j].break();
				toRemove.push(ship.bullets[i]);
			}
		}
		if (ship.bullets[i].distance()) {
			toRemove.push(ship.bullets[i]);
		}
	}
	for (var i=0; i < toRemove.length; i++) {		//In between array that holds bullets to be removed from main bullet array
		var index = ship.bullets.indexOf(toRemove[i]);
		ship.bullets.splice(index, 1);
		index = toRemove.indexOf(i);
		toRemove.splice(index, 1);
	}
	ship.checkBoundaries();
	ship.display();			//Displaying ship
	for (var i = 0; i < asteroids.length; i++) {
		asteroids[i].move();
		asteroids[i].checkBoundaries();
		asteroids[i].display();		//Displaying asteroids
		if (ship.hits(asteroids[i])) {		//Checking for collision with ship
			ship.end();
		}
	}
	for (var i=0; i < explosions.length; i++) {
		explosions[i].update();
		explosions[i].display();		//Displaying explosion dots
		explosions[i].end();
	}
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