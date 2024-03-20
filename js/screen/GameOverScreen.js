import { GameScreen } from "./GameScreen.js";

export class GameOverScreen {
    constructor(context) {
        this.context = context;
        this.context.getScore().gameOver();
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        let ctx = this.context.getCtx();

        ctx.font = "60pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "GAME OVER",
            this.context.getWidthPercent(38),
            this.context.getHeightPercent(10));

        ctx.font = "50pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Click to START",
            this.context.getWidthPercent(39),
            this.context.getHeightPercent(25));

        ctx.font = "32pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Current Score: " + this.context.getScore().getGameScore(),
            this.context.getWidthPercent(30),
            this.context.getHeightPercent(35));

        ctx.font = "32pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "High Score Score: " + this.context.getScore().getHighScore(),
            this.context.getWidthPercent(30),
            this.context.getHeightPercent(45));

        ctx.font = "32pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Highest Level: " + this.context.getScore().getMaxLevel(),
            this.context.getWidthPercent(30),
            this.context.getHeightPercent(55));

        ctx.font = "32pt Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(
            "Games Played: " + this.context.getScore().getGamesPlayed(),
            this.context.getWidthPercent(30),
            this.context.getHeightPercent(65));
    }

    onClick(x, y) {
        this.context.getScore().newGame();
        this.context.setScreen(new GameScreen(this.context));
    }
}