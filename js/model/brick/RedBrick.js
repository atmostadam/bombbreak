import { BRICK_IX, BRICK_IY, BRICK_W, BRICK_H } from "../../configuration/GameConfiguration.js";
import { GreenBrick } from "./GreenBrick.js";
import { loadImage } from "../../context/GameContext.js";

const SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Red-64x32.png"
await loadImage(SRC);

export class RedBrick {
    constructor(context, percentX, percentY, percentW, percentH) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = percentW;
        this.percentH = percentH;
    }

    update() {
        this.drawHitbox();
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.drawImage(
            this.context.getImage(SRC),
            BRICK_IX,
            BRICK_IY,
            BRICK_W,
            BRICK_H,
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
        grid.set(row, column, new GreenBrick(
            this.context,
            this.percentX,
            this.percentY,
            this.percentW,
            this.percentH,
        ));
    }

    getX() {
        return this.context.getWidtpercentH(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getWidtpercentH(this.percentW);
    }

    getSh() {
        return this.context.getHeightPercent(this.percentH);
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