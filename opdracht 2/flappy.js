// canvas related variables
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// player related variables
var player1 = {x: 150, y: 250, width: 20, height: 20, yVelocity: 0};
var player2 = {x: 250, y: 250, width: 20, height: 20, yVelocity: 0};

// game state variables
var obstacles = [];
var score1 = 0;
var score2 = 0;
var gameRunning = true;
var obstacleCount = 1;
var specialObstacles = [];
var specialObstacleCount = 1;
var difficulty = 1;
var obstacleInterval;
var specialObstacleInterval;
var difficultyInterval;
var hond = new Image();
hond.src = "hond.png";
var kat = new Image();
kat.src = "kat.png";
var blik = new Image();
blik.src = "blik.png";
var vergif = new Image();
vergif.src = "vergif.png";



// zorgt ervoor dat het spel naar toetsaaanslagen luistert 
document.addEventListener("keydown", keyPressed);

// welke toetsen doen wat 
function keyPressed(event) {
    if (event.code === "KeyS" && gameRunning) {
        player1.yVelocity = -3;
    } else if (event.code === "KeyK" && gameRunning) {
        player2.yVelocity = -3;
    }
}

// main gameloop (wat moet er uitgevoerd worden tijdens het spel)
function gameLoop() {
    if(gameRunning){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // display player1 score on canvas
        ctx.font = "20px, https://fonts.googleapis.com/css2?family=Righteous&display=swap";
        ctx.fillText("Player 1 Score: " + score1, 10, 30);

        // display player2 score on canvas
        ctx.font = "20px Arial";
        ctx.fillText("Player 2 Score: " + score2, 10, 60);
        
        
        //tekent de hond en de kat op het canvas
        ctx.drawImage(hond, player1.x, player1.y, player1.width, player1.height);
        ctx.drawImage(kat, player2.x, player2.y, player2.width, player2.height);
        player1.y += player1.yVelocity;
        player2.y += player2.yVelocity;

        player1.yVelocity += 0.2;
        player2.yVelocity += 0.2;

        for (var i = 0; i < obstacles.length; i++) {
            ctx.drawImage(vergif,obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
            obstacles[i].x -= obstacles[i].speed;
            if(score1 >= 100 || score2 >= 100) {
                gameRunning = false;
                clearInterval(obstacleInterval);
                clearInterval(specialObstacleInterval);
                clearInterval(difficultyInterval);
                if(score1 >= 100 && score2 >= 100) {
                    alert("It's a tie!");
                } else if(score1 >= 100) {
                    alert("Player 1 wins!");
                }else if(score2 >= 100) {
                    alert("Player 2 wins!");
                }
                var playAgain = confirm("Play again?");
                if(playAgain) {
                    resetGame();
                }
            }

            if (checkCollision(player1,obstacles[i]) || checkCollision(player2, obstacles[i])) {
                gameRunning = false;
                clearInterval(obstacleInterval);
                clearInterval(specialObstacleInterval);
                clearInterval(difficultyInterval);
                // laat de score zien
                ctx.fillText("Player 1 Score: " + score1, 10, 30);
                ctx.fillText("Player 2 Score: " + score2, 10, 60);
                if(score1 >= 100 && score2 >= 100) {
                    alert("It's a tie!");
                } else if(score1 >= 100) {
                    alert("Cat wins!");
                }else if(score2 >= 100) {
                    alert("Dog wins!");
                } else {
                    alert("Game Over!");
                }
                var playAgain = confirm("Play again?");
                if(playAgain) {
                    resetGame();
                }
                return;
            } else if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
            }
        }    for (var i = 0; i < specialObstacles.length; i++) {
            ctx.drawImage(blik,specialObstacles[i].x, specialObstacles[i].y, specialObstacles[i].width, specialObstacles[i].height);
            specialObstacles[i].x -= specialObstacles[i].speed;

            if (checkCollision(player1, specialObstacles[i])) {
                score1 += specialObstacles[i].points;
                specialObstacles.splice(i, 1);
            } else if (checkCollision(player2, specialObstacles[i])) {
                score2 += specialObstacles[i].points;
                specialObstacles.splice(i, 1);
            } else if (specialObstacles[i].x + specialObstacles[i].width < 0) {
                specialObstacles.splice(i, 1);
            }
        }    //kijkt of de speler zich niet buiten het canvas verplaatst
        if(player1.x < 0 || player1.x + player1.width > canvas.width || player1.y < 0 || player1.y + player1.height > canvas.height
            || player2.x < 0 || player2.x + player2.width > canvas.width || player2.y < 0 || player2.y + player2.height > canvas.height) {
            gameRunning = false;
            clearInterval(obstacleInterval);
            clearInterval(specialObstacleInterval);
            clearInterval(difficultyInterval);
            alert("Game over!");
            var playAgain = confirm("Play again?");
            if(playAgain) {
                resetGame();
            }
            return;
        }
        requestAnimationFrame(gameLoop);
    }}

function checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y;
}
//afmetingen van de obstacles
function createObstacle(){
    for(var i = 0; i < obstacleCount; i++){
        var randomX = canvas.width;
        var randomY = Math.random() * canvas.height;
        obstacles.push({x: randomX, y: randomY, width: 15, height: 15, speed: difficulty});
    }
}

function createSpecialObstacle(){
    for(var i = 0; i < specialObstacleCount; i++) {
        var randomX = canvas.width;
        var randomY = Math.random() * canvas.height;
        specialObstacles.push({x: randomX, y: randomY, width: 20, height: 20, points: 10, speed: difficulty});
    }
}


function increaseDifficulty() {
    difficulty += 0.5;
    obstacleCount += 1;
    specialObstacleCount += 1;
}

function resetGame() {
    player1 = {x: 150, y: 250, width: 20, height: 20, yVelocity: 0};
    player2 = {x: 250, y: 250, width: 20, height: 20, yVelocity: 0};
    obstacles = [];
    score1 = 0;
    score2 = 0;
    gameRunning = true;
    obstacleCount = 1;
    specialObstacles = [];
    specialObstacleCount = 1;
    difficulty = 1;
    obstacleInterval = setInterval(createObstacle, 1000);
    specialObstacleInterval = setInterval(createSpecialObstacle, 3000);
    difficultyInterval = setInterval(increaseDifficulty, 5000);
    gameLoop();
}

var obstacleInterval = setInterval(createObstacle, 1000);
var specialObstacleInterval = setInterval(createSpecialObstacle, 3000);
var difficultyInterval = setInterval(increaseDifficulty, 7500);

gameLoop();



