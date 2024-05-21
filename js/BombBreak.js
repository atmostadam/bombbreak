import { GameContext } from "./context/GameContext.js";
import { MouseListener } from "./listener/MouseListener.js";
import { TitleScreen } from "./screen/TitleScreen.js";

window.addEventListener("load", function () {
    const minMsPerFrame = 1000 / 60;

    var lastTime = performance.now();
    var tick = 0;

    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");

    let context = new GameContext(canvas, ctx);
    let gameloop = new BombBreak(context);

    function animate() {
        var time = performance.now();
        var sixtyFps = (time - lastTime) > minMsPerFrame;

        if (sixtyFps) {
            context.clear();
            gameloop.update(++tick);
            gameloop.draw();
        }

        window.requestAnimationFrame(animate);

        if (sixtyFps) {
            lastTime = time;
        }
    }
    animate();
});

export class BombBreak {
    constructor(context) {
        this.context = context;
        this.context.setMouseListener(new MouseListener(this.context));
        this.context.setScreen(new TitleScreen(this.context));
    }

    update(tick) {
        this.context.getScreen().update(tick);
    }

    draw() {
        this.context.getScreen().draw();
    }
}