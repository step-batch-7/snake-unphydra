const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const handleKeyPress = snake => {
  const key = event.key;
  switch (key) {
    case 'ArrowLeft':
      snake.turn('turnLeft');
      break;
    case 'ArrowRight':
      snake.turn('turnRight');
      break;
    case 'ArrowUp':
      snake.turn('turnUp');
      break;
    case 'ArrowDown':
      snake.turn('turnDown');
      break;
  }
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

class Game {
  constructor(snake, ghostSnake) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
  }
  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }
}

const main = function() {
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

  const game = new Game(snake, ghostSnake);

  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);

  setInterval(() => {
    game.moveSnake();
    moveAndDrawSnake(game.snake);
    moveAndDrawSnake(game.ghostSnake);
  }, 200);

  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 75) {
      game.ghostSnake.turn('turnLeft');
    }

    if (x > 50 && x < 75) {
      game.ghostSnake.turn('turnUp');
    }

    if (x > 25 && x < 50) {
      game.ghostSnake.turn('turnRight');
    }

    if (x < 25) {
      game.ghostSnake.turn('turnDown');
    }
  }, 500);
};
