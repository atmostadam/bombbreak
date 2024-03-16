import { OpeningScreen } from "./OpeningScreen.js";

export class CreditsScreen {
    constructor(context) {
        this.context = context;
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {

    }

    onClick(x, y) {
        this.context.setScreen(new OpeningScreen(this.context));
    }
}