import { Application, Assets, Sprite } from "../../node_modules/pixi.js/dist/pixi.mjs";


(async () =>
    {
        // Create a new application
        const app = new Application();
    
        // Initialize the application
        await app.init({ background: '#1099bb', resizeTo: window });
    
        // Append the application canvas to the document body
        document.body.appendChild(app.canvas);
    
        // Load the bunny texture
        const texture = await Assets.load('https://ibb.co/M8pm8fm');
        


    
    })();
    