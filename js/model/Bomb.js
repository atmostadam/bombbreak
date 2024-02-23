import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/publicdomain/public-domain-red-bomb.png"
await loadImage(SRC);

export class Bomb {
    constructor(context) {
        this.IX = 0;
        this.IY = 0;
        this.W = 1500;
        this.H = 1500;

        this.PERCENT_X = 45;
        this.PERCENT_Y = 90;
        this.PERCENT_W = 8;
        this.PERCENT_H = 8;
        this.SPEED_X = 5;
        this.SPEED_Y = 5;

        this.HITBOX_PERCENT = 2;

        this.context = context;

        this.speedX = this.SPEED_X;
        this.speedY = this.SPEED_Y;
    }

    update() {
        /*
        this.hitboxX = this.getX() - this.context.getHeightPercent(this.HITBOX_PERCENT / 2);
        this.hitboxY = this.getY() - this.context.getHeightPercent(this.HITBOX_PERCENT / 2);
        this.hitboxSW = this.getSw() + this.context.getHeightPercent(this.HITBOX_PERCENT);
        this.hitboxSH = this.getSw() + this.context.getHeightPercent(this.HITBOX_PERCENT);
        */

        if (!this.bounceIfTouchingLeft()) {
            this.bounceIfTouchingRight();
        }
        if (!this.bounceIfTouchingTop()) {
            this.bounceIfTouchingBottom();
        }
        this.x += this.SPEED_X;
        this.y += this.SPEED_Y;
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
    }

    bounceIfTouchingLeft() {
        this.speedX *= this.touchingLeft() ? -1 : 1;
        return this.touchingLeft();
    }

    bounceIfTouchingRight() {
        this.speedX *= this.touchingRight() ? -1 : 1;
        return this.touchingRight();
    }

    bounceIfTouchingTop() {
        this.speedY *= this.touchingTop() ? -1 : 1;
        return this.touchingTop();
    }

    bounceIfTouchingBottom() {
        this.speedY *= this.touchingBottom() ? -1 : 1;
        return this.touchingBottom();
    }

    touchingLeft() {
        return this.x < this.context.getLeft();
    }

    touchingRight() {
        return this.x > this.context.getRight();
    }

    touchingTop() {
        return this.y < this.context.getTop();
    }

    touchingBottom() {
        return this.y > this.context.getBottom();
    }

    getX() {
        return this.context.getWidthPercent(this.PERCENT_X);
    }

    getY() {
        return this.context.getHeightPercent(this.PERCENT_Y);
    }

    getSw() {
        return this.context.getHeightPercent(this.PERCENT_W);
    }

    getSh() {
        return this.context.getHeightPercent(this.PERCENT_H);
    }
}