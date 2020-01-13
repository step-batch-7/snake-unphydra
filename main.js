const eraseTail = function(snakes) {
  snakes.forEach(snake => {
    let [colId, rowId] = snake.previousTail;
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

const drawOnGrid = function(game) {
  const status = game.status;
  drawSnakes(status.snakes);
  eraseTail(status.snakes);
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

class Game {
  constructor(snake, ghostSnake) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
  }
  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }

  turn(snake, direction) {
    this[snake].turn(direction);
  }

  get status() {
    const snakes = [
      {
        type: this.snake.species,
        position: this.snake.location,
        previousTail: this.snake.movedTail
      },
      {
        type: this.ghostSnake.species,
        position: this.ghostSnake.location,
        previousTail: this.ghostSnake.movedTail
      }
    ];
    // const food = {position:this.food.location}
    return { snakes };
  }
}

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

  const game = new Game(snake, ghostSnake);
  return game;
};

const main = function() {
  const game = initializeGame();

  attachEventListeners(game);
  createGrids();
  drawOnGrid(game);

  setInterval(() => {
    game.moveSnake();
    drawOnGrid(game);
  }, 200);

  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 75) {
      game.turn('ghostSnake', 'turnLeft');
    }

    if (x > 50 && x < 75) {
      game.turn('ghostSnake', 'turnUp');
    }

    if (x > 25 && x < 50) {
      game.turn('ghostSnake', 'turnRight');
    }

    if (x < 25) {
      game.turn('ghostSnake', 'turnDown');
    }
  }, 500);
};
