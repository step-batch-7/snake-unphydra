const EAST = 1;
const NORTH = 2;
const WEST = 3;
const SOUTH = 4;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = this.heading == 1 ? 1 : 3;
  }

  turnRight() {
    this.heading = this.heading == 3 ? 3 : 1;
  }

  turnUp() {
    this.heading = this.heading == 4 ? 4 : 2;
  }

  turnDown() {
    this.heading = this.heading == 2 ? 2 : 4;
  }
}
