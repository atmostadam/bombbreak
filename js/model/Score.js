import {
    GAMES_PLAYED_KEY,
    HIGH_SCORE_KEY,
    MAX_LEVEL_KEY
} from "./../configuration/GameConfiguration.js";

export class Score {
    constructor(context) {
        this.context = context;
        this.levelScore = 0;
        this.highScore = 0;
        this.gamesPlayed = 0;
        this.maxLevel = 0;
    }

    update(tick) {
        this.tick = tick;
    }

    draw() {
        let ctx = this.context.getCtx();
        ctx.font = "48px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(this.levelScore, this.context.getWidth() - 100, 50);
    }

    getLevelScore() {
        return this.levelScore;
    }

    setLevelScore(levelScore) {
        this.levelScore = levelScore;
    }

    increaseScore(amount) {
        this.levelScore += amount;
    }

    getHighScore() {
        return this.highScore;
    }

    setHighScore(highScore) {
        this.highScore = highScore;
    }

    getGamesPlayed() {
        return this.gamesPlayed;
    }

    setGamesPlayed(gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    getMaxLevel() {
        return this.maxLevel;
    }

    setMaxLevel(maxLevel) {
        this.maxLevel = maxLevel;
    }

    loadGame() {
        let cookieHighScore = localStorage.getItem(HIGH_SCORE_KEY);
        let cookieMaxLevel = localStorage.getItem(MAX_LEVEL_KEY);
        let cookieGamesPlayed = localStorage.getItem(GAMES_PLAYED_KEY);
        this.highScore = cookieHighScore ? cookieHighScore : 0;
        this.maxLevel = cookieMaxLevel ? cookieMaxLevel : 1;
        this.gamesPlayed = cookieGamesPlayed ? cookieGamesPlayed : 0;
    }

    nextLevel() {
        this.highScore += this.levelScore;
        this.levelScore = 0;
        this.context.increaseLevelByOne();
    }

    gameOver() {
        let cookieHighScore = localStorage.getItem(HIGH_SCORE_KEY);
        let cookieMaxLevel = localStorage.getItem(MAX_LEVEL_KEY);
        let cookieGamesPlayed = localStorage.getItem(GAMES_PLAYED_KEY);
        this.highScore += this.levelScore;
        this.levelScore = 0;
        if (this.highScore > cookieHighScore) {
            localStorage.setItem(HIGH_SCORE_KEY, this.highScore);
        }
        if (this.maxLevel > cookieMaxLevel) {
            localStorage.setItem(MAX_LEVEL_KEY, ++this.maxLevel);
        }
        if (this.currentGamesPlayed > cookieGamesPlayed) {
            localStorage.setItem(GAMES_PLAYED_KEY, ++this.gamesPlayed);
        }
    }
}