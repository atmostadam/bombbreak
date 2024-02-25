import { BOOM_IX, BOOM_IY, BOOM_W, BOOM_H } from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/publicdomain/public-domain-boom.png"
await loadImage(SRC);

export class Boom {
    constructor(context, percentX, percentY, percentW, percentH, numberOfTicks, row, column) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = percentW;
        this.percentH = percentH;
        this.numberOfTicks = numberOfTicks;
        this.row = row;
        this.column = column;
    }

    update(tick) {
        this.tick = tick;
        if (!this.finalTick) {
            this.finalTick = tick + this.numberOfTicks;
        }
        if (tick > this.finalTick) {
            if (this.row &&
                this.column &&
                this.context.getGrid().get(this.row, this.column)) {
                this.context.getGrid().set(this.row, this.column, null);
            }
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