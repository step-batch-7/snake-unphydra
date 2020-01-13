const getRandomPosition = function() {
  const colNo = Math.round(Math.random() * 99);
  const rowNo = Math.round(Math.random() * 59);
  return [colNo, rowNo];
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = [0, 0];
  }

  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }

  turn(snake, direction) {
    this[snake].turn(direction);
  }

  update() {
    const foodPosition = this.food.location;
    if (this.snake.isOnFood(foodPosition)) {
      this.snake.increase(foodPosition);
      this.previousFood = foodPosition;
      const position = getRandomPosition();
      this.food = new Food(position, 'normal');
    }
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
      type: this.food.specialty,
      position: this.food.location,
      previousFood: this.previousFood
    };
    return { snakes, food };
  }
}
