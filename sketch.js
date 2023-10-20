let jelly;
let canvasSize = 500;
let pinkColor = "#ffb3bf"; // Color of the jellyfish
let blueColor = "#3498db"; // New color for the jellyfish
let bubbles = []; // Array to store bubble objects
let easing = 0.05; // Easing factor for jellyfish movement
let eyeSize = 10; // Size of the jellyfish's eyes
let isJellyfishClicked = false; // Flag to track whether jellyfish was clicked

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("p5-canvas");
  initializeBubbles();
  jelly = createJellyfish(width / 2, height / 2, 30); // Create the jellyfish object
}

function draw() {
  background(168, 204, 255); // Background color

  // Move and display bubbles
  for (let bubble of bubbles) {
    bubble.move();
    bubble.display();
  }

  // Draw jellyfish tentacles based on its position and properties
  drawTentacles(jelly.x, jelly.y, jelly.radius, jelly.tentaclePhase, 2 * jelly.tentacleAmplitude);

  if (isJellyfishClicked) {
    // If jellyfish was clicked, make it blue
    fill(blueColor);
  } else {
    fill(pinkColor);
  }

  noStroke();
  ellipse(jelly.x, jelly.y, jelly.radius * 2, jelly.radius * 2);

  // Calculate easing movement for jellyfish based on mouse position
  let dx = mouseX - jelly.x;
  let dy = mouseY - jelly.y;
  jelly.x += dx * easing;
  jelly.y += dy * easing;
  jelly.tentaclePhase += 0.5; // Increment tentacle phase for animation

  drawEyes(jelly.x, jelly.y, eyeSize); // Draw jellyfish's eyes at this position
}

function mousePressed() {
  // Check if the mouse is inside the jellyfish's circle
  let d = dist(mouseX, mouseY, jelly.x, jelly.y);
  if (d < jelly.radius) {
    isJellyfishClicked = !isJellyfishClicked; // Toggle the clicked state
  }
}

// Restores the jellyfish to its original color
function resetJellyfishColor() {
  isJellyfishClicked = false;
}

// Creates a jellyfish object with specified position and radius
function createJellyfish(x, y, radius) {
  return {
    x,
    y,
    radius,
    tentacleAmplitude: 90,
    tentaclePhase: random(2 * TWO_PI),
    // Display function: draws the jellyfish
    display: function () {
      fill(pinkColor);
      noStroke();
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  };
}

// Initializes bubble objects and adds them to the bubbles array
function initializeBubbles() {
  for (let i = 0; i < 50; i++) {
    bubbles.push(createBubble());
  }
}

// Creates a bubble object with random position and properties
function createBubble() {
  let x = random(canvasSize);
  let y = height + random(10, 30);
  let radius = random(10, 30);

  return {
    x,
    y,
    radius,
    // Move function: animates the bubble's vertical movement
    move: function () {
      this.y -= this.radius / 20;
      if (this.y < -this.radius) {
        this.y = height + this.radius;
        this.x = random(canvasSize);
      }
    },
    // Display function: draws the bubble
    display: function () {
      fill(random(200, 255), random(200, 255), random(200, 255), 100);
      noStroke();
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  };
}

// Draws the jellyfish's tentacles
function drawTentacles(x, y, radius, tentaclePhase, tentacleAmplitude) {
  stroke(pinkColor);
  strokeWeight(2);
  push();
  translate(x, y);

  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI / 5 * i;
    let startX = cos(angle) * radius;
    let startY = sin(angle) * radius;
    let endX = cos(angle) * (radius + sin(tentaclePhase) * tentacleAmplitude);
    let endY = sin(angle) * (radius + sin(tentaclePhase) * tentacleAmplitude);
    line(startX, startY, endX, endY);
  }
  pop();
}

// Draws the jellyfish's eyes
function drawEyes(x, y, size) {
  fill(255); // Eye color
  noStroke();
  push();
  translate(x, y);

  // Draw left eye
  ellipse(-size, -size * 0.2, size * 3.5, size * 4);
  // Draw right eye
  ellipse(size, -size * 0.2, size * 3.5, size * 4);

  fill(0); // Pupil color
  // Draw left pupil
  ellipse(-size, -size * 0.2, size * 2, size * 2);
  // Draw right pupil
  ellipse(size, -size * 0.2, size * 2, size * 2);
  pop();
}
