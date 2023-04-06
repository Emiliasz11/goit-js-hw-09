import Notiflix from 'notiflix';

const labels = Array.from(document.querySelectorAll('label'));
const inputs = Array.from(document.querySelectorAll('input'));
const form = document.querySelector('.form');
const submitBtn = document.querySelector(`button[type="submit"]`);

submitBtn.style.fontSize = '15px';
submitBtn.style.padding = '5px';

for (const label of labels) {
  label.style.display = 'inline-block';
  label.style.fontSize = '15px';
  label.style.fontWeight = '600';
}

for (const input of inputs) {
  input.style.display = 'block';
  input.style.padding = '5px';
  input.style.fontSize = '15px';
}

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    let setTime = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const valueAmount = Number(form.elements.amount.value);
  const valueStep = Number(form.elements.step.value);
  const valueDelay = Number(form.elements.delay.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    let stepTime = valueDelay + valueStep * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`)
      })
      .catch(({ position, delay }) => {
       Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`)
      });
  }
});