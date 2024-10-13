export let VELOCITY_MULTIPLIER = 4;
export let TURNING_SPEED = 0.15;
export let OFFROAD_MULTIPLIER = 0.5;
export let VELOCITY_THRESHOLD = 20;

const slider = document.getElementById("maxVelocityMultiplier");
const sliderVelocity = document.getElementById("sliderVelocityMultiplier");

function updateVelocity() {
    VELOCITY_MULTIPLIER = slider.value;
    sliderVelocity.textContent = VELOCITY_MULTIPLIER; 
    console.log("Current Velocity Multiplier:", VELOCITY_MULTIPLIER);
}
slider.addEventListener("input", updateVelocity);

const slider2 = document.getElementById("maxTurningSpeed");
const sliderTurningSpeed = document.getElementById("sliderTurningSpeed");

function updateTurningSpeed() {
    TURNING_SPEED = slider2.value;
    sliderTurningSpeed.textContent = TURNING_SPEED; 
    console.log("Current Turning Speed:", TURNING_SPEED);
}
slider2.addEventListener("input", updateTurningSpeed);

const slider3 = document.getElementById("maxOffroadSpeed");
const sliderOffroadSpeed = document.getElementById("sliderOffroadSpeed");

function updateOffroadSpeed() {
    OFFROAD_MULTIPLIER = slider3.value;
    sliderOffroadSpeed.textContent = OFFROAD_MULTIPLIER; 
    console.log("Current Offroad Speed:", OFFROAD_MULTIPLIER);
}
slider3.addEventListener("input", updateOffroadSpeed);

const slider4 = document.getElementById("maxVelocity");
const sliderMaxVelocity = document.getElementById("sliderMaxVelocity");

function updateMaxVelocity() {
    VELOCITY_THRESHOLD = slider4.value;
    sliderMaxVelocity.textContent = VELOCITY_THRESHOLD; 
    console.log("Current Max Velocity:", VELOCITY_THRESHOLD);
}
slider4.addEventListener("input", updateMaxVelocity);

// Call the update functions initially to set correct values in the UI
updateVelocity();
updateTurningSpeed();
updateOffroadSpeed();
updateMaxVelocity();
