//Snelheid van de achtergrond 
let snelheid = 3; 

//Dit is gewoon gravity dus we kunnen het zwarder maken etc. 
let gravity = 0.3;

// Dit is voor de Flappy Element. Flappy Element is de vogel/poppetje btw. 
let Flappy = document.querySelector('.Flappy');

//Flappy de properties etc. 
let Flappy_props = Flappy.getBoundingClientRect();
let background = document.querySelector('.background') .getBoundingClientRect(); 

// Dit is voor de punten etc. 
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_titel = document.querySelector('.score_titel');

// De status van de game op start zetten. 
let status_game = 'Start';
// Dit is voor wanneer iets geklikt wordt.
document.addEventListener('keydown', (e) => {

    // Dit is hoe we de spel kunnen laten beginnen als het geklikt is. 
    if (e.key == 'Enter' &&
    status_game != 'Play'){
        document.querySelectorAll('.pijp_sprite')
        .forEach((e) => {
            e.remove();
        });
        Flappy.style.top = '40vh'; 
        status_game = 'Play';
        message.innerHTML = ''; 
        score_titel.innerHTML = 'Score:';
        score_val.innerHTML = '0';
        play();
    }
});

function play(){
     function move(){
        
        // Dit laat ons weten als je dood bent gegaan. 
        if (status_game != 'Play') return;
        let pijp_sprite = document.querySelectorAll('.pijp_sprite');
        pijp_sprite.forEach((element) => {
            
            // Dit is voor al de pijpen/obstakels etc. 
            let pijp_sprite_props = element.getBoundingClientRect();
            Flappy_props = Flappy.getBoundingClientRect(); 

            //Dit verwijderd alle pijpen en slaat de progressie op van de speler soortvan. 
            if (pijp_sprite_props.right <= 0){
                element.remove(); 
            } else {
                
                // wanneer de poppetje tegen de obstakel tegen komt. 
                if (
                    Flappy_props.left < pijp_sprite_props.left + 
                    pijp_sprite_props.width &&
                    Flappy_props.left + 
                    Flappy_props.width > pijp_sprite_props.left &&
                    Flappy_props.top < pijp_sprite_props.top +
                    pijp_sprite_props.height && 
                    Flappy_props.top +
                    Flappy_props.height > pijp_sprite_props.top
                ){
                    //Dit veranderd weer de staat van de game en beeindigd het als obstakel geraakt is.
                    status_game = 'End';
                    message.innerHTML= 'Press enter to restart';
                    message.style.left = '28vw'; 
                    return;
                } else{
                    
                    //Geeft een +1 als Flappy/pop de obstakel dodged 
                    if(
                        pijp_sprite_props.right < Flappy_props.left &&
                        pijp_sprite_props.right +
                        snelheid >= Flappy_props.left &&
                        element.increase_score == '1'
                    ) {
                        score_val.innerHTML =+ score_val.innerHTML + 1; 
                    }
                    element.style.left = pijp_sprite_props.left - snelheid + 'px'
                }
            }

        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    
    let Flappy_dy = 0;
    function apply_gravity(){
        if (status_game != 'Play') return;
        Flappy_dy = Flappy_dy + gravity; 
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp'|| e.key == ' ') {
                Flappy_dy = -6.6
            }
        });
       
        //Detecteert als Flappy/pop tegen iets aan bots aan de boven of onderkant van de window. 
        if (Flappy_props.top <= 0 || bird_props.bottom >= background.bottom) {
            status_game = 'End';
            message.innerHTML = 'Click enter to try again';
            message.style.left = '28vw'
            return;
        }
        Flappy.style.top = Flappy_props.top + Flappy_dy + 'px';
        Flappy_props = Flappy.getBoundingClientRect();
        requestAnimationFrame(apply_gravity); 
    }
    requestAnimationFrame(apply_gravity);

    let pijp_seperatie = 0; 

    // De afstand tussen twee obstakels etc. 
    let pijp_ruimte = 35; 
    function create_pipe(){
        if (status_game !='Play') return;

        //Maakt nieuwe obstakels na een bepaalde afstand. 
        if (pijp_seperatie > 150){
            pijp_seperatie = 0

            let pijp_pos = Math.floor(Math.random() * 43) + 8; 
            let pijp_sprite_inv = document.createElement('div');
            pijp_sprite_inv.className = 'pijp_sprite';
            pijp_sprite_inv.style.top = pijp_pos - 70 + 'vh';
            pijp_sprite_inv.style.left = '100vw';

            document.body.appendChild(pijp_sprite_inv);
            let pijp_sprite = document.createElement('div');
            pijp_sprite.className = 'pijp_sprite';
            pijp_sprite.style.top = pijp_pos + pijp_ruimte + 'vh'; 
            pijp_sprite.style.left = '100vw'; 
            pijp_sprite.increase_score = '1'; 

            document.body.appendChild(pijp_sprite);
        }
        pijp_seperatie++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}