console.log("hello world");
class HydrogenMolecule {
  constructor() {
    this.x = Math.random() * 800;
    this.y = Math.random() * 900;

  }
}
class SolarSystem {
  constructor() {
    this.hpsElement = document.getElementById("hps");
    this.hydrogenElement = document.getElementById("hydrogen");
    this.buyHydrogenButton = document.getElementById("buyHydrogen");
    this.hpsCostLabel = document.getElementById("hpsCost");
    this.buyHydrogenButton.addEventListener("click", () => {
      this.clickBuyHydrogen();
    });
    /** @type {HTMLCanvasElement} */
    this.canvasElement = document.getElementById("solarcanvas");
    this.canvas = this.canvasElement.getContext("2d");
    this.canvasElement.addEventListener("click", () => {
      this.clickCanvas();
    });
    this.hydrogen = 0;
    this.hps = 0;
    this.hpsCost = 10;
    this.hpsCostLabel.textContent = " buy for " + this.hpsCost;
    /** @type{Array.<HydrogenMolecule>} */
    this.hydrogenMolecules = [];
    setInterval(() => {
      this.tick();
    }, 1000);
  }
  tick() {
    this.hydrogen = this.hydrogen + this.hps;
    this.updateMolecules();
    this.draw();
  }

  clickBuyHydrogen() {
    if (this.hydrogen < this.hpsCost) {
      return;
    } else {
      this.hydrogen = this.hydrogen - this.hpsCost;
      this.hps = this.hps + 1;
      this.draw();
    }
  }
  updateMolecules() {
    let hm = this.hydrogen / 10;
    if (hm > 1000) {
      hm = 1000;
    }
    while (hm > this.hydrogenMolecules.length) {
      this.hydrogenMolecules.push(new HydrogenMolecule());
    }
  }
  clickCanvas() {
    this.hydrogen = this.hydrogen + 1;
    this.updateMolecules();
    this.draw();
  }
  ellipse(x, y, rx, ry) {
    this.canvas.beginPath();
    this.canvas.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    this.canvas.fill();
  }
  drawHydrogen() {
    this.canvas.fillStyle = "white";
    for (let m of this.hydrogenMolecules) {
      this.ellipse(m.x, m.y, 2.5, 2.5);
    }

  }

  draw() {
    this.canvas.fillStyle = "black";
    this.canvas.fillRect(0, 0, 800, 900);
    this.hpsElement.textContent = "Hydrogen per second:" + this.hps;
    this.hydrogenElement.textContent = "Hydrogen: " + this.hydrogen;
    this.drawHydrogen();
  }

  start() {
    this.draw();
  }
}

let solarSystem = new SolarSystem();
solarSystem.start();