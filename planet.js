class Planet {
	constructor(planetRadius, farthestPoint, nearestPoint, semiMajorAxis, eccentricity) {
		this.planetRadius = planetRadius;
		this.farthestPoint = farthestPoint;
		this.nearestPoint = nearestPoint;
		this.semiMajorAxis = semiMajorAxis;
		this.eccentricity = eccentricity;
		this.semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
		this.orbitAngle = 0;
		this.x = semiMajorAxis;
		this.y = 0;
		this.trajectory = [];
	}

	computeVelocity(mu, primary) {
		let diffX = primary.x - this.x;
		let diffY = primary.y - this.y;
		let r = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
		return Math.sqrt(mu * (2 / r - 1 / this.farthestPoint));
	}

	orbit(primary) {
		let velocity = guiControls.animationSpeed * this.computeVelocity(9.8, primary);
		let diff = this.farthestPoint - this.semiMajorAxis;
		this.x =
			diff +
			(this.semiMajorAxis * (1 - Math.pow(tan(radians(this.orbitAngle) / 2), 2))) /
				(1 + Math.pow(tan(radians(this.orbitAngle) / 2), 2));
		this.y =
			(this.semiMinorAxis * 2 * tan(radians(this.orbitAngle) / 2)) /
			(1 + Math.pow(tan(radians(this.orbitAngle) / 2), 2));
		this.orbitAngle = (this.orbitAngle + velocity) % 360;

		this.trajectory.push(createVector(this.x, this.y));
		if (this.trajectory.length > 100) {
			this.trajectory.splice(0, 1);
		}
	}

	display() {
		let ratio = (0.1 * this.planetRadius) / this.trajectory.length;

		for (let i = 0; i < this.trajectory.length - 1; i++) {
			push();
			let pos = this.trajectory[i];
			translate(pos.x, 0, pos.y);
			stroke((i * 205) / this.trajectory.length + 50);
			sphere(i * ratio);
			pop();
		}

		push();
		noStroke();
		//ambientMaterial(255);
		//texture(this.texture);
		translate(this.x, 0, this.y);
		sphere(this.planetRadius);
		pop();
	}
}
