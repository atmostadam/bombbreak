import { GameScreen } from "./GameScreen.js";

export class ScoreScreen {
    constructor(context) {
        this.context = context;
    }

    onClick(x, y) {
        this.context.setScreen(new GameScreen(this.context));
    }
}