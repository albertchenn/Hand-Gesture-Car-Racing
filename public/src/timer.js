const timer = document.getElementById("timer");
const stopwatch  = document.getElementsByClassName("stopwatch")[0];

let elapsedTime = 0;
let isOn = false;
let intervalID;

function formatTime(elapsedTime) {
    const min_conversion = 60000; 
    const sec_conversion = 1000;

    let milliseconds = elapsedTime;

    let minutes = Math.floor(elapsedTime / min_conversion);
    let seconds = Math.floor((elapsedTime % min_conversion) / sec_conversion);
    milliseconds = elapsedTime % sec_conversion;

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(3, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    const updateDelay = 10
    let startTime = Date.now();

   intervalID =  setInterval( () => {
        elapsedTime = Date.now() - startTime;

        stopwatch.innerHTML = formatTime(elapsedTime);

    }, updateDelay)

    isOn = true;
};



function handleClick() {
    if (isOn === true) {
        clearInterval(intervalID);
        isOn = false;
    } else {
        startTimer();
    }
};

timer.addEventListener("click", handleClick);