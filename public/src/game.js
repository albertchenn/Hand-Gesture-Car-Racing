import { Application, Assets, Sprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({
        backgroundColor: 0x1099bb, 
        resizeTo: window, 
    });
    
    document.body.appendChild(app.view); 
    //../Assets/placeholder_track.png

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
    
})();
