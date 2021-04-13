const guiControls = new (function () {
	this.animationSpeed = 1;
	this.drawOrbit = true;
	this.orbitStroke = 125;
	this.gridStroke = 25;
	this.drawTrajectory = false;
	this.enableLighting = true;
})();

function guiSetup() {
	let gui = new dat.GUI();
	gui.add(guiControls, "animationSpeed", 0, 10);
	gui.add(guiControls, "drawOrbit");
	gui.add(guiControls, "orbitStroke", 0, 255);
	gui.add(guiControls, "gridStroke", 0, 255);
	gui.add(guiControls, "drawTrajectory");
	gui.add(guiControls, "enableLighting");
}
