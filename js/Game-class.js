import {
  getRandomIntInclusive,
  getArrOfRandomUniqueNumbers,
  shuffle,
} from './general.js';
export class Game {
  constructor(timer) {
    this.timer = timer;
    this.categoryNum = null;
    this.amountOfCategories = 12;
    this.amountOfQuestions = 10;
    this.questionNum = 0;
    this.questionEl = document.querySelector('.game-page__question');
    this.categoryScore = 0;
    this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.resultModal = document.querySelector('.result-page');
    this.rightAnswersEl = this.resultModal.querySelector('.result-page__true-answers');
    this.nextQuizBtn = this.resultModal.querySelector('.result-page__quiz-btn');
    this.rightSound = document.getElementById('rightSound');
    this.wrongSound = document.getElementById('wrongSound');
    this.completedSound = document.getElementById('completedSound');
  }
  async getData() {
    const jsonData = await fetch('~/data.json');
    const data = await jsonData.json();
    const categories = {
      'avant-garde': [],
      expressionism: [],
      impressionism: [],
      landscape: [],
      marine: [],
      painting: [],
      portrait: [],
      realism: [],
      religion: [],
      renaissance: [],
      romanticism: [],
      surrealism: [],
    };
    Object.keys(categories).forEach((category) => {
      categories[category] = data.filter((item) => item.category === category);
    });
    this.categories = categories;
  }
  async setCategoryData() {
    if (!this.categories) await this.getData();
    this.categoryData = Object.values(this.categories)[this.categoryNum];
  }
  setBgCategory(containersOfCategoryImgs) {
    this.categoryImagesNums.forEach((num, index) => {
      containersOfCategoryImgs[
        index
      ].style.backgroundImage = `url('/assets/pictures/${num}.jpg')`;
    });
  }
  async getAnswerOptions(dataKey) {
    if (dataKey === 'imageNum') await this.setCategoryItems(dataKey);
    // for picture game function setCategoryItems is called every time to have single right answer
    // because there can be 2 pictures with the same author
    const rightAnswer = this.currentGameData[this.questionNum][dataKey];
    const numberOfAnswerOptions = 4;
    const options = [rightAnswer];

    while (options.length < numberOfAnswerOptions) {
      const option =
        this.categoryItems[getRandomIntInclusive(0, this.categoryItems.length - 1)];
      if (!options.includes(option)) options.push(option);
    }
    return shuffle(options);
  }
  async startGame() {
    await this.setCategoryData();
    const { amountOfQuestions, categoryData, lastIndex = categoryData.length - 1 } = this;
    const rightAnswersPicNums = getArrOfRandomUniqueNumbers(amountOfQuestions, lastIndex);
    const currentGameData = rightAnswersPicNums.map((num) => categoryData[num]);
    this.currentGameData = currentGameData;
  }
  updateScore() {
    if (this.questionNum === this.amountOfQuestions) {
      this.score[this.categoryNum] = this.categoryScore;
      this.categoryScore = 0;
      this.questionNum = 0;
      this.saveScore();
    } else this.categoryScore++;
  }
  showResultModal() {
    this.rightAnswersEl.textContent = this.score[this.categoryNum];
    if (this.categoryNum === this.amountOfCategories - 1) {
      this.nextQuizBtn.style.display = 'none';
    } else this.nextQuizBtn.style.display = '';
    this.resultModal.showModal();
    this.completedSound.play();
  }
  async showNextQuestion() {
    this.questionNum++;
    if (this.questionNum === this.amountOfQuestions) {
      this.updateScore();
      this.showResultModal();
    } else {
      const answerOptions = await this.getAnswerOptions(this.dataKey);
      this.setGameContent(answerOptions);
      if (this.timer.timer) this.timer.setTimer();
    }
  }
  setListenerForRespModal(modal) {
    const modalBtn = modal.querySelector('.response-page__button-next');
    modalBtn.addEventListener(
      'click',
      () => {
        this.showNextQuestion();
        modal.close();
        modal.className = `${modal.classList[0]}`;
      },
      { once: true }
    );
  }
  showRespModal(modal, imgInfo) {
    const responseTemplate = document.getElementById('response-page-template').innerHTML;
    const template = Handlebars.compile(responseTemplate);
    const markup = template(imgInfo);
    modal.innerHTML = markup;
    this.setListenerForRespModal(modal);
    modal.showModal();
  }
  async handleUserAnswer(targetElem, modal) {
    const imgInfo = this.currentGameData[this.questionNum];
    const userAnswer = this.getUserAnswer(targetElem);
    const rightAnswer = imgInfo[this.dataKey];
    if (userAnswer === rightAnswer) {
      modal.classList.add('correct');
      this.rightSound.play();
      this.updateScore();
    } else {
      modal.classList.add('incorrect');
      this.wrongSound.play();
    }
    if (this.timer.timer) clearInterval(this.timer.interval);
    this.showRespModal(modal, imgInfo);
  }
}
