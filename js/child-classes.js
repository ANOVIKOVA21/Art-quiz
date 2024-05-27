import { Game } from './Game-class.js';

export class AuthorQuiz extends Game {
  constructor(timer) {
    super(timer);
    this.gameType = 'author';
    this.categoryImagesNums = [202, 117, 1, 197, 217, 57, 102, 0, 68, 20, 47, 110];
    this.currentGameData = [];
    this.pictureEl = document.querySelector('.quiz-author__img');
    this.answerButtons = document.querySelectorAll('.quiz-author__answer-button');
    this.questionText = 'Who is the author of this picture?';
    this.dataKey = 'author';
  }
  async setCategoryItems(dataKey) {
    const uniqueItems = new Set(this.categoryData.map((obj) => obj[dataKey]));
    this.categoryItems = Array.from(uniqueItems);
  }
  setGameContent(answerOptions) {
    const { pictureEl, currentGameData, questionNum, answerButtons } = this;
    pictureEl.style.backgroundImage = `url(../assets/pictures/${currentGameData[questionNum].imageNum}.jpg)`;
    answerButtons.forEach((btn, index) => (btn.textContent = answerOptions[index]));
  }

  async startGame() {
    await super.startGame();
    await this.setCategoryItems(this.dataKey);
    const answerOptions = await this.getAnswerOptions(this.dataKey);
    this.setGameContent(answerOptions);
    this.questionEl.textContent = this.questionText;
    if (this.timer.timer) this.timer.setTimer();
  }
  getUserAnswer(el) {
    if (el) return el.textContent;
    else return null;
  }
  saveScore() {
    let newScore = this.score;
    if (localStorage.authorQuizScore) {
      const savedScore = JSON.parse(localStorage.getItem('authorQuizScore'));
      savedScore[this.categoryNum] = this.score[this.categoryNum];
      newScore = savedScore;
    }
    localStorage.setItem('authorQuizScore', JSON.stringify(newScore));
  }
}

export class PictureQuiz extends Game {
  constructor(timer) {
    super(timer);
    this.gameType = 'picture';
    this.categoryImagesNums = [237, 97, 114, 173, 14, 236, 154, 143, 158, 6, 60, 31];
    this.currentGameData = [];
    this.answerPictures = document.querySelectorAll('.quiz-picture__option-picture');
    this.dataKey = 'imageNum';
  }
  async setCategoryItems(dataKey) {
    const { categoryData, questionNum, currentGameData } = this;
    const filteredArr = categoryData.filter(
      (obj) => obj.author !== currentGameData[questionNum].author
    );
    const uniqueItems = filteredArr.map((obj) => obj[dataKey]);
    this.categoryItems = uniqueItems;
  }
  setGameContent(answerOptions) {
    const { questionEl, currentGameData, questionNum, answerPictures } = this;
    questionEl.textContent = `Which is ${currentGameData[questionNum].author}'s picture?`;
    answerPictures.forEach((img, index) => {
      img.style.backgroundImage = `url(../assets/pictures/${answerOptions[index]}.jpg)`;
      img.setAttribute('data-image-num', `${answerOptions[index]}`);
    });
  }
  async startGame() {
    await super.startGame();
    const answerOptions = await this.getAnswerOptions(this.dataKey);
    this.setGameContent(answerOptions);
    if (this.timer.timer) this.timer.setTimer();
  }
  getUserAnswer(el) {
    if (el) return el.dataset.imageNum;
    else return null;
  }
  saveScore() {
    let newScore = this.score;
    if (localStorage.pictureQuizScore) {
      const savedScore = JSON.parse(localStorage.getItem('pictureQuizScore'));
      savedScore[this.categoryNum] = this.score[this.categoryNum];
      newScore = savedScore;
    }
    localStorage.setItem('pictureQuizScore', JSON.stringify(newScore));
  }
}
