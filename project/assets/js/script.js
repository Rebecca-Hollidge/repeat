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



let mushSprite = new Image();
mushSprite.src = "img/mush.png";

let groundSprite = new Image ();
groundSprite.src = "img/ground.png";

let startSprite = new Image();
startSprite.src  = "img/start.png";

let gomush = new GameObject(mushSprite, 100, 100, 100, 100);

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
    
    
   context.drawImage(gomush.spritesheet, gomush.x, gomush.y, gomush.width, gomush.height)

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
            
            case "a": // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case "w": // Up Arrow
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 'd': // Right Arrow
                gamerInput = new GamerInput("Right");
                break; //Right key
            case "s": // Down Arrow
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

function animate(posX, posY, spritesheet) {
    if (gamerInput.action != "None"){
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= walkLoop.length) {
                currentLoopIndex = 0;
            }
        }      
    }
    else{
        currentLoopIndex = 0;
    }
    if (spritesheet === gomush.spritesheet)
    {
        drawFrame(spritesheet, otherWalkLoop[currentLoopIndex], currentDirection, posX, posY);
    }
    else
    {
        drawFrame(spritesheet, walkLoop[currentLoopIndex], currentDirection, posX, posY);
    }
}

function NPCAnimate(posX, posY, spritesheet)
{
        otherFrameCount++;
        if (otherFrameCount >= frameLimit) {
            otherFrameCount = 0;
            otherCurrentLoopIndex++;
            if (otherCurrentLoopIndex >= walkLoop.length) {
                otherCurrentLoopIndex = 0;
            }
        }      
    if (spritesheet === goexitSprite.spritesheet)
    {
        context.drawImage(spritesheet,
            walkLoop[otherCurrentLoopIndex] * exitWidth, currentDirection * exitHeight, exitWidth, exitHeight,
            posX, posY, scaledWidth * 2, scaledHeight * 2);
    }   
    else
    {
        drawFrame(spritesheet, walkLoop[otherCurrentLoopIndex], currentDirection, posX, posY);
    }
}
function update(){


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
