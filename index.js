import { resizeCanvas } from "./lib/helper.js";
import { wave, strokeColor, bgColor } from "./lib/gui.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

let increment = 0;
const graph = () => {
  c.moveTo(0, wave.y_zero);
  c.beginPath();

  for (let x = 0; x < innerWidth; x += wave.delta_x) {
    let dy = -Math.sin(increment + x * wave.frequency) * wave.amplitude;

    if (wave.animate_y) dy *= Math.sin(increment);

    c.lineTo(x, wave.y_zero + dy);
  }

  let hue = strokeColor.hue;

  if (wave.animate_color) hue = Math.abs(hue + 20 * Math.sin(increment));

  c.strokeStyle = `hsl(${hue}, ${strokeColor.saturation}%, ${strokeColor.lightness}%)`;
  c.stroke();

  increment += wave.speed;
};

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, ${bgColor.alpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  // Amplitude is negative because canvas maps y positive in the down direction
  graph();
};

const setup = () => {
  resizeCanvas(canvas);
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
