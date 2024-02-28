import {
    BRICK_BLUE_SRC, BRICK_GRAY_SRC, BRICK_GREEN_SRC, BRICK_ORANGE_SRC,
    BRICK_PURPLE_SRC, BRICK_RED_SRC, BRICK_YELLOW_SRC, BOOM_SRC,
    BRICK_EMPTY, BRICK_W, BRICK_H, BRICK_IX, BRICK_IY, BRICK_BOOM_NUMBER_OF_TICKS,
    BRICK_GREEN_POINTS, BRICK_YELLOW_POINTS, BRICK_BLUE_POINTS,
    BRICK_PURPLE_POINTS, BRICK_ORANGE_POINTS, BRICK_RED_POINTS
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(BRICK_BLUE_SRC);
await loadImage(BRICK_GRAY_SRC);
await loadImage(BRICK_GREEN_SRC);
await loadImage(BRICK_ORANGE_SRC);
await loadImage(BRICK_PURPLE_SRC);
await loadImage(BRICK_RED_SRC);
await loadImage(BRICK_YELLOW_SRC);
await loadImage(BOOM_SRC);

export class Brick {
    constructor(context, percentX, percentY, percentW, percentH) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = percentW;
        this.percentH = percentH;
        this.state = BRICK_EMPTY;
    }

    update(tick) {
        this.tick = tick;
        if (this.tick > this.finalTick) {
            this.state = BRICK_EMPTY;
            this.finalTick = null;
        }
    }

    draw() {
        if (BRICK_EMPTY == this.state) {
            return;
        }
        let ctx = this.context.getCtx();
        ctx.drawImage(
            this.context.getImage(this.state),
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

    onHit() {
        switch (this.state) {
            case BRICK_GREEN_SRC:
                this.state = BRICK_EMPTY;
                this.context.increaseScore(BRICK_GREEN_POINTS);
                this.finalTick = this.tick + BRICK_BOOM_NUMBER_OF_TICKS;
                break;
            case BRICK_YELLOW_SRC:
                this.state = BRICK_STATE_GREEN;
                this.context.increaseScore(BRICK_YELLOW_POINTS);
                break;
            case BRICK_BLUE_SRC:
                this.state = BRICK_YELLOW_SRC;
                this.context.increaseScore(BRICK_BLUE_POINTS);
                break;
            case BRICK_PURPLE_SRC:
                this.state = BRICK_BLUE_SRC;
                this.context.increaseScore(BRICK_PURPLE_POINTS);
                break;
            case BRICK_ORANGE_SRC:
                this.state = BRICK_PURPLE_SRC;
                this.context.increaseScore(BRICK_ORANGE_POINTS);
                break;
            case BRICK_RED_SRC:
                this.state = BRICK_ORANGE_SRC;
                this.context.increaseScore(BRICK_RED_POINTS);
                break;
        }
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

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
}