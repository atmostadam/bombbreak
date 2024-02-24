import { GameContext } from "./context/GameContext.js";
import { Bomb } from "./model/Bomb.js";
import { Boom } from "./model/Boom.js";
import { Paddle } from "./model/Paddle.js";

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
        this.bombs = [new Bomb(this.context)];
        this.paddle = new Paddle(this.context);
    }

    update(tick) {
        this.bombs.forEach(b => b.update(tick));

        for (let rowNumber = 0; rowNumber < this.context.getGrid().getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.context.getGrid().getNumberOfColumns(); columnNumber++) {
                var brick = this.context.getGrid().get(rowNumber, columnNumber);
                if (brick && !(brick instanceof Boom)) {
                    if (this.checkCollisions(this.bombs, brick)) {
                        break;
                    }
                }
            }
        }

        this.context.getGrid().update(tick);
    }

    draw() {
        this.context.getGrid().draw();
        this.bombs.forEach(b => b.draw());
        this.paddle.draw();
    }

    checkCollisions(bombs, brick) {
        bombs.forEach(b => {
            if (this.context.checkCollision(
                b.getX(),
                b.getY(),
                b.getSw(),
                b.getSh(),
                brick.getX(),
                brick.getY(),
                brick.getSw(),
                brick.getSh())) {
                b.onHit();
            }
        });
    }
}