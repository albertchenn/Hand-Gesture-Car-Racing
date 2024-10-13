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
    const background_texture = await Assets.load('../Assets/placeholder_track.png');

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

    app.ticker.add(() => {
        let targetAngle = getCarAngle();
        // let targetVelocity = getCarVelocity();
        let targetVelocity = 5;

        if (!targetAngle) {
            targetAngle = 0
        }
        rotate(targetAngle);
        move(targetVelocity);

        const debuggingCode = document.getElementById('debuggingCode');
        debuggingCode.innerHTML = `Car Angle: ${targetAngle}<br>Car Velocity: ${targetVelocity}`;
    });

    function rotate(targetAngle) {
        if (targetAngle < 0) {
            background.angle -= 2;
        }
        else if (targetAngle > 0) {
            background.angle += 2;
        }
    }

    function move(targetVelocity) {
        background.x -= Math.sin(-background.angle) * targetVelocity;
        background.y += Math.cos(-background.angle) * targetVelocity;
    }
})();
