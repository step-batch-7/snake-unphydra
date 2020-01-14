class Score {
  constructor(initialScore) {
    this.score = initialScore;
  }

  get currentScore() {
    return this.score;
  }

  increaseScore(increment) {
    this.score += increment;
  }
}
