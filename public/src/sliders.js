export let VELOCITY_MULTIPLIER = 4;
export let TURNING_SPEED = 0.15;
export let OFFROAD_MULTIPLIER = 0.5;
export let VELOCITY_THRESHOLD = 20;

const slider = document.getElementById("maxVelocityMultiplier");
const sliderVelocity = document.getElementById("sliderVelocityMultiplier");
const velocityMultiplier = document.getElementById("velocityMultiplier");

function updateVelocity() {
    VELOCITY_MULTIPLIER = slider.value;
    sliderVelocity.textContent = VELOCITY_MULTIPLIER; 
    velocityMultiplier.value = VELOCITY_MULTIPLIER;
}
slider.addEventListener("input", updateVelocity);

const slider2 = document.getElementById("maxTurningSpeed");
const sliderTurningSpeed = document.getElementById("sliderTurningSpeed");
const turningSpeedMultiplier = document.getElementById("turningSpeedMultiplier");

function updateTurningSpeed() {
    TURNING_SPEED = slider2.value;
    sliderTurningSpeed.textContent = TURNING_SPEED; 
    turningSpeedMultiplier.value = TURNING_SPEED;
}
slider2.addEventListener("input", updateTurningSpeed);

const slider3 = document.getElementById("maxOffroadSpeed");
const sliderOffroadSpeed = document.getElementById("sliderOffroadSpeed");
const offroadMultiplier = document.getElementById("offroadMultiplier");

function updateOffroadSpeed() {
    OFFROAD_MULTIPLIER = slider3.value;
    sliderOffroadSpeed.textContent = OFFROAD_MULTIPLIER; 
    offroadMultiplier.value = OFFROAD_MULTIPLIER;
}
slider3.addEventListener("input", updateOffroadSpeed);

const slider4 = document.getElementById("maxVelocity");
const sliderMaxVelocity = document.getElementById("sliderMaxVelocity");
const maxVelocityMultiplier = document.getElementById("maxVelocityMultiplier");

function updateMaxVelocity() {
    VELOCITY_THRESHOLD = slider4.value;
    sliderMaxVelocity.textContent = VELOCITY_THRESHOLD; 
    maxVelocityMultiplier.value = VELOCITY_THRESHOLD;
}

slider4.addEventListener("input", updateMaxVelocity);

updateVelocity();
updateTurningSpeed();
updateOffroadSpeed();
updateMaxVelocity();