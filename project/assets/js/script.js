const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");


const scale = 2;
const width = 64;
const height = 64;
const scaledWidth = scale * width;
const scaledHeight = scale * height;


let currentLoopIndex = 0;
let otherCurrentLoopIndex = 0;
let frameCount = 0;
let otherFrameCount = 0;
let currentDirection = 0;
let speed = 4;



let musSprite = new Image();
mushSprite.src = "assets/img/mush.png";

let groundSprite = new Image ();
groundSprite.src = "assets/img/ground.png";

let startSprite = new Image();
startSprite.src  = "assets/img/start.png";

let gomush = new GameObject(mushSprite, 0, 0, 64, 64);

function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mvmtDirection = "None";
}

function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    context.drawImage(image,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // context.drawImage(testImg, 0,0);
}

function draw() {
    console.log("Draw is called!");
    context.clearRect(0,0, canvas.width, canvas.height);
    
    
   context.drawImage(mushSprite, 0,0,400,400)

    //context.drawImage(tree,400,400,0,0);
   //context.drawimage(tree, 0, 0, 200, 200);
}

//movement input


function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input
 
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    //console.log("Keycode: " + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                break; //Down key
            case 32:
                speed = 4;
                break;
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None");
        speed = 2;
        
    }

}




function gameloop() {
    //calls the setup function on first itteration of loop [Note:bool variable method used to allow for toggeling setupComplete to false and triggering setup() for starting a new level of the game]
    /*let setupComplete = false;

    if(setupComplete == false){
        setupComplete = setup(setupComplete);
    }
    */
   
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);
window.requestAnimationFrame(gameloop);
