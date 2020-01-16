class Food {
  constructor(positions, type, credit) {
    this.positions = positions.slice();
    this.type = type;
    this.credit = credit;
  }
  get location() {
    return this.positions.slice();
  }

  get value() {
    return this.credit;
  }

  get status() {
    return {
      type: this.type,
      position: this.positions.slice()
    };
  }
}
