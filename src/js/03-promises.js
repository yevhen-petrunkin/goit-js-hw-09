import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const { delay, step, amount } = formRef.elements;

let delayCounter = 0;

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delayRef = Number(delay.value);
  const stepRef = Number(step.value);
  const amountRef = Number(amount.value);
  delayCounter = delayRef;
  trackPromises(stepRef, amountRef);
}

function trackPromises(step, amount) {
  for (i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delayCounter += step;
    }
    createPromise(i, delayCounter);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
    processPromise(promise);
  }, delay);
}

function processPromise(promise) {
  promise
    .then(({ position, delay }) =>
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
        timeout: 3000,
      })
    )
    .catch(({ position, delay }) =>
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
        timeout: 3000,
      })
    );
}

// ===== СТАРИЙ КОД (теж працює, але занадтно мудрьоний) =====

// function trackPromises(delay, step, amount) {
//   setTimeout(() => {
//     if (amount === 0) {
//       return;
//     }
//     createPromise(promiseCounter, delayCounter);

//     const intervalId = setInterval(() => {
//       if (promiseCounter === amount) {
//         clearInterval(intervalId);
//         promiseCounter = 1;
//         delayCounter = 0;
//         return;
//       }
//       promiseCounter += 1;
//       delayCounter += step;
//       createPromise(promiseCounter, delayCounter);
//     }, step);
//   }, delay);
// }

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   const delayRef = Number(delay.value);
//   const stepRef = Number(step.value);
//   const amountRef = Number(amount.value);
//   delayCounter = delayRef;
//   trackPromises(delayRef, stepRef, amountRef);
// }
