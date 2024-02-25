import { Boom } from "./../Boom.js";
import { loadImage } from "../../context/GameContext.js";

const SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Green-64x32.png"
await loadImage(SRC);

export class GreenBrick {
    constructor(context, xPercent, yPercent, wPercent, hPercent) {
        this.context = context;
        this.xPercent = xPercent;
        this.yPercent = yPercent;
        this.wPercent = wPercent;
        this.hPercent = hPercent;

        this.IX = 0;
        this.IY = 0;
        this.W = 64;
        this.H = 32;
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

    getImage() {
        return this.context.getImage(SRC);
    }

    onHit(grid, row, column) {
        grid.set(row, column, new Boom(
            this.context,
            this.xPercent,
            this.yPercent,
            this.wPercent * 3,
            this.hPercent * 3,
            100,
            row,
            column
        ));
    }

    getX() {
        return this.context.getWidthPercent(this.xPercent);
    }

    getY() {
        return this.context.getHeightPercent(this.yPercent);
    }

    getSw() {
        return this.context.getWidthPercent(this.wPercent);
    }

    getSh() {
        return this.context.getHeightPercent(this.hPercent);
    }

    drawHitbox() {
        let ctx = this.context.getCtx();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "White";
        ctx.rect(this.getX(), this.getY(), this.getSw(), this.getSh());
        ctx.stroke();
    }
}