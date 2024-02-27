import {
    TRAMPOLINE_SRC, TRAMPOLINE_PERCENT_Y, TRAMPOLINE_PERCENT_W,
    TRAMPOLINE_PERCENT_H, TRAMPOLINE_IX, TRAMPOLINE_IY,
    TRAMPOLINE_W, TRAMPOLINE_H
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(TRAMPOLINE_SRC);

export class Paddle {
    constructor(context) {
        this.context = context;
    }

    update() {
        this.drawHitbox();
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.drawImage(
            this.context.getImage(TRAMPOLINE_SRC),
            TRAMPOLINE_IX,
            TRAMPOLINE_IY,
            TRAMPOLINE_W,
            TRAMPOLINE_H,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        );
    }

    getX() {
        return this.context.getMouseListener().mousePositionX;
    }

    getY() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_Y);
    }

    getSw() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_W);
    }

    getSh() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_H);
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