import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/publicdomain/public-domain-trampoline.png"
await loadImage(SRC);

export class Paddle {
    constructor(context) {
        this.context = context;

        this.IX = 0;
        this.IY = 0;
        this.W = 600;
        this.H = 302;
        this.COLOR = "green";
        this.PERCENT_Y = 90;
        this.PERCENT_W = 20;
        this.PERCENT_H = 10;
    }

    update() {
        this.drawHitbox();
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

    onHit() {

    }

    getX() {
        return this.context.getMouseListener().mousePositionX;
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

    drawHitbox() {
        let ctx = this.context.getCtx();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "Green";
        ctx.rect(this.getX(), this.getY(), this.getSw(), this.getSh());
        ctx.stroke();
    }
}