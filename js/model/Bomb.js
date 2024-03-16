import {
    BOMB_H,
    BOMB_IX,
    BOMB_IY,
    BOMB_PERCENT_HEIGHT,
    BOMB_PERCENT_WIDTH,
    BOMB_PERCENT_X, BOMB_PERCENT_Y, BOMB_SPEED_PERCENT_X,
    BOMB_SPEED_PERCENT_Y,
    BOMB_SRC,
    BOMB_STATE_BOMB, BOMB_STATE_BOOM,
    BOMB_STATE_DROPPING,
    BOMB_W,
    BOOM_H,
    BOOM_IX, BOOM_IY,
    BOOM_SRC,
    BOOM_W,
    BRICK_EMPTY,
    bombBoomNumberOfTicks,
    bombBoomSizeMultiplier
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(BOMB_SRC);
await loadImage(BOOM_SRC);

export class Bomb {
    constructor(context, screen, grid, paddle) {
        this.paddle = paddle;
        this.screen = screen;
        this.grid = grid;
        this.context = context;
        this.percentX = BOMB_PERCENT_X;
        this.percentY = BOMB_PERCENT_Y;
        this.speedPercentX = BOMB_SPEED_PERCENT_X;
        this.speedPercentY = BOMB_SPEED_PERCENT_Y;
        this.state = BOMB_STATE_DROPPING;
    }

    update(tick) {
        this.tick = tick;
        if (BOMB_STATE_DROPPING == this.state) {
            this.dropUntilTouchingPaddle();
        } else if (BOMB_STATE_BOMB == this.state) {
            this.bounceIfTouchingPaddle();
            this.bounceIfTouchingLeft();
            this.bounceIfTouchingRight();
            this.bounceIfTouchingTop();
            this.bounceIfTouchingBottom();
            this.percentX += this.speedPercentX;
            this.percentY -= this.speedPercentY;
        } else if (BOMB_STATE_BOOM == this.state && this.tick > this.finalTick) {
            this.screen.deleteBomb(this);
        }
    }

    draw() {
        let ctx = this.context.getCtx();
        if (BOMB_STATE_DROPPING == this.state || BOMB_STATE_BOMB == this.state) {
            ctx.drawImage(
                this.context.getImage(BOMB_SRC),
                BOMB_IX,
                BOMB_IY,
                BOMB_W,
                BOMB_H,
                this.getX() - (this.getSw() * .2),
                this.getY() - (this.getSh() * .2),
                this.getSw() * 1.2,
                this.getSh() * 1.2
            );
        } else if (this.state == BOMB_STATE_BOOM) {
            ctx.drawImage(
                this.context.getImage(BOOM_SRC),
                BOOM_IX,
                BOOM_IY,
                BOOM_W,
                BOOM_H,
                this.getX() - (this.getSw() * 1.4),
                this.getY() - (this.getSh() * 1.4),
                this.getSw() * bombBoomSizeMultiplier,
                this.getSh() * bombBoomSizeMultiplier
            );
        }
    }

    onHit() {
        if (this.state == BOMB_STATE_BOMB) {
            for (let rowNumber = 0; rowNumber < this.grid.getNumberOfRows(); rowNumber++) {
                for (let columnNumber = 0; columnNumber < this.grid.getNumberOfColumns(); columnNumber++) {
                    var brick = this.grid.get(rowNumber, columnNumber);
                    if (brick && brick.getState() != BRICK_EMPTY) {
                        if (this.context.checkCollision(
                            this.getX(),
                            this.getY(),
                            this.getSw(),
                            this.getSh(),
                            brick.getX(),
                            brick.getY(),
                            brick.getSw(),
                            brick.getSh())) {
                            brick.onHit(this.grid, rowNumber, columnNumber);
                            this.state = BOMB_STATE_BOOM;
                            this.finalTick = this.tick + bombBoomNumberOfTicks
                        }
                    }
                }
            }
        }
    }

    dropUntilTouchingPaddle() {
        if (this.state == BOMB_STATE_DROPPING) {
            this.bounceIfTouchingPaddle();
        }
        this.percentY += this.speedPercentY;
    }

    bounceIfTouchingPaddle() {
        if (this.context.checkCollision(
            this.paddle.getX(),
            this.paddle.getY(),
            this.paddle.getSw(),
            this.paddle.getSh(),
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        ) &&
        this.getY() > this.paddle.getY() &&
        this.getY() - this.speedPercentY < this.paddle.getY()) {
            this.speedPercentY *= -1;
            this.state = BOMB_STATE_BOMB;
            return true;
        }
        return false;
    }

    bounceIfTouchingLeft() {
        this.speedPercentX *= this.touchingLeft() ? -1 : 1;
    }

    bounceIfTouchingRight() {
        this.speedPercentX *= this.touchingRight() ? -1 : 1;
    }

    bounceIfTouchingTop() {
        this.speedPercentY *= this.touchingTop() ? -1 : 1;
    }

    bounceIfTouchingBottom() {
        this.speedPercentY *= this.touchingBottom() ? -1 : 1;
    }

    touchingLeft() {
        return this.getX() < this.context.getLeft();
    }

    touchingRight() {
        return this.getX() > this.context.getRight();
    }

    touchingTop() {
        return this.getY() < this.context.getTop();
    }

    touchingBottom() {
        return this.getY() > this.context.getBottom();
    }

    getX() {
        return this.context.getWidthPercent(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getHeightPercent(BOMB_PERCENT_WIDTH);
    }

    getSh() {
        return this.context.getHeightPercent(BOMB_PERCENT_HEIGHT);
    }
}