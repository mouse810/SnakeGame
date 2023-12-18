// define Html element
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let highScore = 0;
let gameSeedDelay = 200;
let gameStarted = false;


// Draw game Map ,Snake ,food
function draw() {
     board.innerHTML = '';
     drawSnake();
     drawFood();
     updateScore();
}

// Draw Snake
function drawSnake() {
     snake.forEach((segment) => {
          const snakeElement = createGameElement('div', 'snake');
          setPosition(snakeElement, segment);
          board.appendChild(snakeElement);
     })
}

// Create a snake And food cube/div
function createGameElement(tag, className) {
     const element = document.createElement(tag);
     element.className = className;
     return element;
}

//Set Position of Snake and Food
function setPosition(element, Position) {
     element.style.gridColumn = Position.x;
     element.style.gridRow = Position.y;
}
// Testing Draw Function
// draw()

// draw food Function 
function drawFood() {
     if (gameStarted) {
          const foodElement = createGameElement('div', 'food');
          setPosition(foodElement, food);
          board.appendChild(foodElement);
     }
}


// Generate Food
function generateFood() {
     const x = Math.floor(Math.random() * gridSize) + 1;
     const y = Math.floor(Math.random() * gridSize) + 1;
     return { x, y };
}

// Moving The Snake 
function move() {
     const head = { ...snake[0] }
     switch (direction) {
          case 'up':
               head.y--;
               break;
          case 'down':
               head.y++;
               break;
          case 'left':
               head.x--;
               break;
          case 'right':
               head.x++;
               break;
     }
     snake.unshift(head);

     // snake.pop();

     // Snake Length
     if (head.x === food.x && head.y == food.y) {
          food = generateFood();
          increaseSpeed();
          clearInterval(); // clear past intervals
          gameInterval = setInterval(() => {
               move();
               checkCollision();
               draw();
          }, gameSeedDelay)
     } else {
          snake.pop()
     }
}
// Test moving

// setInterval(() => {
//      move();
//      draw();
// }, gameDelay);

// Game Start
function startGame() {
     gameStarted = true; // keep track of running games
     instructionText.style.display = 'none';
     logo.style.display = 'none';
     gameInterval = setInterval(() => {
          move();
          draw();
          checkCollision();
     }, gameSeedDelay)
}

// keyPress event listener
function handelKeyPress(event) {
     if ((!gameStarted && event.code === 'space') ||
          (!gameStarted && event.key === ' ')
     ) {
          startGame();
     } else {
          switch (event.key) {
               case 'ArrowUp':
                    direction = 'up';
                    break;
               case 'ArrowDown':
                    direction = 'down';
                    break;
               case 'ArrowRight':
                    direction = 'right';
                    break;
               case 'ArrowLeft':
                    direction = 'left';
                    break;
          }

     }
}
document.addEventListener('keydown', handelKeyPress);

// Increase Speed
function increaseSpeed() {
     if (gameSeedDelay > 150) {
          gameSeedDelay -= 5;
     } else if (gameSeedDelay > 100) {
          gameSeedDelay -= 3;
     } else if (gameSeedDelay > 50) {
          gameSeedDelay -= 2;
     } else if (gameSeedDelay > 5) {
          gameSeedDelay -= 1
     }
}

function checkCollision() {
     const head = snake[0];

     if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
          resetGame();
     }

     for (let i = 1; i < snake.length; i++) {
          if (head.x === snake[i].x && head.y === snake[i].y) {
               resetGame();
          }
     }
}

function resetGame() {
     snake = [{ x: 10, y: 10 }];
     food = generateFood();
     direction = 'right';
     gameSeedDelay = 200;
     updateScore();
     updateHighScore();
     stopGame();
}

function updateScore() {
     const currentScore = snake.length - 1;
     score.textContent = currentScore.toString().padStart(3, '0');

}

function stopGame() {
     clearInterval(gameInterval);
     gameStarted = false;
     instructionText.style.display = 'block';
     logo.style.display = 'block';
};

function updateHighScore() {
     const currentScore = snake.lastIndexOf - 1;
     if (currentScore > highScore) {
          highScore = currentScore;
          highScoreText.textContent = highScore.toString().padStart(3, '0');
     }
     highScoreText.style.display = 'block';
};