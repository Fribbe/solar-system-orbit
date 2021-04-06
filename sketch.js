let planetTextures = [];
let planets = [];
let parsed;
let sun;

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
}

function draw() {
	background(51);
	//pointLight(255, 255, 255, 0, -500, 0);
	orbitControl(2);
	createGrid();
	createTrajectory();
	sun.display();
	for (let i = 1; i < planets.length; i++) {
		planets[i].orbit(sun);
		planets[i].display();
	}
}

function createGrid() {
	stroke(255, 25);

	for (let i = -100; i <= 100; i += 20) {
		line(i, 0, 120, i, 0, -120);
		line(120, 0, i, -120, 0, i);
	}
}

function createTrajectory() {
	for (let i = 1; i < planets.length; i++) {
		let diff = planets[i].farthestPoint - planets[i].semiMajorAxis;
		push();
		stroke(255, 25);
		noFill();
		rotateX(PI / 2);
		ellipse(diff, 0, 2 * planets[i].semiMajorAxis, 2 * planets[i].semiMinorAxis, 30);
		pop();
	}
}
