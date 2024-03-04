console.log("hello world");
class HydrogenMolecule {
  constructor() {
    this.startX = Math.random() * solarSystem.width;
    this.startY = Math.random() * solarSystem.height;
    this.x = this.startX;
    this.y = this.startY;
  }
}
class SolarSystem {
  constructor() {
    this.width = 800;
    this.height = 900;

    this.buyHydrogenButton = document.getElementById("buyHydrogen");
    this.buyClickPowerButton = document.getElementById("buyClickPower");
    this.buyEnergyButton = document.getElementById("buyEnergy");
    this.buyTheSun = document.getElementById("buyTheSun");
    // Resource labels:
    this.hpsElement = document.getElementById("hps");
    this.hydrogenElement = document.getElementById("hydrogen");
    this.energyElement = document.getElementById("energy");
    // Price labels:
    this.hpsCostLabel = document.getElementById("hpsCost");

    this.buyHydrogenButton.addEventListener("click", () => {
      this.clickBuyHydrogen();
    });
    this.buyClickPowerButton.addEventListener("click", () => {
      this.clickBuyClickPower();
    });
    this.buyEnergyButton.addEventListener("click", () => {
      this.clickBuyEnergy();
    });


    /** @type {HTMLCanvasElement} */
    this.canvasElement = document.getElementById("solarcanvas");
    this.canvas = this.canvasElement.getContext("2d");
    this.canvasElement.addEventListener("click", () => {
      this.clickCanvas();
    });
    // Resources:
    this.hydrogen = 0;
    this.hps = 0;
    this.energy = 0;
    // Prices:
    this.hpsCost = 10;
    this.energyCost = 10;

    this.energyPerPixel = 100;
    this.hpsCostLabel.textContent = " buy for " + this.hpsCost;
    this.milliSecondsPerFrame = 40;
    this.framesPerSecond = 1000 / this.milliSecondsPerFrame;
    this.totalTicks = 0;
    /** @type{Array.<HydrogenMolecule>} */
    this.hydrogenMolecules = [];
    setInterval(() => {
      this.tick();
    }, this.milliSecondsPerFrame);
  }
  tick() {
    this.totalTicks = this.totalTicks + 1
    this.hydrogen = this.hydrogen + this.hps / this.framesPerSecond;
    this.updateMolecules();
    let seconds = this.totalTicks / this.framesPerSecond;
    let isRoundNumberOfSeconds = (seconds == Math.round(seconds));
    this.computeMoleculePositions();
    this.draw(isRoundNumberOfSeconds);
  }

  clickBuyHydrogen() {
    if (this.hydrogen < this.hpsCost) {
      return;
    }
    this.hydrogen = this.hydrogen - this.hpsCost;
    this.hps = this.hps + 1;
    this.draw(true);
  }
  clickBuyEnergy() {
    if (this.hps < this.energyCost) {
      return;
    }
    this.hps = this.hps - this.energyCost;
    this.energy = this.energy + 1;
    this.draw(true);

  }
  clickBuyClickPower() { }

  clickBuyTheSun() { }


  updateMolecules() {
    let desiredNumberOfHydrogenMolecules = Math.floor(this.hydrogen / 10);
    if (desiredNumberOfHydrogenMolecules > 10000) {
      desiredNumberOfHydrogenMolecules = 10000;
    }
    while (desiredNumberOfHydrogenMolecules > this.hydrogenMolecules.length) {
      this.hydrogenMolecules.push(new HydrogenMolecule());
    }
    if (desiredNumberOfHydrogenMolecules < this.hydrogenMolecules.length) {
      this.hydrogenMolecules.length = desiredNumberOfHydrogenMolecules;
    }
  }
  clickCanvas() {
    this.hydrogen = this.hydrogen + 1;
    this.updateMolecules();
    this.draw(true);
  }
  ellipse(x, y, rx, ry) {
    this.canvas.beginPath();
    this.canvas.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    this.canvas.fill();
  }
  computeMoleculePositions() {
    let centerX = this.width / 2;
    let centerY = this.height / 2;
    for (let m of this.hydrogenMolecules) {
      let y = m.y - centerY;
      let x = m.x - centerX;
      let l = Math.sqrt(x * x + y * y);
      if (l === 0) {
        continue;
      }
      let e = (this.energy / this.energyPerPixel) / this.framesPerSecond;
      let wrongX = x - e * y / l;
      let wrongY = y + e * x / l;
      let wrongL = Math.sqrt(wrongX * wrongX + wrongY * wrongY);
      if (wrongL === 0) {
        continue;
      }
      m.x = wrongX * l / wrongL + centerX;
      m.y = wrongY * l / wrongL + centerY;
    }
  }
  drawHydrogen() {
    let blue = 255 - Math.floor(this.energy);
    if (blue < 0) {
      blue = 0;
    }
    this.canvas.fillStyle = "rgb(255,255," + blue + ")";
    for (let m of this.hydrogenMolecules) {
      this.ellipse(m.x, m.y, 2.5, 2.5);
    }
  }

  draw(textRefreshWanted) {
    this.canvas.fillStyle = "black";
    this.canvas.fillRect(0, 0, 800, 900);
    if (textRefreshWanted) {
      this.hpsElement.textContent = "Hydrogen per second:" + this.hps;
      this.energyElement.textContent = "Energy: " + this.energy;
      this.hydrogenElement.textContent = "Hydrogen: " + Intl.NumberFormat().format(Math.round(this.hydrogen));
    }

    this.drawHydrogen();
  }

  start() {
    this.draw(true);
  }
}

let solarSystem = new SolarSystem();
solarSystem.start();