export function showScore(game) {
  if (localStorage.length === 0) return;
  const categoriesScoreElems = document.querySelectorAll('.true-answers');
  const containersOfCategoryImgs = document.querySelectorAll(
    '.categories-page__category-img'
  );
  let score = null;
  if (game.gameType === 'author') {
    score = JSON.parse(localStorage.getItem('authorQuizScore')) || game.score;
  } else {
    score = JSON.parse(localStorage.getItem('pictureQuizScore')) || game.score;
  }
  score.forEach((item, index) => {
    categoriesScoreElems[index].textContent = item;
    if (item) containersOfCategoryImgs[index].style.filter = 'none';
    else containersOfCategoryImgs[index].style.filter = 'grayscale(0.75)';
  });
}
