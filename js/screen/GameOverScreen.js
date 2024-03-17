import { GameScreen } from "./GameScreen.js";

export class GameOverScreen {
    constructor(context) {
        this.context = context;
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.font = "50pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "GAME OVER. Click to START",
            this.context.getWidthPercent(30),
            this.context.getHeightPercent(48));
    }

    onClick(x, y) {
        this.context.setScreen(new GameScreen(this.context));
    }
}