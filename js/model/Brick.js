import {
    BRICK_BLUE_SRC, BRICK_GRAY_SRC, BRICK_GREEN_SRC,
    BRICK_ORANGE_SRC, BRICK_PURPLE_SRC, BRICK_RED_SRC,
    BRICK_YELLOW_SRC, BRICK_STATE_EMPTY
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "../../context/GameContext.js";

await loadImage(BRICK_BLUE_SRC);
await loadImage(BRICK_GRAY_SRC);
await loadImage(BRICK_GREEN_SRC);
await loadImage(BRICK_ORANGE_SRC);
await loadImage(BRICK_PURPLE_SRC);
await loadImage(BRICK_RED_SRC);
await loadImage(BRICK_YELLOW_SRC);

export class Brick {
    constructor(context, percentX, percentY, percentW, percentH) {
        this.context = context;
        this.percentX = percentX;
        this.percentY = percentY;
        this.percentW = percentW;
        this.percentH = percentH;
        this.state = BRICK_EMPTY;
    }

    export const BRICK_STATE_GREEN = "green";
    export const BRICK_STATE_YELLOW = "yellow";
    export const BRICK_STATE_BLUE = "blue";
    export const BRICK_STATE_PURPLE = "purple";
    export const BRICK_STATE_ORANGE = "orange";
    export const BRICK_STATE_RED = "red";
    export const BRICK_STATE_GRAY = "gray";


    update() {
        switch (this.state) {
            case BRICK_STATE_GREEN:
                this.state = BRICK_STATE_EMPTY;
                break;
            case BRICK_STATE_YELLOW:
                this.state = BRICK_STATE_GREEN;
                break;
            case BRICK_STATE_BLUE:
                this.state = BRICK_STATE_YELLOW;
                break;
            case BRICK_STATE_PURPLE:
                this.state = BRICK_STATE_BLUE;
                break;
            case BRICK_STATE_ORANGE:
                this.state = BRICK_STATE_PURPLE;
                break;
            case BRICK_STATE_RED:
                this.state = BRICK_STATE_ORANGE;
                break;
        }
        this.drawHitbox();
    }

    draw() {
        if (BRICK_STATE_EMPTY == this.state) {
            return;
        }
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