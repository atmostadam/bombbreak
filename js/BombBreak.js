import { LevelConfiguration } from "./configuration/LevelConfiguration.js";
import { GameContext } from "./context/GameContext.js";
import { Bomb } from "./model/Bomb.js";
import { Explosion } from "./model/Explosion.js";
import { Grid } from "./model/Grid.js";
import { Paddle } from "./model/Paddle.js";

window.addEventListener("load", function () {
    const minMsPerFrame = 1000 / 60;

    var lastTime = performance.now();
    var tick = 0;

    let context = new GameContext();
    let gameloop = new BombBreak(context);

    function animate() {
        var time = performance.now();
        var sixtyFps = (time - lastTime) > minMsPerFrame;

        if (sixtyFps) {
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
        this.level = 1;
        this.grid = new Grid(this.context, this.level);
        this.bomb = new Bomb(this.context);
        this.paddle = new Paddle(this.context);
    }

    update(tick) {
        this.paddle.update(tick);
        this.bomb.update(tick);

        for (let rowNumber = 0; rowNumber < this.grid.getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.grid.getNumberOfColumns(); columnNumber++) {
                var cell = this.grid.get(rowNumber, columnNumber);
                var image = cell.getImage();
                if (image) {
                    console.warn("Yes IMAGE! [" + image + "]");
                    if (this.checkCollision(
                        this.bomb.getX(),
                        this.bomb.getY(),
                        this.bomb.getR() * 2,
                        this.bomb.getR() * 2,
                        image.getX(),
                        image.getY(),
                        image.getSw(),
                        image.getSh())) {
                        console.warn("Yes NEW EXPLOSION! [" + image + "]");
                        cell.setImage(new Explosion(this.context, cell));
                    }
                }
            }
        }

        this.grid.update(tick);
    }

    draw() {
        this.paddle.draw();
        this.bomb.draw();
        this.grid.draw();
    }
}