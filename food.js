class Food {
  constructor(positions, type, credit, growth) {
    this.positions = positions.slice();
    this.type = type;
    this.credit = credit;
    this.growth = growth;
  }

  get location() {
    return this.positions.slice();
  }

  get value() {
    return this.credit;
  }

  get growPower() {
    return this.growth;
  }

  get status() {
    return {
      type: this.type,
      position: this.positions.slice()
    };
  }
}
