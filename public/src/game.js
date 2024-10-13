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
    const turningSpeed = 0.01;

    app.ticker.add(() => {
        background.anchor.set(0.5);
        targetAngle += turningSpeed * getCarAngle();
        let targetVelocity = getCarVelocity();
        // let targetVelocity = 0;

        if (!targetAngle) {
            targetAngle = 0
        }
        else if (targetAngle > Math.PI * 2) {
            targetAngle -= Math.PI * 2;
        }

        // background.anchor.set((background.x / app.screen.width, background.y / app.screen.height));
        rotate(targetAngle);
        move(targetVelocity);
        car.angle = targetAngle;
        car.rotation = -targetAngle;

        

        background.x += Math.sin(targetAngle) * targetVelocity;
        background.y += Math.cos(targetAngle) * targetVelocity;
        

        // car.angle = -background.angle;
        // const debuggingCode = document.getElementById('debuggingCode');
        // debuggingCode.innerHTML = `X Vel: ${-Math.sin(targetAngle) * targetVelocity}<br>Y Vel: ${Math.cos(targetAngle) * targetVelocity}<br>Turning Angle: ${background.angle}`;

    });

    function rotate(targetAngle) {
        if (targetAngle < 0) {
            //background.angle -= 2;
        }
        else if (targetAngle > 0) {
            //background.angle += 2;
        }

    }

    function move(targetVelocity) {
        //background.anchor.set(0.5);
        let turningAngle = background.angle;
        let debuggingCode = document.getElementById('debuggingCode');
        debuggingCode.innerHTML = `Magnitude: ${getCarVelocity()}<br>Turning Angle: ${getCarAngle()}<br>Car Angle: ${car.angle}`;
        
    }   
})();