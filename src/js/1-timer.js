import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let intervalId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    if (date <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    } else {
      selectedDate = date;
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startBtn.addEventListener('click', () => {
  if (!selectedDate) return;

  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  intervalId = setInterval(() => {
    const deltaTime = selectedDate - new Date();
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        message: 'Timer has ended!',
        position: 'topCenter',
      });
      dateTimePicker.disabled = false;
      startBtn.disabled = true;
      return;
    }

    const time = convertMs(deltaTime);
    updateTimerDisplay(time);
  }, 1000);
});

function updateTimerDisplay({ days: d, hours: h, minutes: m, seconds: s }) {
  days.textContent = addLeadingZero(d);
  hours.textContent = addLeadingZero(h);
  minutes.textContent = addLeadingZero(m);
  seconds.textContent = addLeadingZero(s);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

if (deltaTime <= 0) {
  clearInterval(intervalId);
  iziToast.success({
    message: 'Timer has ended!',
    position: 'topCenter',
  });
  dateTimePicker.disabled = false;
  startBtn.disabled = false;
  return;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
