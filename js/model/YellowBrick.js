import { loadImage } from "./../context/GameContext.js";

const SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Yellow-64x32.png"
await loadImage(SRC);

export class YellowBrick {
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

        this.setHp(2);
    }

    update() {

    }

    draw() {
        console.warn(this.context.getImage(SRC),
            this.IX,
            this.IY,
            this.W,
            this.H,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh(), this);

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

    decreaseHp() {
        this.hp--;
        //return new GreenBrickTile(this.context, this.row, this.column);
    }

    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp; }

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
}