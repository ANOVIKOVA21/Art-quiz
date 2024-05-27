export class Timer {
  constructor() {
    this.timer = false;
    this.timerEl = document.getElementById('timer');
    this.timeEl = document.querySelector('.settings-page__time');
    this.time = 0;
    this.interval = null;
  }
  setTime(value) {
    this.timerEl.textContent = `00:${value}`;
    if (value < 10) this.timerEl.textContent = `00:0${value}`;
  }

  updateTime() {
    this.time = this.timeEl.value;
    this.setTime(this.time);
  }

  decreaseTime() {
    if (this.time === 0) {
      clearInterval(this.interval);
      document.dispatchEvent(new CustomEvent('timeisup'));
    } else {
      let current = --this.time;
      this.setTime(current);
    }
  }
  setTimer() {
    this.updateTime();
    this.interval = setInterval(this.decreaseTime.bind(this), 1000);
  }
}
