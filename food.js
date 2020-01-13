class Food {
  constructor(positions, type) {
    this.positions = positions.slice();
    this.type = type;
  }
  get location() {
    return this.positions.slice();
  }

  get specialty() {
    return this.type;
  }
}
