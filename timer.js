class Timer {
  constructor(initialTime) {
    this.time = initialTime;
  }

  startTime() {
    const timerId = setInterval(() => {
      this.time--;
    }, 1000);
    return timerId;
  }
  get remainingTime() {
    return this.time;
  }

  isTimeFinish() {
    return this.time == 0;
  }
}
