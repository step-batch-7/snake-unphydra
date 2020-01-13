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
