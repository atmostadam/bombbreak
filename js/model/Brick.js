import {
    EXPLOSION_SRC,
    BRICK_BLUE_POINTS,
    BRICK_BLUE_SRC,
    BRICK_EMPTY,
    BRICK_GRAY_SRC,
    BRICK_GREEN_POINTS,
    BRICK_GREEN_SRC,
    BRICK_H,
    BRICK_ORANGE_POINTS,
    BRICK_ORANGE_SRC,
    BRICK_PURPLE_POINTS,
    BRICK_PURPLE_SRC,
    BRICK_RED_POINTS,
    BRICK_RED_SRC,
    BRICK_W,
    BRICK_YELLOW_POINTS,
    BRICK_YELLOW_SRC,
    explosionNumberOfTicks,
    EXPLOSION_W,
    EXPLOSION_H
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(BRICK_BLUE_SRC);
await loadImage(BRICK_GRAY_SRC);
await loadImage(BRICK_GREEN_SRC);
await loadImage(BRICK_ORANGE_SRC);
await loadImage(BRICK_PURPLE_SRC);
await loadImage(BRICK_RED_SRC);
await loadImage(BRICK_YELLOW_SRC);
await loadImage(EXPLOSION_SRC);

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
        if (EXPLOSION_SRC == this.state) {
            var w = EXPLOSION_W;
            var h = EXPLOSION_H;
            // TODO: Add some fireworks
        } else {
            var w = BRICK_W;
            var h = BRICK_H;
        }
        ctx.drawImage(
            this.context.getImage(this.state),
            0,
            0,
            w,
            h,
            this.getX(),
            this.getY(),
            this.getSw(),
            this.getSh()
        );
    }

    onHit() {
        switch (this.state) {
            case BRICK_GREEN_SRC:
                this.state = EXPLOSION_SRC;
                this.context.getScore().increaseScore(BRICK_GREEN_POINTS);
                this.finalTick = this.tick + explosionNumberOfTicks;
                break;
            case BRICK_YELLOW_SRC:
                this.state = BRICK_GREEN_SRC;
                this.context.getScore().increaseScore(BRICK_YELLOW_POINTS);
                break;
            case BRICK_BLUE_SRC:
                this.state = BRICK_YELLOW_SRC;
                this.context.getScore().increaseScore(BRICK_BLUE_POINTS);
                break;
            case BRICK_PURPLE_SRC:
                this.state = BRICK_BLUE_SRC;
                this.context.getScore().increaseScore(BRICK_PURPLE_POINTS);
                break;
            case BRICK_ORANGE_SRC:
                this.state = BRICK_PURPLE_SRC;
                this.context.getScore().increaseScore(BRICK_ORANGE_POINTS);
                break;
            case BRICK_RED_SRC:
                this.state = BRICK_ORANGE_SRC;
                this.context.getScore().increaseScore(BRICK_RED_POINTS);
                break;
        }
    }

    getX() {
        return this.context.getWidthPercent(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getSw() {
        return this.context.getWidthPercent(this.percentW);
    }

    getSh() {
        return this.context.getHeightPercent(this.percentH);
    }

    getState() {
        return this.state;
    }

    isEmpty() {
        if (BRICK_EMPTY == this.state || EXPLOSION_SRC == this.state) {
            return true;
        }
        return false;
    }

    setState(state) {
        this.state = state;
    }
}