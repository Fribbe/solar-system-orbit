let parsed;
let sun;
let bg;
let cnv;

function setup() {
	cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	cnv.mouseWheel(zoom);
	guiSetup();
	createPlanets(parsed);
	sun = new Sun(69634 * 0.0002, 0, 0, 0);
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
	orbitControl(1, 1, 0);
	if (guiControls.drawOrbit) {
		drawOrbit();
	}
	sun.display();
	if (guiControls.enableLighting) {
		pointLight(255, 255, 255, 0, 0, 0);
	}
	createGrid();
	for (let i = 0; i < planets.length; i++) {
		planets[i].orbit(sun);
		planets[i].display();
		if (guiControls.drawTrajectory) {
			planets[i].drawTrajectory();
		}
	}
}

function zoom(event) {
	// zoom according to direction of mouseWheelDeltaY rather than value
	let sensitivityZoom = 0.08;
	let scaleFactor = cnv.height;
	if (event.deltaY > 0) {
		cnv._curCamera._orbit(0, 0, sensitivityZoom * scaleFactor);
	} else {
		cnv._curCamera._orbit(0, 0, -sensitivityZoom * scaleFactor);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
