import { LevelConfiguration } from "../configuration/LevelConfiguration.js";
import { Grid } from "../model/Grid.js";
import { MouseListener } from "./../listener/MouseListener.js";

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

/**
 * The context for the game in reference to Inversion of Control, Shared Map Key/Values and Singleton
 * class lookup.
 */
export class GameContext {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        new MouseListener(this);
        this.map = new Map();
        this.levelConfiguration = new LevelConfiguration();
        this.grid = new Grid(this, 1);

        this.WIDTH_BUFFER = 18;
        this.HEIGHT_BUFFER = 30;

        this.clear();
    }

    putImage(url, image) {
        images.set(url, image);
    }

    getImage(url) {
        return images.get(url);
    }

    getLevelConfiguration() {
        return this.levelConfiguration;
    }

    getGrid() {
        return this.grid;
    }

    clear() {
        let canvasW = this.canvas.width;
        let canvasH = this.canvas.height;
        let clientW = this.canvas.getBoundingClientRect().width;
        let clientH = this.canvas.getBoundingClientRect().height;

        if (canvasW != clientW || canvasH != clientH) {
            this.canvas.width = clientW;
            this.canvas.height = clientH;
            this.width = clientW - this.WIDTH_BUFFER;
            this.height = clientH - this.HEIGHT_BUFFER;
        }

        let ctx = this.getCtx();
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

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

    getMouseListener() {
        return this.mouseListener;
    }

    setMouseListener(mouseListener) {
        this.mouseListener = mouseListener;
    }

    getBoundingClientRect() {
        return this.canvas.getBoundingClientRect();
    }

    checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return (
            x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2
        );
    }
}