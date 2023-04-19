// Game variables
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');
const gridSize = 16;
const snakeSpeed = 100;

// Snake and food objects
let snake = [
    { x: gridSize * 10, y: gridSize * 10 }
];

let food = {
    x: gridSize * Math.floor(Math.random() * gridSize),
    y: gridSize * Math.floor(Math.random() * gridSize)
};

let dx = 0;
let dy = 0;
let lastMove = '';

// Main game loop
setInterval(function () {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#ffffff';
    snake.forEach(function (segment) {
        ctx.fillRect(segment.x, segment.y, gridSize - 1, gridSize - 1);
    });

    // Draw food
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x, food.y, gridSize - 1, gridSize - 1);

    // Update snake position
    let newX = snake[0].x + dx;
    let newY = snake[0].y + dy;

    // Collision detection
    if (newX === food.x && newY === food.y) {
        // Eat food
        food.x = gridSize * Math.floor(Math.random() * gridSize);
        food.y = gridSize * Math.floor(Math.random() * gridSize);
    } else {
        // Remove tail
        snake.pop();
    }

    // Check for game over
    if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height || collision(newX, newY)) {
       
        // Game over, reset the snake
        snake = [
            { x: gridSize * 10, y: gridSize * 10 }
        ];
        dx = 0;
        dy = 0;
    }

    // Add new head
    snake.unshift({ x: newX, y: newY });

    // Handle keyboard input
    document.onkeydown = function (e) {
        if (e.key === 'ArrowUp' && lastMove !== 'down') {
            dx = 0;
            dy = -gridSize;
            lastMove = 'up';
        } else if (e.key === 'ArrowDown' && lastMove !== 'up') {
            dx = 0;
            dy = gridSize;
            lastMove = 'down';
        } else if (e.key === 'ArrowLeft' && lastMove !== 'right') {
            dx = -gridSize;
            dy = 0;
            lastMove = 'left';
        } else if (e.key === 'ArrowRight' && lastMove !== 'left') {
            dx = gridSize;
            dy = 0;
            lastMove = 'right';
        }
    };

}, snakeSpeed);

// Collision detection
function collision(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
            return true;
        }
    }
    return false;
}
