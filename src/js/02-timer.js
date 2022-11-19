import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputValue = selectedDates[0].getTime();

    if (inputValue <= Date.now()) {
      timer.isFutureDate = false;
      disableStartBtn();
      Notiflix.Notify.failure(NOTIFICATION, {
        timeout: 2000,
      });
      return;
    }

    timer.isFutureDate = true;
    disableStartBtn();
    timer.endTime = inputValue;
  },
};

const timer = {
  isFutureDate: false,
  timerId: null,
  endTime: null,
  datetimePickerRef: document.querySelector('#datetime-picker'),
  startBtnRef: document.querySelector('button[data-start]'),

  start() {
    if (this.endTime === null) {
      return;
    }

    this.timerId = setInterval(() => {
      currentTime = Date.now();
      deltaTime = this.endTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimerBoard({ days, hours, minutes, seconds });
      this.end(currentTime, this.endTime);
    }, 1000);
  },

  end(present, end) {
    if (present >= end) {
      clearInterval(this.timerId);
      clearTimerBoard();
      Notiflix.Notify.success(END_MESSAGE, {
        timeout: 2000,
      });
    }
  },
};

const timeRefs = {
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minsRef: document.querySelector('span[data-minutes]'),
  secsRef: document.querySelector('span[data-seconds]'),
};

const NOTIFICATION = 'Please choose a date in the future';
const END_MESSAGE = 'Time is Out!';
let inputValue = timer.datetimePickerRef.value;

flatpickr(timer.datetimePickerRef, options);

disableStartBtn();

timer.startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  timer.start();
}

function disableStartBtn() {
  timer.isFutureDate
    ? timer.startBtnRef.removeAttribute('disabled')
    : timer.startBtnRef.setAttribute('disabled', '');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerBoard({ days, hours, minutes, seconds }) {
  timeRefs.daysRef.textContent = `${days}`;
  timeRefs.hoursRef.textContent = `${hours}`;
  timeRefs.minsRef.textContent = `${minutes}`;
  timeRefs.secsRef.textContent = `${seconds}`;
}

function clearTimerBoard() {
  timeRefs.daysRef.textContent = `00`;
  timeRefs.hoursRef.textContent = `00`;
  timeRefs.minsRef.textContent = `00`;
  timeRefs.secsRef.textContent = `00`;
}
