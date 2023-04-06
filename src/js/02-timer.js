import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerItem = document.querySelector('.timer');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');


timerItem.style.display = 'flex';
timerItem.style.justifyContent = 'space-evenly';
timerItem.style.width = '24%';
timerItem.style.marginLeft = '-16px';

startBtn.disabled = true;



    function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timer;

flatpickr(input,
    {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
        minuteIncrement: 1,
    
        onClose(selectedDates) {
        let selectedDatesMs = selectedDates[0].getTime();
        let actualDateMs = new Date().getTime();
            
            if (selectedDatesMs < actualDateMs) {
                Notiflix.Notify.failure("Please choose a date in the future")
            } else {
                startBtn.disabled = false;
                let calculateMS = selectedDatesMs - actualDateMs;

                const startBtnOnClick = () => {
                const addLeadingZero = (value) =>value.toString().padStart(2, '0');
                    timer = setInterval(() => {
                        const second = 1000;
                        const minute = second * 60;
                        const hour = minute * 60;
                        const day = hour * 24;

                        const days = Math.floor(calculateMS / day);
                        const hours = Math.floor((calculateMS % day) / hour);
                        const minutes = Math.floor(((calculateMS % day) % hour) / minute);
                        const seconds = Math.floor((((calculateMS % day) % hour) % minute) / second);
                        
                        calculateMS -= 1000;
                        
                        timerDays.textContent = addLeadingZero(days);
                        timerHours.textContent = addLeadingZero(hours);
                        timerMinutes.textContent = addLeadingZero(minutes);
                        timerSeconds.textContent = addLeadingZero(seconds);
                        
                        if (calculateMS < 1000) {
                            clearInterval(timer);
                            timerSeconds.textContent = 0
                        }
                    }, 1000)
                };
                startBtn.addEventListener('click',startBtnOnClick);
            }; 
  },
    });
