


let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let character_image = new Image();
character_image.src = "character.png";
character_image.onload = draw;

let player_position_x = 0;


function draw() {
    context.clearRect(0, 0, 1200, 600) //is om de vorrige afbeelding te laten veranderen// // misschien slim om de image een rechte lijn te laten bewegen
    context.drawImage(character_image, player_position_x, 100, 300, 150)
    player_position_x += 1;

}

setInterval(draw, 20);




