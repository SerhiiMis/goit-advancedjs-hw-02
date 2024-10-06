// Initialize the date picker with flatpickr
const startButton = document.querySelector('[data-start]');
const datePicker = document.getElementById('datetime-picker');
let countdownInterval = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    // Enable the Start button if the selected date is in the future
    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      alert('Please choose a future date!');
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener('click', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval); // Clear previous interval if any
  }

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = selectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = String(days).padStart(
    2,
    '0'
  );
  document.querySelector('[data-hours]').textContent = String(hours).padStart(
    2,
    '0'
  );
  document.querySelector('[data-minutes]').textContent = String(
    minutes
  ).padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = String(
    seconds
  ).padStart(2, '0');
}

// Function to convert milliseconds into days, hours, minutes, and seconds
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
