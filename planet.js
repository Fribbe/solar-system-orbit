const planets = [];

const PLANET_RADIUS_SCALE = 10e-4;
const ORBIT_DISTANCE_SCALE = 10e-7;
const PLANET_MASS_SCALE = 10e24;

class Planet {
	constructor(name, planet) {
		this.name = name;
		this.radius = planet.radius * PLANET_RADIUS_SCALE;
		this.farthestPoint = planet.farthestPoint * ORBIT_DISTANCE_SCALE;
		this.nearestPoint = planet.nearestPoint * ORBIT_DISTANCE_SCALE;
		this.semiMajorAxis = planet.semiMajorAxis * ORBIT_DISTANCE_SCALE;
		this.eccentricity = planet.eccentricity;
		this.semiMinorAxis = this.semiMajorAxis * Math.sqrt(1 - this.eccentricity * this.eccentricity);
		this.orbitAngle = 0;
		this.x = this.semiMajorAxis;
		this.y = 0;
		this.z = 0;

		this.trajectory = [];
	}

	computeVelocity(mu, primary) {
		let diffX = primary.x - this.x;
		let diffZ = primary.z - this.z;
		let r = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffZ, 2));
		return Math.sqrt(mu * (2 / r - 1 / this.farthestPoint));
	}

	orbit(primary) {
		let velocity = guiControls.animationSpeed * this.computeVelocity(9.8, primary);
		let diff = this.farthestPoint - this.semiMajorAxis;
		this.x =
			diff +
			(this.semiMajorAxis * (1 - Math.pow(tan(radians(this.orbitAngle) / 2), 2))) /
				(1 + Math.pow(tan(radians(this.orbitAngle) / 2), 2));
		this.z =
			(this.semiMinorAxis * 2 * tan(radians(this.orbitAngle) / 2)) /
			(1 + Math.pow(tan(radians(this.orbitAngle) / 2), 2));
		this.orbitAngle = (this.orbitAngle + velocity) % 360;

		this.trajectory.push(createVector(this.x, this.y, this.z));
		if (this.trajectory.length > 100) {
			this.trajectory.splice(0, 1);
		}
	}

	drawTrajectory() {
		let ratio = (0.1 * this.radius) / this.trajectory.length;

		for (let i = 0; i < this.trajectory.length - 1; i++) {
			push();
			let pos = this.trajectory[i];
			translate(pos.x, 0, pos.z);
			stroke((i * 205) / this.trajectory.length + 50);
			sphere(i * ratio);
			pop();
		}
	}

	display() {
		push();
		noStroke();
		translate(this.x, 0, this.z);
		sphere(this.radius);
		pop();
	}
}

class Sun {
	constructor(radius, x, y, z) {
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	display() {
		push();
		noStroke();
		translate(this.x, this.y, this.z);
		sphere(this.radius);
		pop();
	}
}

function createPlanets(data) {
	for (entry in data) {
		planets.push(new Planet(entry, data[entry]));
	}
}

function createGrid() {
	push();
	stroke(guiControls.gridStroke, guiControls.gridStroke);
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

function drawOrbit() {
	for (let i = 0; i < planets.length; i++) {
		let diff = planets[i].farthestPoint - planets[i].semiMajorAxis;
		push();
		stroke(guiControls.orbitStroke, guiControls.orbitStroke);
		noFill();
		rotateX(PI / 2);
		ellipse(diff, 0, 2 * planets[i].semiMajorAxis, 2 * planets[i].semiMinorAxis, 30);
		pop();
	}
}
