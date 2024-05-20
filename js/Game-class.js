import {
  getRandomIntInclusive,
  getArrOfRandomUniqueNumbers,
  shuffle,
} from './general.js';
class Game {
  constructor() {
    this.timer = 'off';
    this.categoryNum = null;
    this.amountOfQuestions = 10;
    this.questionNum = 0;
    this.questionEl = document.querySelector('.game-page__question');
  }
  async getData() {
    const jsonData = await fetch('../data.json');
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
    return categories;
  }
  async setCategoryData() {
    const data = await this.getData();
    const categoryData = Object.values(data)[this.categoryNum];
    this.categoryData = categoryData;
  }

  setBgCategory(containersOfCategoryImgs) {
    this.categoryImagesNums.forEach((num, index) => {
      const img = new Image();
      img.src = `assets/pictures/${num}.jpg`;
      containersOfCategoryImgs[index].style.backgroundImage = `url('${img.src}')`;
    });
  }
  async setCategoryItems(dataKey) {
    if (!this.categoryItems) {
      const uniqueItems = new Set(this.categoryData.map((obj) => obj[dataKey]));
      this.categoryItems = Array.from(uniqueItems);
    }
  }
  async getAnswerOptions(dataKey) {
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

  getUserAnswer(targetElem) {
    const targetImg = targetElem.style.backgroundImage;
    const beginIndex = targetImg.lastIndexOf('/') + 1;
    const endIndex = targetImg.indexOf('.jpg');
    return targetImg.slice(beginIndex, endIndex);
  }
}
