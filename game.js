// Initialize game variables and canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var birdY = 50;
var birdVelocity = 0;
var gravity = 0.2;

// Game loop
function gameLoop() {
// Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Update bird position
    birdVelocity += gravity;
    birdY += birdVelocity;

// Draw bird
    ctx.fillStyle = "black";
    ctx.fillRect(50, birdY, 20, 20);

// Draw pipes
    ctx.fillStyle = "black";
    ctx.fillRect(500, 0, 70, 200);
    ctx.fillRect(500, 500, 70, 200);

// Check for collisions
    if(birdY > canvas.height || birdY < 0) {
        console.log("Game over!");
    }

// Repeat game loop
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();