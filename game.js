// DOM elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Constants
const gridSize = 20;
const canvasSize = 400;
const initialSnakeSize = 3;

// Game state
let snake = [];
let direction = "right";
let fruit = {};

// Initialize the game
function init() {
    createSnake();
    createFruit();
    setInterval(gameLoop, 100); // Adjust the interval for the game loop as needed
}

// Create the initial snake
function createSnake() {
    for (let i = 0; i < initialSnakeSize; i++) {
        snake.push({ x: i, y: 0 });
    }
}

// Create a random fruit on the canvas
function createFruit() {
    fruit = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)),
        y: Math.floor(Math.random() * (canvasSize / gridSize))
    };
    drawFruit();
}

// Game loop
function gameLoop() {
    moveSnake();
    checkCollision();
    draw();
}

// Handle arrow key controls
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
});

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    // Check for fruit consumption
    if (head.x === fruit.x && head.y === fruit.y) {
        createFruit();
    } else {
        snake.pop(); // Remove the last segment if no fruit is consumed
    }
}

// Check for collisions (with itself, walls, and fruit)
function checkCollision() {
    const head = snake[0];

    // Check collision with walls
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize / gridSize || head.y >= canvasSize / gridSize) {
        endGame();
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// Draw the game elements on the canvas
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    drawSnake();
    drawFruit();
}

// Draw the snake on the canvas
function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "#00ff00"; // Snake color (green)
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Draw the fruit on the canvas
function drawFruit() {
    ctx.fillStyle = "#ff0000"; // Fruit color (red)
    ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);
}

// End the game
function endGame() {
    alert("Game Over!");
    // You can add additional logic for game over handling, such as resetting the game.
}

// Start the game
init();
