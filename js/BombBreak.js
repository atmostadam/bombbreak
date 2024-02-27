import { BRICK_EMPTY } from "./configuration/GameConfiguration.js";
import { GameContext } from "./context/GameContext.js";

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
        this.context.addBomb();
    }

    update(tick) {
        if (tick % 80 == 0) {
            this.context.addBomb();
        }
        this.context.drawHitbox();
        this.context.getBombs().forEach(bomb => bomb.update(tick));
        this.context.getPaddle().update(tick);

        for (let rowNumber = 0; rowNumber < this.context.getGrid().getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.context.getGrid().getNumberOfColumns(); columnNumber++) {
                var brick = this.context.getGrid().get(rowNumber, columnNumber);
                if (brick && BRICK_EMPTY != brick.getState()) {
                    if (this.checkCollisions(brick)) {
                        break;
                    }
                }
            }
        }

        this.context.getGrid().update(tick);
    }

    draw() {
        this.context.getGrid().draw();
        this.context.getBombs().forEach(bomb => bomb.draw());
        this.context.getPaddle().draw();
    }

    checkCollisions(brick) {
        this.context.getBombs().forEach(bomb => {
            if (this.context.checkCollision(
                bomb.getX(),
                bomb.getY(),
                bomb.getSw(),
                bomb.getSh(),
                brick.getX(),
                brick.getY(),
                brick.getSw(),
                brick.getSh())) {
                bomb.onHit();
            }
        });
    }
}