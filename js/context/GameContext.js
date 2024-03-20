import { LevelConfiguration } from "../configuration/LevelConfiguration.js";
import { Score } from "../model/Score.js";

const images = new Map();

export async function loadImage(url) {
    new Promise(
        response => {
            let image = new Image();
            image.onload = (() => response(image));
            image.src = url;
        }
    )
        .then(response => images.set(url, response))
        .catch(e => console.error(e));
}

export class GameContext {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.map = new Map();
        this.clear();
        this.level = 1;
        this.levelConfiguration = new LevelConfiguration(this);
        this.score = new Score(this);
    }

    putImage(url, image) {
        images.set(url, image);
    }

    getImage(url) {
        return images.get(url);
    }

    getMouseListener() {
        return this.mouseListener;
    }

    setMouseListener(mouseListener) {
        this.mouseListener = mouseListener;
    }

    setLevelConfiguration(levelConfiguration) {
        this.levelConfiguration = levelConfiguration;
    }

    getLevelConfiguration() {
        return this.levelConfiguration;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    getScreen() {
        return this.screen;
    }

    setScreen(screen) {
        this.screen = screen;
    }

    getLevel() {
        return this.level;
    }

    setLevel(level) {
        this.level = level;
    }

    increaseLevelByOne() {
        this.level++;
    }

    clear() {
        let canvasW = this.canvas.width;
        let canvasH = this.canvas.height;
        let clientW = this.canvas.getBoundingClientRect().width;
        let clientH = this.canvas.getBoundingClientRect().height;

        if (canvasW != clientW || canvasH != clientH) {
            this.canvas.width = clientW;
            this.canvas.height = clientH;
            this.width = clientW;
            this.height = clientH;
        }

        let ctx = this.getCtx();
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

    }

    checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return this.checkCollisionX(x1, w1, x2, w2) &&
            this.checkCollisionY(y1, h1, y2, h2);
    }

    checkCollisionX(x1, w1, x2, w2) {
        return x1 < x2 + w2 && x1 + w1 > x2;
    }

    checkCollisionY(y1, h1, y2, h2) {
        return y1 < y2 + h2 && y1 + h1 > y2;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getLeft() {
        return this.canvas.getBoundingClientRect().left;
    }

    getRight() {
        return this.getWidth();
    }

    getTop() {
        return this.canvas.getBoundingClientRect().top;
    }

    getBottom() {
        return this.getHeight();
    }

    getWidthPercent(percent) {
        return this.getWidth() * (percent / 100);
    }

    getHeightPercent(percent) {
        return this.getHeight() * (percent / 100);
    }

    getCtx() {
        return this.ctx;
    }

    getBoundingClientRect() {
        return this.canvas.getBoundingClientRect();
    }
}