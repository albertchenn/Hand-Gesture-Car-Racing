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
    

    app.ticker.add(() => {
        background.anchor.set(0.5);
        let targetAngle = getCarAngle();
        let targetVelocity = getCarVelocity();
        // let targetVelocity = 0;

        if (!targetAngle) {
            targetAngle = 0
        }

        // background.anchor.set((background.x / app.screen.width, background.y / app.screen.height));
        rotate(targetAngle);
        move(targetVelocity);

        // car.angle = -background.angle;
        // const debuggingCode = document.getElementById('debuggingCode');
        // debuggingCode.innerHTML = `X Vel: ${-Math.sin(targetAngle) * targetVelocity}<br>Y Vel: ${Math.cos(targetAngle) * targetVelocity}<br>Turning Angle: ${background.angle}`;

    });

    function rotate(targetAngle) {
        background.anchor.set((background.x / app.screen.width, background.y / app.screen.height));
        if (targetAngle < 0) {
            background.angle -= 2;
        }
        else if (targetAngle > 0) {
            background.angle += 2;
        }

    }

    function move(targetVelocity) {
        background.anchor.set(0.5);
        let turningAngle = background.angle;
        if (turningAngle = 0) {
            turningAngle += Math.PI * 2;
        }
        let debuggingCode = document.getElementById('debuggingCode');
        debuggingCode.innerHTML = `X Vel: ${-Math.sin(turningAngle) * targetVelocity}<br>Y Vel: ${Math.cos(turningAngle) * targetVelocity}<br>Turning Angle: ${turningAngle}`;
        background.x -= Math.sin(turningAngle) * targetVelocity;
    
        background.y += Math.cos(turningAngle) * targetVelocity;
    }   
})();