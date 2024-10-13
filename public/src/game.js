import { Application, Assets, Sprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';
import { getCarVelocity, getCarAngle } from './vision.mjs';
import { CAR_PNG, BACKGROUND_PNG, VELOCITY_CUSHION, BACKGROUND_SCALE, TURNING_SPEED, OFFROAD_MULTIPLIER } from './constants.js';
import { endTimer, hasTimerStarted } from './timer.js';

(async () => {
    const canvas = document.getElementById('gameCanvas');
    const app = new Application({
        view: canvas,
        backgroundColor: 0x1099bb,
        resizeTo: window,
    });

    // Create an off-screen canvas to get pixel data
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = app.screen.width;
    offScreenCanvas.height = app.screen.height;
    let ctx = offScreenCanvas.getContext('2d'); // 2D context for pixel manipulation

    document.body.appendChild(app.view);

    const car_texture = await Assets.load(CAR_PNG);
    const background_texture = await Assets.load(BACKGROUND_PNG);

    const car = new Sprite(car_texture);
    const background = new Sprite(background_texture);

    car.x = app.screen.width / 2;
    car.y = app.screen.height / 2;
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    background.scale.set(BACKGROUND_SCALE);

    car.anchor.set(0.5);
    background.anchor.set(0.5);

    app.stage.addChild(background);
    app.stage.addChild(car);

    let targetAngle = 0;
    const onRoadColor = { r: 255, g: 0, b: 0 };
    const finishColor = { r: 0, g: 255, b: 9 };

    let offRoad = false;
    

    app.ticker.add(() => {
        if (hasTimerStarted()) {
            let targetVelocity = getCarVelocity();
            if (offRoad) {
                targetVelocity *= OFFROAD_MULTIPLIER;
            }
        targetAngle += TURNING_SPEED * getCarAngle();

            if (!targetAngle) {
                targetAngle = 0;
            }

            rotate(targetAngle);
            move(targetVelocity);

            if (isSpriteTouchingColor(car, onRoadColor)) {
                offRoad = false;
            } else {
                offRoad = true;
            }

            if (isSpriteTouchingColor(car, finishColor)) {
                endTimer();
            }
        }
    });

    function rotate(targetAngle) {
        if (targetAngle > Math.PI * 2) {
            targetAngle -= Math.PI * 2;
        }

        car.rotation = -targetAngle;
    }

    function move(targetVelocity) {
        if (targetVelocity < VELOCITY_CUSHION && targetVelocity > -VELOCITY_CUSHION) {
            targetVelocity = 0;
        }

        let debuggingCode = document.getElementById('debuggingCode');
        debuggingCode.innerHTML = `Speed: ${Math.round(getCarVelocity())} m/s<br>Turning Angle: ${Math.round(getCarAngle() * 57.2958)} degrees<br>Car Angle: ${Math.round(car.angle)} degrees<br>Offroad?: ${offRoad}`;

        background.x += Math.sin(targetAngle) * targetVelocity;
        background.y += Math.cos(targetAngle) * targetVelocity;
    }

    function isSpriteTouchingColor(sprite, targetColor) {
        // Render the current scene to the off-screen canvas
        app.renderer.render(app.stage);
        ctx.clearRect(0, 0, offScreenCanvas.width, offScreenCanvas.height); // Clear previous render
        ctx.drawImage(app.view, 0, 0); // Draw the current PixiJS view onto the off-screen canvas

        // Get the bounds of the sprite
        const bounds = sprite.getBounds();

        // Get pixel data from the sprite's bounding box area
        const imageData = ctx.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);
        const pixels = imageData.data;

        // Iterate through the pixel data to check for color match
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];     // Red
            const g = pixels[i + 1]; // Green
            const b = pixels[i + 2]; // Blue
            const a = pixels[i + 3]; // Alpha (opacity)

            // Check if the pixel matches the target color and is not transparent
            if (r === targetColor.r && g === targetColor.g && b === targetColor.b && a === 255) {
                return true;  // Sprite is touching the target color
            }
        }

        return false;  // No match found, sprite is not touching the color
    }

})();
