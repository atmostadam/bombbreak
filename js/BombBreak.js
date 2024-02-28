import { BRICK_EMPTY } from "./configuration/GameConfiguration.js";
import { LevelConfiguration } from "./configuration/LevelConfiguration.js";
import { GameContext } from "./context/GameContext.js";
import { MouseListener } from "./listener/MouseListener.js";
import { Bomb } from "./model/Bomb.js";
import { Grid } from "./model/Grid.js";
import { Paddle } from "./model/Paddle.js";
import { Score } from "./model/Score.js";

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
        this.context.setLevelConfiguration(new LevelConfiguration(this.context));
        this.context.setGrid(new Grid(this.context, 1));
        this.context.setBombs([new Bomb(this.context)]);
        this.context.setPaddle(new Paddle(this.context));
        this.context.setScore(new Score(this.context));
    }

    update(tick) {
        if (tick % 80 == 0) {
            this.context.addBomb();
        }
        this.context.getBombs().forEach(b => b.update(tick));
        this.context.getPaddle().update(tick);
        this.context.getScore().update(tick);

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
        this.context.getBombs().forEach(b => b.draw());
        this.context.getPaddle().draw();
        this.context.getScore().draw();
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