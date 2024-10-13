import { Application, Assets, Sprite } from 'https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.mjs';

(async () => {
    const app = new Application({
        backgroundColor: 0x1099bb, 
        resizeTo: window, 
    });
    
    document.body.appendChild(app.view); 

    const texture = await Assets.load('https://i.ibb.co/M8pm8fm/bunny.png'); 

    const bunny = new Sprite(texture);

    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    bunny.anchor.set(0.5);

    app.stage.addChild(bunny);
})();
