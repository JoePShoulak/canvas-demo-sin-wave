import { resizeCanvas } from "./lib/helper.js";
import { Class } from "./lib/Class.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const setup = () => {
  resizeCanvas(canvas);
};

const graph = (curve) => {
  c.beginPath();
  c.moveTo(0, innerHeight / 2);
  for (let x = 0; x < innerWidth; x++) {
    const y = curve(x);

    c.lineTo(x, innerHeight / 2 + y);
  }
  c.stroke();
};

const adjustedSin = (x) => {
  const amplitude = innerHeight / 2;
  const frequency = (Math.PI * 2) / innerWidth;

  return Math.sin(x * frequency) * -amplitude;
};

const gui = new dat.GUI();

const animate = () => {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  // Amplitude is negative because canvas maps y positive in the down direction
  graph(adjustedSin);
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
