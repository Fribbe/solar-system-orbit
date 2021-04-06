let planetTextures = [];
let planets = [];
let parsed;
let sun;
let bg;

let guiControls = new (function () {
	this.animationSpeed = 1;
})();

function createPlanets(data) {
	for (entry in data) {
		let planet = data[entry];
		let tmp = new Planet(
			planet.radius,
			planet.farthestPoint,
			planet.nearestPoint,
			planet.semiMajorAxis,
			planet.eccentricity
		);
		planets.push(tmp);
	}
}

function guiSetup() {
	let gui = new dat.GUI();
	gui.add(guiControls, "animationSpeed", 0, 10);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	guiSetup();
	createPlanets(parsed);

	sun = planets[0];
}

function preload() {
	parsed = loadJSON("./data.json");
	bg = loadImage("./8k_stars.jpg");
}

function draw() {
	background(0);
	push();
	fill(255);
	texture(bg);
	sphere(2000);
	pop();
	//pointLight(255, 255, 255, 0, -500, 0);
	orbitControl();
	createGrid();
	createTrajectory();
	sun.display();
	for (let i = 1; i < planets.length; i++) {
		planets[i].orbit(sun);
		planets[i].display();
	}
}

function createGrid() {
	push();
	stroke(20, 20);
	let r = 1000;
	let angle = 20;
	for (let i = 0; i < 360; i += angle) {
		let x = r * cos(radians(i));
		let z = r * sin(radians(i));
		line(0, 50, 0, x, 50, z);
	}
	noFill();
	translate(0, 50, 0);
	rotateX(PI / 2);
	for (let i = 0; i < 1000; i += 200) {
		circle(0, 0, i * 2);
	}
	pop();
}

function createTrajectory() {
	for (let i = 1; i < planets.length; i++) {
		let diff = planets[i].farthestPoint - planets[i].semiMajorAxis;
		push();
		stroke(55, 255);
		noFill();
		rotateX(PI / 2);
		ellipse(diff, 0, 2 * planets[i].semiMajorAxis, 2 * planets[i].semiMinorAxis, 30);
		pop();
	}
}
