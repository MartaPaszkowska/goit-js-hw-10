import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form[data-form]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements['delay'];
  const stateInput = form.elements['state'];
  const delay = delayInput.value.trim();
  const state = stateInput.value.trim();

  createPromise(parseInt(delay), state)
    .then(delay => {
      iziToast.success({
        icon: 'none',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#95EC3E',
        messageColor: 'white',
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: 'none',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EC483E',
        messageColor: '#ffffff',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
