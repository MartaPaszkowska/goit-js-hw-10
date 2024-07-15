'use strict';
////////biblioteki/////////////
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//////////zmienne globalne//////////
let userSelectedDate = 0;
const selector = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
startBtn.disabled = true;
///////objekty//////////////
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        position: 'topRight',
        icon: 'none',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: '#EC3E3E',
        theme: 'dark',
      });
      startBtn.disabled = true;
      startBtn.classList.remove('active');
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
      startBtn.classList.add('active');
    }
  },
};

///////////listener/////////////
startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('active')) {
    selector.disabled = true;
    startBtn.disabled = true;
    startBtn.classList.remove('active');
    countingdown(userSelectedDate);
    refs.startTimerBtn.disabled = true;
  }
});
////////funcje////////////
function countingdown(markedDate) {
  function setCounting() {
    const now = new Date().getTime();
    const difference = markedDate - now;

    if (difference < 0) {
      clearInterval(interval);
      setTimer(0, 0, 0, 0);

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
    setTimer(days, hours, minutes, seconds);
  }

  const interval = setInterval(setCounting, 1000);
  setCounting();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTimer(days, hours, minutes, seconds) {
  timer.days.textContent = addLeadingZero(days);
  timer.hours.textContent = addLeadingZero(hours);
  timer.minutes.textContent = addLeadingZero(minutes);
  timer.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
///////////wywoływacz//////////
flatpickr(selector, options);
