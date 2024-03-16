import {
    BRICK_EMPTY,
    bombDropTicks
} from "./../configuration/GameConfiguration.js";
import { Bomb } from "./../model/Bomb.js";
import { Grid } from "./../model/Grid.js";
import { Paddle } from "./../model/Paddle.js";

export class GameScreen {
    constructor(context) {
        this.context = context;
        this.grid = new Grid(this.context, 1);
        this.paddle = new Paddle(this.context);
        this.bombs = [new Bomb(this.context, this, this.grid, this.paddle)];
    }

    update(tick) {
        if (tick % bombDropTicks == 0) {
            this.addBomb();
        }
        this.bombs.forEach(b => b.update(tick));
        this.paddle.update(tick);
        this.context.getScore().update(tick);

        for (let rowNumber = 0; rowNumber < this.grid.getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.grid.getNumberOfColumns(); columnNumber++) {
                var brick = this.grid.get(rowNumber, columnNumber);
                if (brick && BRICK_EMPTY != brick.getState()) {
                    if (this.checkCollisions(brick)) {
                        break;
                    }
                }
            }
        }

        this.grid.update(tick);
    }

    draw() {
        this.grid.draw();
        this.bombs.forEach(b => b.draw());
        this.paddle.draw();
        this.context.getScore().draw();
    }

    onClick(x, y) {

    }

    checkCollisions(brick) {
        this.bombs.forEach(bomb => {
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

    getGrid() {
        return this.grid;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    getBombs() {
        return this.bombs
    }

    setBombs(bombs) {
        this.bombs = bombs;
    }

    addBomb() {
        this.bombs.push(new Bomb(this.context, this, this.grid, this.paddle));
    }

    deleteBomb(bomb) {
        this.bombs = this.bombs.filter(e => e !== bomb)
    }

    getPaddle() {
        return this.paddle;
    }

    setPaddle(paddle) {
        this.paddle = paddle;
    }
}