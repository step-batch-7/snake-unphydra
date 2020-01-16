const EAST = 1;
const NORTH = 2;
const WEST = 3;
const SOUTH = 4;

const eraseTail = function(snakes) {
  snakes.forEach(snake => {
    const [colId, rowId] = snake.previousTail;
    const cell = getCell(colId, rowId);
    cell.classList.remove(snake.type);
  });
};

const drawSnakes = function(snakes) {
  snakes.forEach(snake => {
    const type = snake.type;
    snake.position.forEach(([colId, rowId]) => {
      const cell = getCell(colId, rowId);
      cell.classList.add(type);
    });
  });
};

const showSideBoard = function(value, id) {
  const box = document.getElementById(id);
  box.innerText = value;
};

const drawFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add(food.type);
};

const eraseFood = function(food) {
  const [colId, rowId] = food.previousFood.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove(food.previousFood.type);
  return;
};
const drawGameOnGrid = function(game) {
  const status = game.status;
  eraseTail(status.snakes);
  drawSnakes(status.snakes);
  eraseFood(status.food);
  drawFood(status.food);
  showSideBoard(status.score, 'scoreResult');
  showSideBoard(status.time, 'remainingTime');
};

const showGameOverBoard = function(game) {
  const score = game.status.score;
  const gameOverBoard = document.getElementById('gameOverBoard');
  const gameOverScore = document.getElementById('gameOverScore');
  const gameBody = document.getElementById('gameBody');
  gameBody.style.opacity = 0.1;
  gameOverBoard.style.marginTop = '0';
  gameOverScore.innerText = score;
};

const handleKeyPress = game => {
  const key = event.key;
  switch (key) {
    case 'ArrowLeft':
      game.turn('snake', 'turnLeft');
      break;
    case 'ArrowRight':
      game.turn('snake', 'turnRight');
      break;
    case 'ArrowUp':
      game.turn('snake', 'turnUp');
      break;
    case 'ArrowDown':
      game.turn('snake', 'turnDown');
      break;
  }
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const initializeGame = function() {
  const snake = new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );

  const ghostSnake = new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );

  const food = new Food([46, 25], 'normal', 1, 1);
  const score = new Score(0);
  const timer = new Timer(300);
  const game = new Game(snake, ghostSnake, food, score, timer);
  return game;
};

const main = function() {
  const game = initializeGame();

  attachEventListeners(game);
  createGrids();
  drawGameOnGrid(game);

  const movementId = setInterval(() => {
    if (game.isOver()) {
      showGameOverBoard(game);
      clearInterval(movementId);
    }
    game.moveSnake();
    game.update();
    drawGameOnGrid(game);
  }, 500);

  setInterval(() => {
    const direction = ['turnLeft', 'turnUp', 'turnRight', 'turnDown'];
    let x = Math.round(Math.random() * 3);
    game.turn('ghostSnake', direction[x]);
  }, 500);
};
