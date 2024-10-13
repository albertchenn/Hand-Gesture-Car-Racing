import { Application, Assets, Sprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

import { getCarVelocity, getCarAngle } from './vision.mjs';
(async () => {
    const app = new Application({
        backgroundColor: 0x1099bb, 
        resizeTo: window, 
    });
    
    document.body.appendChild(app.view); 

    const texture = await Assets.load('../Assets/car.png');

    const car = new Sprite(texture);

    car.x = app.screen.width / 2;
    car.y = app.screen.height / 2;

    car.anchor.set(0.5);

    app.stage.addChild(car);
    
    app.ticker.add(() => {
        let targetAngle = getCarAngle();

        rotate(targetAngle);
    });

    
    function rotate(targetAngle) {
        if (car.angle < targetAngle) {
            car.angle -= 1;
        }
        else if (car.angle > targetAngle) {
            car.angle += 1;
        }
    }
})();
