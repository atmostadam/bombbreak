
export class Paddle {
    constructor(context) {
        this.context = context;
        this.COLOR = "green";
        this.PERCENT_Y = 97;
        this.PERCENT_W = 10;
        this.PERCENT_H = 3;
    }

    update() {

    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.fillStyle = this.COLOR;
        ctx.fillRect(
            this.context.getMouseListener().mousePositionX,
            this.context.getHeightPercent(this.PERCENT_Y),
            this.context.getWidthPercent(this.PERCENT_W),
            this.context.getHeightPercent(this.PERCENT_H));
    }
}