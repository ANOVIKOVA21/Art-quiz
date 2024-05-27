export function addSettingsListeners(timer) {
  const settingsPage = document.querySelector('.settings-page');
  const volumeEl = document.getElementById('volume');
  const sounds = document.querySelectorAll('.sound');
  const timeSlider = settingsPage.querySelector('.settings-page__switcher-slider');
  const timeSliderText = settingsPage.querySelector('.settings-page__switcher-text');
  const timerEl = document.getElementById('timer');
  const timeEl = settingsPage.querySelector('.settings-page__time');
  const timeButtonsContainer = settingsPage.querySelector('.settings-page__time-buttons');

  volumeEl.addEventListener('click', () => {
    volumeEl.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${volumeEl.value}%, #C4C4C4 ${volumeEl.value}%, #C4C4C4 100%)`;
    sounds.forEach((sound) => (sound.volume = volumeEl.value / 100));
  });

  timeSlider.addEventListener('click', () => {
    if (timeSliderText.textContent === 'Off') {
      timeSliderText.textContent = 'On';
      timerEl.style.display = 'inline-block';
      timer.timer = true;
      timer.updateTime();
    } else {
      timeSliderText.textContent = 'Off';
      timerEl.style.display = 'none';
      timer.timer = false;
    }
  });
  timeButtonsContainer.addEventListener('click', (ev) => {
    const targetBtn = ev.target;
    if (!targetBtn.closest('button')) return;
    if (targetBtn.closest('.less-btn')) less(timeEl);
    else if (targetBtn.closest('.more-btn')) more(timeEl);
    timer.updateTime();
  });
}
function less(element) {
  +element.value == 5 ? (element.value = 5) : (element.value = element.value - 5);
}

function more(element) {
  +element.value == 30 ? (element.value = 30) : (element.value = +element.value + 5);
}
