const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 16;
const SNAKE_SPEED = 100; // in ms

const snake = [{ x: GRID_SIZE * 10, y: GRID_SIZE * 10 }];
let food = { x: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE), y: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE) };
let dx = 0;
let dy = 0;
let lastMove = '';

let lastRenderTime = 0;
let gameOver = false;

let currentScore = 0;
let highScore = 0;

// Event listeners for keyboard input
document.addEventListener('keydown', handleKeyPress);

// Game loop
function main(currentTime) {
  if (gameOver) {
    updateHighScore();
    resetGame();
    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    return;
  }

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function resetGame() {
  gameOver = false;
  snake.length = 1;
  snake[0] = { x: GRID_SIZE * 10, y: GRID_SIZE * 10 };
  food = { x: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE), y: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE) };
  dx = 0;
  dy = 0;
  lastMove = '';
  currentScore = 0;
}

// Update function
function update() {
  // Update snake position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    food = { x: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE), y: GRID_SIZE * Math.floor(Math.random() * GRID_SIZE) };
    currentScore++;
  } else {
    snake.pop();
  }

  // Check for game over
  if (isGameOver()) {
    gameOver = true;
  }
}

// Draw function
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(function (segment) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(segment.x, segment.y, GRID_SIZE - 1, GRID_SIZE - 1);
  });

  // Draw food
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x, food.y, GRID_SIZE - 1, GRID_SIZE - 1);

  // Draw Scores
  ctx.fillStyle = '#000000';
  ctx.font = '12px Arial';
  ctx.fillText('Score: ' + currentScore, 5, 15);
  ctx.fillText('High score: ' + highScore, 5, 30);
}

// Update high score function
function updateHighScore() {
  if (currentScore > highScore) {
    highScore = currentScore;
  }
}

// Event handler for keyboard input
function handleKeyPress(event) {
  const keyPressed = event.key;

  if (keyPressed === 'ArrowUp' && lastMove !== 'down') {
    dx = 0;
    dy = -GRID_SIZE;
    lastMove = 'up';
  }

  if (keyPressed === 'ArrowDown' && lastMove !== 'up') {
    dx = 0;
    dy = GRID_SIZE;
    lastMove = 'down';
  }

  if (keyPressed === 'ArrowLeft' && lastMove !== 'right') {
    dx = -GRID_SIZE;
    dy = 0;
    lastMove = 'left';
  }

  if (keyPressed === 'ArrowRight' && lastMove !== 'left') {
    dx = GRID_SIZE;
    dy = 0;
    lastMove = 'right';
  }
}

// Collision detection
function isGameOver() {
  const head = snake[0];

  // Check collision with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  // Check collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}