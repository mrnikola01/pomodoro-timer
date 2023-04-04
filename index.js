// Import stylesheets
import './style.css';

// Write Javascript code!
const SESSION_LENGTH = 15;
const SHORT_BREAK_LENGTH = 300;
const LONG_BREAK_LENGTH = 600;

const TIMER = document.querySelector('.timer');
const RESET = document.querySelector('.reset');
const START = document.querySelector('.start');
const STOP = document.querySelector('.stop');
const POMODORO = document.querySelector('.pomodoro');
const SHORT_BREAK = document.querySelector('.short-break');
const LONG_BREAK = document.querySelector('.long-break');

let timerID;
let timerType;
let timeRemaining;

setPomodoro();

function resetTimer() {
  clearInterval(timerID);

  if(timerType === 'pomodoro') {
    timeRemaining = SESSION_LENGTH;
  } else if(timerType === 'short-break') {
    timeRemaining = SHORT_BREAK_LENGTH;
  } else {
    timeRemaining = LONG_BREAK_LENGTH;
  }

  TIMER.textContent = formatTimer(timeRemaining);
  TIMER.style.color = 'rgba(0, 0, 0, 0.75)';
}

function startTimer() {
  clearInterval(timerID);

  if(timeRemaining <= 0) return;

  timerID = setInterval(() => {
    timeRemaining--;
    TIMER.textContent = formatTimer(timeRemaining);
    if(timeRemaining === 0) {
      clearInterval(timerID);
      TIMER.style.color = '#f03e3e';
      return;
    }
  }, 1000);
}

function playAlarmSound() {
  let audio = new Audio('audio.wav');
  audio.play()
    .then(() => console.log('Audio played successfully'))
    .catch(error => console.log(`Error playing audio: ${error}`));
}

function stopTimer() {
  clearInterval(timerID);
}

function formatTimer(seconds) {
  const MINUTE = Math.floor(seconds / 60).toString().padStart(2, "0");
  const SECOND = (seconds % 60).toString().padStart(2, "0");
  return `${MINUTE}:${SECOND}`;
}

function setPomodoro() {
  clearInterval(timerID);
  timerType = 'pomodoro';
  timeRemaining = SESSION_LENGTH;

  TIMER.textContent = formatTimer(timeRemaining);
  POMODORO.style.backgroundColor = '#37b24d';
  POMODORO.style.color = '#fff';

  SHORT_BREAK.style.backgroundColor = '#fff';
  SHORT_BREAK.style.color = 'rgba(0,0,0, 0.75)';

  LONG_BREAK.style.backgroundColor = '#fff';
  LONG_BREAK.style.color = 'rgba(0,0,0, 0.75)';
}

function setShortBreak() {
  clearInterval(timerID);
  timerType = 'short-break';
  timeRemaining = SHORT_BREAK_LENGTH;
  
  TIMER.textContent = formatTimer(timeRemaining);
  POMODORO.style.backgroundColor = '#fff';
  POMODORO.style.color = 'rgba(0,0,0, 0.75)';

  SHORT_BREAK.style.backgroundColor = '#37b24d';
  SHORT_BREAK.style.color = '#fff';

  LONG_BREAK.style.backgroundColor = '#fff';
  LONG_BREAK.style.color = 'rgba(0,0,0, 0.75)';
}

function setLongBreak() {
  clearInterval(timerID);
  timerType = 'long-break';
  timeRemaining = LONG_BREAK_LENGTH;
  
  TIMER.textContent = formatTimer(timeRemaining);
  POMODORO.style.backgroundColor = '#fff';
  POMODORO.style.color = 'rgba(0,0,0, 0.75)';

  SHORT_BREAK.style.backgroundColor = '#fff';
  SHORT_BREAK.style.color = 'rgba(0,0,0, 0.75)';

  LONG_BREAK.style.backgroundColor = '#37b24d';
  LONG_BREAK.style.color = '#fff';
}

RESET.addEventListener('click', resetTimer);
START.addEventListener('click', startTimer);
STOP.addEventListener('click', stopTimer);

POMODORO.addEventListener('click', setPomodoro);
SHORT_BREAK.addEventListener('click', setShortBreak);
LONG_BREAK.addEventListener('click', setLongBreak);