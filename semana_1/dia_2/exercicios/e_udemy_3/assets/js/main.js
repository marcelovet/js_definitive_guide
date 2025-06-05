const timerDiv = document.querySelector('.timer');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

function createTimer() {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  return {
    get: () =>
      date.toLocaleTimeString('pt-BR', {
        hour12: false,
      }),
    add: (seconds) => {
      date.setSeconds(date.getSeconds() + seconds);
    },
    reset: () => {
      date.setHours(0, 0, 0, 0);
    },
  };
}

const innerTimer = createTimer();
const timerElement = document.createElement('p');
timerElement.textContent = innerTimer.get();
timerDiv.appendChild(timerElement);
let timer;

startBtn.addEventListener('click', () => {
  timer ??= setInterval(() => {
    innerTimer.add(1);
    timerElement.textContent = innerTimer.get();
  }, 1000);
  timerElement.classList.remove('paused');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  timerElement.classList.add('paused');
});

resetBtn.addEventListener('click', () => {
  innerTimer.reset();
  timerElement.textContent = innerTimer.get();
});
