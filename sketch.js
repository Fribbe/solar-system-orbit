let sun;
let planets = [];
const AE = 149.59787;
const SUN_RADIUS = 2 * 6.9634;
/**
 * EARTH DATA
 */
const EARTH_RADIUS = 6.371;
const EARTH_SMA = 149.598023;
const EARTH_FP = 152.1;
const EARTH_NP = 147.095;
const EARTH_ECC = 0.0167086;

/**
 * MERCURY DATA
 */
const MERCURY_RADIUS = 2.439;
const MERCURY_SMA = 57.90905;
const MERCURY_FP = 69.8169;
const MERCURY_NP = 46.0012;
const MERCURY_ECC = 0.20563;

/**
 * VENUS DATA
 */
const VENUS_RADIUS = 2.439;
const VENUS_SMA = 108.208;
const VENUS_FP = 108.939;
const VENUS_NP = 107.477;
const VENUS_ECC = 0.006772;

let guiControls = new (function () {
	this.animationSpeed = 1;
})();

function guiSetup() {
	let gui = new dat.GUI();
	gui.add(guiControls, "animationSpeed", 0, 10);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	guiSetup();
	sun = new Planet(SUN_RADIUS, 0, 0, 0, 0);
	let earth = new Planet(EARTH_RADIUS, EARTH_FP, EARTH_NP, EARTH_SMA, EARTH_ECC);
	let mercury = new Planet(MERCURY_RADIUS, MERCURY_FP, MERCURY_NP, MERCURY_SMA, MERCURY_ECC);
	let venus = new Planet(VENUS_RADIUS, VENUS_FP, VENUS_NP, VENUS_SMA, VENUS_ECC);

	planets.push(earth);
	planets.push(mercury);
	planets.push(venus);
}

function draw() {
	background(51);
	pointLight(255, 255, 255, 0, -500, 0);
	orbitControl();
	createGrid();
	createTrajectory();
	sun.display();
	planets.forEach(planet => {
		planet.orbit(sun);
		planet.display();
	});
}

function createGrid() {
	stroke(255, 25);

	for (let i = -100; i <= 100; i += 20) {
		line(i, 0, 120, i, 0, -120);
		line(120, 0, i, -120, 0, i);
	}
}

function createTrajectory() {
	planets.forEach(planet => {
		let diff = planet.farthestPoint - planet.semiMajorAxis;
		push();
		stroke(255, 25);
		noFill();
		rotateX(PI / 2);
		ellipse(diff, 0, 2 * planet.semiMajorAxis, 2 * planet.semiMinorAxis, 30);
		pop();
	});
}
