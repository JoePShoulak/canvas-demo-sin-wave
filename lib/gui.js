/* == PARAMETER OBJECTS == */
export const wave = {
  y_zero: innerHeight / 2,
  frequency: 0.05,
  amplitude: 200,
  delta_x: 1,
  speed: 0.01,
  animate_y: false,
  animate_color: false,
};

export const strokeColor = {
  hue: 200,
  saturation: 50,
  lightness: 50,
};

export const bgColor = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 0.01,
};

/* == DATGUI INFO == */
export const gui = new dat.GUI();
gui.close();

const waveFolder = gui.addFolder("Wave");
waveFolder.add(wave, "y_zero", 0, innerHeight);
waveFolder.add(wave, "delta_x", 0.01, 10);
waveFolder.add(wave, "frequency", 0.001, 0.1);
waveFolder.add(wave, "amplitude", 0, 100);
waveFolder.add(wave, "speed", 0.005, 0.05);
waveFolder.add(wave, "animate_y", false, true);
waveFolder.add(wave, "animate_color", false, true);

const strokeFolder = gui.addFolder("Stroke");
strokeFolder.add(strokeColor, "hue", 0, 255);
strokeFolder.add(strokeColor, "saturation", 0, 100);
strokeFolder.add(strokeColor, "lightness", 0, 100);

const backgroundFolder = gui.addFolder("Background");
backgroundFolder.add(bgColor, "red", 0, 255);
backgroundFolder.add(bgColor, "green", 0, 255);
backgroundFolder.add(bgColor, "blue", 0, 255);
backgroundFolder.add(bgColor, "alpha", 0.01, 0.1);
