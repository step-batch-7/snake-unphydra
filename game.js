class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
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
    const food = {
      position: this.food.location,
      type: this.food.specialty
    };
    return { snakes, food };
  }
}
