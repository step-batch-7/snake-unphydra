class Food {
  constructor(positions, type, credit) {
    this.positions = positions.slice();
    this.type = type;
    this.credit = credit;
  }
  get location() {
    return this.positions.slice();
  }

  get specialty() {
    return this.type;
  }

  get value() {
    return this.credit;
  }
}
