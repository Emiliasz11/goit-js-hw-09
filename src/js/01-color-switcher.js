const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let switcher;

stopBtn.setAttribute('disabled', true);
    
startBtn.addEventListener('click', () => {
    switcher = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
})


stopBtn.addEventListener('click', () => {
    clearInterval(switcher);
    stopBtn.disabled = true;
    startBtn.disabled = false
    
})
