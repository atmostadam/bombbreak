export class Score {
    constructor(context) {
        this.context = context;
        this.score = 0;
    }

    update(tick) {

    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.font = "48px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(this.score, this.context.getWidth() - 100, 50);
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    increaseScore(amount) {
        this.score += amount;
    }

    resetScore() {
        this.score = 0;
    }
}