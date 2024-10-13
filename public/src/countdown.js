import {startTimer} from './timer.js'

const startBtn = document.getElementById("start-text");

function startCountDown() {
    // replace text in start btn with countdown

    let num = 3;
    const intervalID = setInterval(() => {
        startBtn.innerHTML = num;
        num = num - 1;
        if (num === -1) {
            clearInterval(intervalID);
            document.getElementById("start").remove();
            startTimer()
            
        }
    }, 1000);
}

startBtn.addEventListener("click", startCountDown)

// the btn needs to comback when the race ends