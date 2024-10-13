import { Application, Assets, Sprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';
import { getCarVelocity, getCarAngle } from './vision.mjs';

(async () => {
    const canvas = document.getElementById('gameCanvas');
    const app = new Application({
        view: canvas,
        backgroundColor: 0x1099bb,
        resizeTo: window,

    });

    document.body.appendChild(app.view);

    const car_texture = await Assets.load('/Assets/car.png');
    const background_texture = await Assets.load('../Assets/detroitTopDownView.png');

    const car = new Sprite(car_texture);
    const background = new Sprite(background_texture);
    
    car.x = app.screen.width / 2;
    car.y = app.screen.height / 2;
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    background.scale.set(8);

    car.anchor.set(0.5);
    background.anchor.set(0.5);

    app.stage.addChild(background);
    app.stage.addChild(car);
    
    let targetAngle = 0;
    const turningSpeed = 0.1;

    app.ticker.add(() => {
        let targetVelocity = getCarVelocity();
        targetAngle += turningSpeed * getCarAngle();

        if (!targetAngle) {
            targetAngle = 0
        }

        rotate(targetAngle);
        move(targetVelocity);
    });

    function rotate(targetAngle) {
        if (targetAngle > Math.PI * 2) {
            targetAngle -= Math.PI * 2;
        }

        car.rotation = -targetAngle;

    }

    function move(targetVelocity) {
        if( targetVelocity < 1 && targetVelocity > -1) {
            targetVelocity = 0;
        }

        let debuggingCode = document.getElementById('debuggingCode');
        debuggingCode.innerHTML = `Magnitude: ${getCarVelocity()}<br>Turning Angle: ${getCarAngle()}<br>Car Angle: ${car.angle}`;
        
        background.x += Math.sin(targetAngle) * targetVelocity;
        background.y += Math.cos(targetAngle) * targetVelocity;
    }   
})();