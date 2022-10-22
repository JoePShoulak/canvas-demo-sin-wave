import { resizeCanvas } from "./lib/helper.js";
import { Class } from "./lib/Class.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const setup = () => {
  resizeCanvas(canvas);
};

const wave = {
  y_zero: innerHeight / 2,
  frequency: 0.05,
  amplitude: 200,
  delta_x: 1,
  speed: 0.01,
};

const strokeColor = {
  hue: 200,
  saturation: 50,
  lightness: 50,
};

const bgColor = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 0.01,
};

const gui = new dat.GUI();

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y_zero", 0, innerHeight);
waveFolder.add(wave, "delta_x", 0.01, 10);
waveFolder.add(wave, "frequency", 0.001, 0.1);
waveFolder.add(wave, "amplitude", 0, 100);
waveFolder.add(wave, "speed", 0.005, 0.05);
waveFolder.open();

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, "hue", 0, 255);
strokeFolder.add(strokeColor, "saturation", 0, 100);
strokeFolder.add(strokeColor, "lightness", 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(bgColor, "red", 0, 255);
backgroundFolder.add(bgColor, "green", 0, 255);
backgroundFolder.add(bgColor, "blue", 0, 255);
backgroundFolder.add(bgColor, "alpha", 0.01, 0.1);
backgroundFolder.open();

let xStart = 0;
const graph = () => {
  c.moveTo(0, wave.y_zero);
  c.beginPath();
  for (let x = 0; x < innerWidth; x += wave.delta_x) {
    c.lineTo(
      x,
      wave.y_zero + -Math.sin(xStart + x * wave.frequency) * wave.amplitude
    );
  }
  c.strokeStyle = `hsl(${strokeColor.hue}, ${strokeColor.saturation}%, ${strokeColor.lightness}%)`;
  c.stroke();

  xStart += wave.speed;
};

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, ${bgColor.alpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  // Amplitude is negative because canvas maps y positive in the down direction
  graph();
};

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  setup();
});

window.addEventListener("resize", () => {
  resizeCanvas(canvas);
});

setup();
animate();
