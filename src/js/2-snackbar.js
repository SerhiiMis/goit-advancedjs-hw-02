import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function showToast(type, message) {
  if (type === 'success') {
    iziToast.success({
      message: message,
      position: 'topCenter',
    });
  } else if (type === 'fail') {
    iziToast.error({
      message: message,
      position: 'topCenter',
    });
  }
}

const form = document.querySelector('.form');

const FULFILLED = 'fulfilled';

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const delayInput = form.querySelector('input[name="delay"]');
  const stateInput = form.querySelector('input[name="state"]:checked');

  if (!delayInput.value || !stateInput) {
    return;
  }

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput.value;

  makePromise({ delay, shouldResolve: state === FULFILLED })
    .then(({ message }) => showToast('success', message))
    .catch(({ message }) => showToast('fail', message));

  form.reset();
}

function makePromise({ delay, shouldResolve = true }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {
        message: `${
          shouldResolve ? 'Fulfilled' : 'Rejected'
        } promise in ${delay}ms`,
      };
      shouldResolve ? resolve(result) : reject(result);
    }, delay);
  });
}
