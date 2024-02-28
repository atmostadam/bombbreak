import {
    BOMB_STATE_DROPPING, BOMB_STATE_BOMB, BOMB_STATE_BOOM, BOMB_IX,
    BOMB_IY, BOMB_W, BOMB_H, BOMB_PERCENT_WIDTH, BOMB_PERCENT_HEIGHT,
    BOMB_PERCENT_X, BOMB_PERCENT_Y, BOMB_SPEED_PERCENT_X,
    BOMB_SPEED_PERCENT_Y, BOMB_BOOM_NUMBER_OF_TICKS, BRICK_EMPTY, BOMB_SRC,
    BOOM_SRC, BOOM_IX, BOOM_IY, BOOM_W, BOOM_H, BOMB_BOOM_SIZE_MULTIPLIER
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(BOMB_SRC);
await loadImage(BOOM_SRC);

export class Bomb {
    constructor(context) {
        this.context = context;
        this.percentX = BOMB_PERCENT_X;
        this.percentY = BOMB_PERCENT_Y;
        this.speedPercentX = BOMB_SPEED_PERCENT_X;
        this.speedPercentY = BOMB_SPEED_PERCENT_Y;
        this.state = BOMB_STATE_DROPPING;
    }

    update(tick) {
        this.tick = tick;
        this.drawHitbox();
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
            this.context.deleteBomb(this);
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
                this.getSw() * BOMB_BOOM_SIZE_MULTIPLIER,
                this.getSh() * BOMB_BOOM_SIZE_MULTIPLIER
            );
        }
    }

    onHit() {
        if (this.state == BOMB_STATE_BOMB) {
            for (let rowNumber = 0; rowNumber < this.context.getGrid().getNumberOfRows(); rowNumber++) {
                for (let columnNumber = 0; columnNumber < this.context.getGrid().getNumberOfColumns(); columnNumber++) {
                    var brick = this.context.getGrid().get(rowNumber, columnNumber);
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
                            brick.onHit(this.context.getGrid(), rowNumber, columnNumber);
                            this.state = BOMB_STATE_BOOM;
                            this.finalTick = this.tick + BOMB_BOOM_NUMBER_OF_TICKS
                        }
                    }
                }
            }
        }
    }

    dropUntilTouchingPaddle() {
        if (this.state == BOMB_STATE_DROPPING && this.bounceIfTouchingPaddle()) {
            this.state = BOMB_STATE_BOMB;
        }
        this.percentY += this.speedPercentY;
    }

    bounceIfTouchingPaddle() {
        let paddle = this.context.getPaddle();
        if (this.context.checkCollision(
            paddle.getX(),
            paddle.getY(),
            paddle.getSw(),
            paddle.getSh(),
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        )) {
            this.speedPercentY *= -1;
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
        return this.context.getWidtpercentH(this.percentX);
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

    drawHitbox() {
        let ctx = this.context.getCtx();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "Red";
        ctx.rect(this.getX(), this.getY(), this.getSw(), this.getSh());
        ctx.stroke();
    }
}