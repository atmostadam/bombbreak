import {
    TRAMPOLINE_H,
    TRAMPOLINE_IX,
    TRAMPOLINE_IY,
    TRAMPOLINE_PERCENT_H,
    TRAMPOLINE_PERCENT_W,
    TRAMPOLINE_PERCENT_Y,
    TRAMPOLINE_SRC,
    TRAMPOLINE_W
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(TRAMPOLINE_SRC);

export class Paddle {
    constructor(context) {
        this.context = context;
    }

    update(tick) {
        this.tick = tick;
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
            this.getW(),
            this.getH()
        );
    }

    getX() {
        return this.context.getMouseListener().mousePositionX;
    }

    getY() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_Y);
    }

    getW() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_W);
    }

    getH() {
        return this.context.getHeightPercent(TRAMPOLINE_PERCENT_H);
    }
}