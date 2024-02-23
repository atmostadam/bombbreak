import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/publicdomain/public-domain-boom.png"
await loadImage(SRC);

export class Boom {
    constructor(context, xPercent, yPercent, wPercent, hPercent) {
        this.context = context;
        this.xPercent = xPercent;
        this.yPercent = yPercent;
        this.wPercent = wPercent;
        this.hPercent = hPercent;

        this.IX = 0;
        this.IY = 0;
        this.W = 1500;
        this.H = 1500;
    }

    update() {

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

    getX() {
        return this.context.getWidthPercent(this.xPercent);
    }

    getY() {
        return this.context.getHeightPercent(this.yPercent);
    }

    getSw() {
        return this.context.getHeightPercent(this.wPercent);
    }

    getSh() {
        return this.context.getHeightPercent(this.hPercent);
    }
}