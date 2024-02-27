import {
    HIGHEST_SCORE_KEY, HIGHEST_LEVEL_KEY, GAMES_PLAYED_KEY,
} from "./../configuration/GameConfiguration.js";

export class ScoreHandler {
    constructor(context) {
        this.context = context;
        this.score = score;
    }

    increaseScore(increase) {
        this.setScore(this.getScore() + increase);
    }

    increaseGamesPlayed() {
        this.setGamesPlayed(this.getGamesPlayed() + 1);
    }

    nextLevel() {
        this.setLevel(this.getLevel() + 1);
    }

    resetScore() {
        this.setScore(0);
    }

    getHighScore() {
        return localStorage.getItem(HIGHEST_SCORE_KEY);
    }

    setHiscore(highscore) {
        let currentHighscore = getHighScore();
        if(highscore > currentHighscore) {
            localStorage.setItem(HIGHEST_SCORE_KEY, highscore);
        }
        return this;
    }

    getHighestLevel() {
        return localStorage.getItem(HIGHEST_LEVEL_KEY);
    }

    getGamesPlayed() {
        return localStorage.getItem(GAMES_PLAYED_KEY);
    }
}