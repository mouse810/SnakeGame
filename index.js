// define Html element
const board = document.getElementById('game-board')

// Define game variables
let snake = [{ x: 10, x: 10 }]


// Draw game Map ,Snake ,food
function draw() {
     board.innerHTML = '';
     drawSnake()
}

// Draw Snake
function drawSnake() {
     snake.forEach((segment) => {
          const snakeElement = createGameElement('div', 'snake')
          setPosition(snakeElement, segment)
     })
}

// Create a snake And food cube/div
function createGameElement(tag, className) {
     const element = document.createElement(tag)
     element.className = className
     return element
}

//Set Position of Snake and Food
function setPosition(element, Position) {
     element.style.gridColumn = Position.x;
     element.style.gridRow = Position.y;
}

// 




//





//




// 