const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const elem = canvas;

class snakepart {
  constructor(x, y) {
    this.y = y;
    this.x = x;
  }
}

let speed = 6;
let darkMode = false;
let Whaite = "white";
let Blaick = "black";
let pausew = false;

let tilecount = 20;
let tilesize = canvas.width / tilecount - 2;
let headx = 10;
let heady = 10;
const snakeParts = [];
let tailLength = 0;
let snakeSpeed = 1;
let xvelocity = 0;
let yvelocity = 0;

let appleY = Math.floor(Math.random() * tilecount);
let appleX = Math.floor(Math.random() * tilecount);

let score = 0;
let gameover = false;

//reset variable function

//game loop
function drawGame() {
  checkGameOver();
  document.body.addEventListener("keydown", varReset);
  if (gameover === true || pausew === true) {
    return;
  }

  clearScreen();
  changeSnakePosition();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

//functions

function varReset(code) {
  pausew = false;
  if (code.keyCode === 82) {
    speed = 6;
    tilecount = 20;
    tilesize = canvas.width / tilecount - 2;
    headx = 10;
    heady = 10;
    tailLength = 0;
    snakeSpeed = 1;
    xvelocity = 0;
    yvelocity = 0;
    appleX = Math.floor(Math.random() * tilecount);
    appleY = Math.floor(Math.random() * tilecount);
    score = 0;
    gameover = false;
    drawGame();
  }
  if (code.keyCode === 80) {
    if (pausew === false) {
      pausew = true;
      drawGame();
      return;
    }
    if (pausew === true) {
      pausew = false;
      drawGame();
    }
  }
}

function checkGameOver() {
  if (headx === -1) {
    gameover = true;
  }
  if (heady === -1) {
    gameover = true;
  }
  if (headx === 20) {
    gameover = true;
  }
  if (heady === 20) {
    gameover = true;
  }

  if (gameover === true) {
    ctx.fillStyle = Whaite;
    ctx.font = "50px Veranda";
    ctx.fillText("Gameover, press R", canvas.width / 30, canvas.height / 2);
  }
}

function clearScreen() {
  ctx.fillStyle = Blaick;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
  ctx.fillStyle = Whaite;
  ctx.font = "25px Veranda";
  ctx.fillText("Apples eaten: " + score, canvas.width - 300, 25);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tilecount, part.y * tilecount, tilesize, tilesize);
    if (part.x === headx && part.y === heady) {
      gameover = true;
    }
  }
  snakeParts.push(new snakepart(headx, heady));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headx * tilecount, heady * tilecount, tilesize, tilesize);
}

function changeSnakePosition() {
  headx = headx + xvelocity;
  heady = heady + yvelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tilecount, appleY * tilecount, tilesize, tilesize);
}

function playsound() {
  document.getElementById("gulp").pause();
  document.getElementById("gulp").play();
}

function checkAppleCollision() {
  if (appleX === headx && appleY === heady) {
    appleX = Math.floor(Math.random() * tilecount);
    appleY = Math.floor(Math.random() * tilecount);
    tailLength++;
    score++;
    playsound();
  }
}

function request() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

document.getElementById("btn").onclick = function switchMode() {
  //if light mode switch to dark
  if (Whaite === "white" && Blaick === "black") {
    Whaite = "black";
    Blaick = "white";
    document.head.innerHTML =
      "<title>Snake game v1.5 - dark</title><style>body {margin: 0px;padding: 0px;display: flex;flex-direction: column;justify-content: center;align-items: center;background-color: black;} canvas {box-shadow: white 20px 20px 50px; border: 20px, ridge, white;} h1{color:white;} h2{color:white;} p{color:white;}</style>";
    return;
  }
  //if dark mode switch to light
  if (Whaite === "black" && Blaick === "white") {
    Whaite = "white";
    Blaick = "black";
    document.head.innerHTML =
      "<title>Snake game v1.5 - light</title><style>body {margin: 0px;padding: 0px;display: flex;flex-direction: column;justify-content: center;align-items: center;background-color: white;} canvas {box-shadow: black 20px 20px 50px; border: 20px, ridge, black;} h1{color:black;} h2{color:black;} p{color:black;}</style>";
    return;
  }
};
// input
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode === 38 || event.keyCode === 87) {
    if (yvelocity === 1) return;
    yvelocity = -snakeSpeed;
    xvelocity = 0;
  }
  //down
  if (event.keyCode === 40 || event.keyCode === 83) {
    if (yvelocity === -1) return;
    yvelocity = snakeSpeed;
    xvelocity = 0;
  }
  //left
  if (event.keyCode === 37 || event.keyCode === 65) {
    if (xvelocity === 1) return;
    yvelocity = 0;
    xvelocity = -snakeSpeed;
  }
  //right
  if (event.keyCode === 39 || event.keyCode === 68) {
    if (xvelocity === -1) return;
    yvelocity = 0;
    xvelocity = snakeSpeed;
  }
}

drawGame();
