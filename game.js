const getRandomPosition = function() {
  const colNo = Math.round(Math.random() * (NUM_OF_COLS - 1));
  const rowNo = Math.round(Math.random() * (NUM_OF_ROWS - 1));
  return [colNo, rowNo];
};

class Game {
  constructor(snake, ghostSnake, food, score, timer) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = new Food([0, 0], 'normal', 1, 1);
    this.normalFoodCount = 1;
    this.score = score;
    this.timer = timer;
    this.timerId = this.timer.startTime();
  }

  moveSnake() {
    this.snake.move();
    // this.snake.wrap();
    this.ghostSnake.move();
    this.ghostSnake.wrap();
  }

  turn(snake, direction) {
    this[snake].turn(direction);
  }

  isOver() {
    return (
      (this.timer.isTimeFinish() || this.snake.hasTouchedWall()) &&
      (clearInterval(this.timerId) || true)
    );
  }

  update() {
    if (this.isOver()) {
      clearInterval(this.timerId);
    }
    const foodPosition = this.food.location;
    if (this.snake.isOnFood(foodPosition)) {
      this.normalFoodCount++;
      this.score.increaseScore(this.food.value);
      this.snake.grow(this.food.growPower);
      this.previousFood = this.food;
      const position = getRandomPosition();
      this.food = new Food(position, 'normal', 1, 1);
      if (!(this.normalFoodCount % 5)) {
        this.food = new Food(position, 'special', 5, 2);
      }
    }
  }

  get status() {
    const snakes = [this.snake.status, this.ghostSnake.status];
    const food = {
      ...this.food.status,
      previousFood: { ...this.previousFood.status }
    };
    const score = this.score.currentScore;
    const time = this.timer.remainingTime;
    return { snakes, food, score, time };
  }
}
