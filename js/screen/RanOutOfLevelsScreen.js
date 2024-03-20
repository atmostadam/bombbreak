export class RanOutOfLevelsScreen {
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
            "Rachel & Nathan - BUILD MORE LEVELS!!!",
            this.context.getWidthPercent(20),
            this.context.getHeightPercent(48));
    }
}