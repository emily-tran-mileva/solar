console.log("hello world");
class SolarSystem {
  constructor() {
    /** @type {HTMLCanvasElement} */
    this.canvasElement = document.getElementById("solarcanvas");
    this.canvas = this.canvasElement.getContext("2d");
  }
  draw() {
    this.canvas.fillRect(0, 0, 800, 900);
  }
  start() {
    this.draw();
  }
}

let solarSystem = new SolarSystem();
solarSystem.start();