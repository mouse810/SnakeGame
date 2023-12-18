// define Html element
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSeedDelay = 200;
let gameStarted = false;


// Draw game Map ,Snake ,food
function draw() {
     board.innerHTML = '';
     drawSnake();
     drawFood()
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
     const foodElement = createGameElement('div', 'food');
     setPosition(foodElement, food);
     board.appendChild(foodElement);
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

     snake.pop();
}
// Snake Length
if (head.x === food.x && head.y == food.y) {
     food = generateFood();
     clearInterval();
     gameInterval = setInterval(() => {
          move()
          draw()
     }, gameDelay)
} else {
     snake.pop()
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
     gameInterval(() => {
          move();
          draw();
          // checkCollision();
     }, gameSeedDelay)
}

// keyPress event listener
function handelKeyPress(event) {
     if ((!gameStarted && event.code === 'space') ||
          (!gameStarted && event.key === '')
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