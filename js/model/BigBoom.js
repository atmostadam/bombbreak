import { BIG_BOOM_PERCENT_WIDTH, BIG_BOOM_PERCENT_HEIGHT, BOOM_IX, BOOM_IY, BOOM_W, BOOM_H }
    from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/publicdomain/public-domain-boom.png"
await loadImage(SRC);

export class BigBoom {
    constructor(context, percentX, percentY) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = BIG_BOOM_PERCENT_WIDTH;
        this.percentH = BIG_BOOM_PERCENT_HEIGHT;
        this.numberOfTicks = numberOfTicks;
    }

    update(tick) {
        if (!this.finalTick) {
            this.finalTick = tick + this.numberOfTicks;
        }
        this.drawHitbox();
    }

    draw() {
        if (this.tick > this.finalTick) {
            return;
        }
        let ctx = this.context.getCtx();
        ctx.drawImage(
            this.context.getImage(SRC),
            BOOM_IX,
            BOOM_IY,
            BOOM_W,
            BOOM_H,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        );
    }

    getImage() {
        return this.context.getImage(SRC);
    }

    getX() {
        return this.context.getWidtpercentH(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getHeightPercent(this.percentW);
    }

    getSh() {
        return this.context.getHeightPercent(this.percentH);
    }

    drawHitbox() {
        let ctx = this.context.getCtx();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "Orange";
        ctx.rect(this.getX(), this.getY(), this.getSw(), this.getSh());
        ctx.stroke();
    }
}