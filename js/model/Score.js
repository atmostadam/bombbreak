import {
    GAMES_PLAYED_KEY,
    HIGH_SCORE_KEY,
    MAX_LEVEL_KEY
} from "./../configuration/GameConfiguration.js";

export class Score {
    constructor(context) {
        this.context = context;
        this.newGame();
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.font = "48px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(this.levelScore, this.context.getWidth() - 150, 50);
    }

    newGame() {
        this.levelScore = 0;
        this.gameScore = 0;
    }

    nextLevel() {
        this.gameScore += this.levelScore;
        this.levelScore = 0;
        this.context.increaseLevelByOne();
    }

    gameOver() {
        this.gameScore += this.levelScore;
        this.levelScore = 0;
        if (this.getGameScore() > this.getHighScore()) {
            localStorage.setItem(HIGH_SCORE_KEY, this.getGameScore());
        }
        if (this.context.getLevel() > this.getMaxLevel()) {
            localStorage.setItem(MAX_LEVEL_KEY, this.context.getLevel());
        }
        localStorage.setItem(GAMES_PLAYED_KEY, this.getGamesPlayed() + 1);
    }

    increaseScore(amount) {
        this.levelScore += amount;
    }

    getLevelScore() {
        return this.levelScore;
    }

    getGameScore() {
        return this.gameScore;
    }

    getHighScore() {
        if (!localStorage.getItem(HIGH_SCORE_KEY)) {
            localStorage.setItem(HIGH_SCORE_KEY, 0);
        }
        return Number(localStorage.getItem(HIGH_SCORE_KEY));
    }

    getMaxLevel() {
        if (!localStorage.getItem(MAX_LEVEL_KEY)) {
            localStorage.setItem(MAX_LEVEL_KEY, 0);
        }
        return Number(localStorage.getItem(MAX_LEVEL_KEY));
    }

    getGamesPlayed() {
        if (!localStorage.getItem(GAMES_PLAYED_KEY)) {
            localStorage.setItem(GAMES_PLAYED_KEY, 0);
        }
        return Number(localStorage.getItem(GAMES_PLAYED_KEY));
    }
}