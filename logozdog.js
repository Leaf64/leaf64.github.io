const TAU = Zdog.TAU;
const relY = -25;
const relX = 5;
const scale = 2;

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  zoom: 1.9
  // dragRotate: true,
});

const ringColor = '#3b47df';
const secondColor = '#3423a1';
const thirdColor = '#3423a1';

function giveMeEllipse(diameter, color, rotate = 0) {
  return new Zdog.Ellipse({
    addTo: illo,
    diameter: diameter * scale,
    stroke: 2,
    quarters: 1,
    color: color,
    rotate: { z: rotate },
  });
}

let ellipse1 = giveMeEllipse(60, ringColor);
let ellipse2 = giveMeEllipse(60, ringColor, TAU / 2);

function giveMeBox(height, x, y) {
  return new Zdog.Box({
    addTo: illo,
    width: 10 * scale,
    height: height * scale,
    depth: 10 * scale,
    translate: { x: (x + relX) * scale, y: (y + relY) * scale },
    stroke: false,
    color: ringColor,
    leftFace: secondColor,
    rightFace: secondColor,
    topFace: thirdColor,
    bottomFace: thirdColor,
  });
}

let box1 = giveMeBox(3, -10, 4);
let box2 = giveMeBox(10, 0, 10);
let box3 = giveMeBox(10, -10, 20);
let box4 = giveMeBox(10, 0, 30);
let box5 = giveMeBox(10, -10, 40);
let box6 = giveMeBox(3, 0, 46.6);

// Inicjalizacja parametrów ruchu
let mouseX = 0;
let mouseY = 0;
let velocityX = 0;
let velocityY = 0;
const damping = 0.95;

let ticker = 0;
let cycleCount = 150;

function animate() {
  let progress = ticker / cycleCount;
  // apply easing to rotation
  let tween = Zdog.easeInOut( progress % 1, 3 );
  illo.rotate.y = tween * Zdog.TAU;
  ticker++;

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();