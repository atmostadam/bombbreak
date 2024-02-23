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
        this.bomb = new Bomb(this.context);
        this.paddle = new Paddle(this.context);
    }

    update(tick) {
        this.paddle.update(tick);
        this.bomb.update(tick);

        for (let rowNumber = 0; rowNumber < this.context.getGrid().getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.context.getGrid().getNumberOfColumns(); columnNumber++) {
                var brick = this.context.getGrid().get(rowNumber, columnNumber);
                if (brick) {
                    if (this.checkCollision(
                        this.bomb.getX(),
                        this.bomb.getY(),
                        this.bomb.getSw() * 2,
                        this.bomb.getSh() * 2,
                        brick.getX(),
                        brick.getY(),
                        brick.getSw(),
                        brick.getSh())) {
                        this.context.getGrid().set(
                            rowNumber,
                            columnNumber,
                            new Boom(this.context,
                                brick.getX(),
                                brick.getY(),
                                brick.getSw(),
                                brick.getSh()));
                    }
                }
            }
        }

        this.context.getGrid().update(tick);
    }

    draw() {
        this.paddle.draw();
        this.bomb.draw();
        this.context.getGrid().draw();
    }

    checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return (
            x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2
        );
    }
}