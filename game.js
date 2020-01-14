const getRandomPosition = function() {
  const colNo = Math.round(Math.random() * (NUM_OF_COLS - 1));
  const rowNo = Math.round(Math.random() * (NUM_OF_ROWS - 1));
  return [colNo, rowNo];
};

class Game {
  constructor(snake, ghostSnake, food, score) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = new Food([0, 0], 'normal', 1);
    this.normalFoodCount = 1;
    this.score = score;
  }

  moveSnake() {
    this.snake.move();
    // this.ghostSnake.move();
  }

  turn(snake, direction) {
    this[snake].turn(direction);
  }

  update() {
    const foodPosition = this.food.location;
    if (this.snake.isOnFood(foodPosition)) {
      this.normalFoodCount++;
      this.score.increaseScore(this.food.value);
      this.snake.increase(foodPosition);
      this.previousFood = this.food;
      const position = getRandomPosition();
      let type = 'normal';
      let value = 1;
      if (!(this.normalFoodCount % 5)) {
        type = 'special';
        value = 5;
      }
      this.food = new Food(position, type, value);
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
      previousFood: {
        position: this.previousFood.location,
        type: this.previousFood.specialty
      }
    };

    const score = this.score.currentScore;
    return { snakes, food, score };
  }
}
