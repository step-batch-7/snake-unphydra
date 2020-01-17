const isHeadOnFood = function(head, food) {
  return head[0] == food[0] && head[1] == food[1];
};

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  turn(direction) {
    this.direction[direction]();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  isOnFood(food) {
    const head = this.positions.slice(-1)[0];
    return isHeadOnFood(head, food);
  }

  grow(times) {
    for (let index = 0; index < times; index++) {
      this.positions.unshift(this.previousTail);
    }
  }

  get status() {
    return {
      type: this.type,
      position: this.positions,
      previousTail: this.previousTail
    };
  }

  wrap() {
    this.positions = this.positions.map(position => {
      const colNo = (position[0] + 100) % 100;
      const rowNo = (position[1] + 60) % 60;
      return [colNo, rowNo];
    });
  }
}
