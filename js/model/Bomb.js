import { loadImage } from "./../context/GameContext.js";
import { Boom } from "./Boom.js";

const SRC = "./images/publicdomain/public-domain-red-bomb.png"
await loadImage(SRC);

export class Bomb {
    constructor(context) {
        this.IX = 0;
        this.IY = 0;
        this.W = 1500;
        this.H = 1500;

        this.percentX = 45;
        this.percentY = 1;
        this.speedPercentX = 1.5;
        this.speedPercentY = 1.5;
        this.PERCENT_W = 8;
        this.PERCENT_H = 8;
        this.DROP_SPEED_PERCENT = 2;

        this.HITBOX_PERCENT = 2;

        this.context = context;
    }

    update(tick) {
        this.drawHitbox();
        if (!this.dropped) {
            this.dropUntilTouchingPaddle();
            return;
        }
        this.bounceIfTouchingPaddle();
        this.bounceIfTouchingLeft();
        this.bounceIfTouchingRight();
        this.bounceIfTouchingTop();
        this.bounceIfTouchingBottom();
        this.percentX += this.speedPercentX;
        this.percentY -= this.speedPercentY;
        if (this.explosion) {
            this.explosion.update(tick);
        }
        if (this.boom) {
            this.boom.update(tick);
        }
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.drawImage(
            this.context.getImage(SRC),
            this.IX,
            this.IY,
            this.W,
            this.H,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        );
        if (this.explosion) {
            this.explosion.draw();
        }
        if (this.boom) {
            this.boom.draw();
        }
    }

    onHit() {
        if (!this.dropped) {
            return;
        }
        for (let rowNumber = 0; rowNumber < this.context.getGrid().getNumberOfRows(); rowNumber++) {
            for (let columnNumber = 0; columnNumber < this.context.getGrid().getNumberOfColumns(); columnNumber++) {
                var brick = this.context.getGrid().get(rowNumber, columnNumber);
                if (brick && !(brick instanceof Boom)) {
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
                    }
                }
            }
        }

        this.boom = new Boom(
            this.context,
            this.percentX - (this.PERCENT_W * 2.5),
            this.percentY,
            this.PERCENT_W * 3,
            this.PERCENT_H * 3,
            20);

        this.reset();
    }

    dropUntilTouchingPaddle() {
        if (this.bounceIfTouchingPaddle()) {
            this.dropped = true;
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
        return this.context.getWidthPercent(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getHeightPercent(this.PERCENT_W);
    }

    getSh() {
        return this.context.getHeightPercent(this.PERCENT_H);
    }

    reset() {
        this.percentX = 45;
        this.percentY = 1;
        this.dropped = false;
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