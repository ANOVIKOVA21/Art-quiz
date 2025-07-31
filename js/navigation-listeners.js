import { goToAnotherPage } from './navigation.js';
import { AuthorQuiz, PictureQuiz } from './child-classes.js';
import { addSettingsListeners } from './settings.js';
import { Timer } from './timer-class.js';
import { showScore } from './score.js';
function addNavigationListeners() {
  const home = document.querySelector('.home-page');
  const settingsPage = document.querySelector('.settings-page');
  const categoriesPage = document.querySelector('.categories-page');
  const gamePage = document.querySelector('.game-page');
  const responsePage = document.querySelector('.response-page');
  const resultPage = document.querySelector('.result-page');
  const quizAuthor = home.querySelector('.painter');
  const quizPicture = home.querySelector('.picture');
  const homeSettingsImg = home.querySelector('.settings');
  const backBtn = settingsPage.querySelector('.settings-page__back-btn');
  const categoriesContainer = categoriesPage.querySelector(
    '.categories-page__categories'
  );
  const containersOfCategoryImgs = categoriesPage.querySelectorAll(
    '.categories-page__category-img'
  );
  const categoriesHomeBtn = categoriesPage.querySelector('.categories-page__home-btn');
  const categoriesSettingsImg = categoriesPage.querySelector('.settings');
  const quizAuthorContent = gamePage.querySelector('.quiz-author');
  const quizPictureContent = gamePage.querySelector('.quiz-picture');
  const answersButtons = gamePage.querySelectorAll('.quiz-author__answer-button');
  const answerPictures = gamePage.querySelectorAll('.quiz-picture__option-picture');
  const resultHomeBtn = resultPage.querySelector('.result-page__home-btn');
  const nextQuizBtn = resultPage.querySelector('.result-page__quiz-btn');
  let game = null;
  const timer = new Timer();
  let prevPage = null;

  function quizHandler(game) {
    goToAnotherPage(home, categoriesPage);
    game.setBgCategory(containersOfCategoryImgs);
    showScore(game);
  }
  quizAuthor.addEventListener('click', () => {
    game = new AuthorQuiz(timer);
    quizHandler(game);
  });
  quizPicture.addEventListener('click', () => {
    game = new PictureQuiz(timer);
    quizHandler(game);
  });
  homeSettingsImg.addEventListener('click', () => {
    goToAnotherPage(home, settingsPage);
    prevPage = home;
  });
  backBtn.addEventListener('click', () => {
    goToAnotherPage(settingsPage, prevPage);
    prevPage = settingsPage;
  });
  categoriesHomeBtn.addEventListener('click', () => {
    goToAnotherPage(categoriesPage, home);
    prevPage = categoriesPage;
  });
  categoriesSettingsImg.addEventListener('click', () => {
    goToAnotherPage(categoriesPage, settingsPage);
    prevPage = categoriesPage;
  });
  categoriesContainer.addEventListener('click', (ev) => {
    const targetCategory = ev.target.closest('.categories-page__category');
    if (!targetCategory) return;
    goToAnotherPage(categoriesPage, gamePage);
    game.categoryNum = +targetCategory.dataset.categoryNum;
    if (game.gameType === 'author') quizAuthorContent.classList.remove('hidden');
    else quizPictureContent.classList.remove('hidden');
    game.startGame();
  });
  document.addEventListener('timeisup', () => game.handleUserAnswer(null, responsePage));
  answersButtons.forEach((btn) =>
    btn.addEventListener('click', (ev) => game.handleUserAnswer(ev.target, responsePage))
  );
  answerPictures.forEach((pic) =>
    pic.addEventListener('click', (ev) => game.handleUserAnswer(ev.target, responsePage))
  );
  resultHomeBtn.addEventListener('click', () => {
    goToAnotherPage(gamePage, home);
    resultPage.close();
    setTimeout(() => {
      quizAuthorContent.classList.add('hidden');
      quizPictureContent.classList.add('hidden');
    }, 1000);
  });
  nextQuizBtn.addEventListener('click', () => {
    resultPage.close();
    game.categoryNum++;
    game.startGame();
  });
  addSettingsListeners(timer);
}
addNavigationListeners();
