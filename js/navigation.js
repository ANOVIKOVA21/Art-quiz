export function goToAnotherPage(currentPage, targetPage) {
  currentPage.addEventListener(
    'transitionend',
    () => {
      currentPage.classList.add('hidden');
      targetPage.classList.remove('hidden');
    },
    { once: true }
  );
  currentPage.classList.add('retracted');
  targetPage.classList.remove('retracted');
}
