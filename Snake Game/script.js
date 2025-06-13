// Game constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore ? parseInt(hiscore) : 0;

// Create score boxes dynamically if not in HTML
let scoreBox = document.getElementById("scoreBox");
let hiscoreBox = document.getElementById("hiscoreBox");

// If missing, create them (optional fallback)
if (!scoreBox) {
  scoreBox = document.createElement("div");
  scoreBox.id = "scoreBox";
  document.body.prepend(scoreBox);
}
if (!hiscoreBox) {
  hiscoreBox = document.createElement("div");
  hiscoreBox.id = "hiscoreBox";
  document.body.prepend(hiscoreBox);
}

scoreBox.innerHTML = "Score: 0";
hiscoreBox.innerHTML = "High Score: " + hiscoreval;

// Game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

//after snake cooides
function isCollide(sarr) {
  for (let i = 1; i < sarr.length; i++) {
    //if snake collides with itself
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  //if snake collides with the walls
  if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over... Press okay to start the game again.");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", hiscoreval);
      hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }

    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

    let a = 2, b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  let board = document.getElementById("board");
  board.innerHTML = "";

  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add(index === 0 ? 'head' : 'snake');
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
