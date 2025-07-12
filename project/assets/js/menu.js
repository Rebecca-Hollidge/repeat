const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");



let startSprite = new Image();
startSprite.src  = "img/start.png";


let gostart = new GameObject(startSprite, 100, 100, 200, 200);