export let VELOCITY_MULTIPLIER = 4;

const slider = document.getElementById("maxVelocity");
const sliderValue = document.getElementById("sliderValue");
const velocityMultiplier = document.getElementById("velocityMultiplier");

function updateVelocity() {
    VELOCITY_MULTIPLIER = slider.value;
    sliderValue.textContent = VELOCITY_MULTIPLIER; 
    velocityMultiplier.value = VELOCITY_MULTIPLIER;
    console.log("Current Velocity:", VELOCITY_MULTIPLIER);
}
slider.addEventListener("input", updateVelocity);
updateVelocity();