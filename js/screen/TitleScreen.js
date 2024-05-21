import { GameScreen } from "./GameScreen.js";

export class TitleScreen {
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
            "Click to START",
            this.context.getWidthPercent(40),
            this.context.getHeightPercent(48));
    }

    onClick(x, y) {
        this.context.getScore().newGame();
        this.context.setScreen(new GameScreen(this.context));
    }
}