import { LevelConfiguration } from "../configuration/LevelConfiguration.js";
import { Grid } from "../model/Grid.js";
import { MouseListener } from "./../listener/MouseListener.js";

/**
 * The context for the game in reference to Inversion of Control, Shared Map Key/Values and Singleton
 * class lookup.
 */
export class GameContext {
    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.mouseListener = new MouseListener(this);
        this.map = new Map();
        this.imageMap = new Map();
        this.levelConfiguration = new LevelConfiguration();
        this.grid = new Grid(this, 1);

        this.WIDTH_BUFFER = 18;
        this.HEIGHT_BUFFER = 30;
    }

    putImage(url, image) {
        this.imageMap.set(url, image);
    }

    getImage(url) {
        return this.imageMap.get(url);
    }

    getMouseListener() {
        return this.mouseListener;
    }

    getLevelConfiguration() {
        return this.levelConfiguration;
    }

    getGrid() {
        return this.grid;
    }

    clear() {
        let ctx = this.getCtx();
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }

    getWidth() {
        return this.canvas.getBoundingClientRect().width - this.WIDTH_BUFFER;
    }

    getHeight() {
        return this.canvas.getBoundingClientRect().height - this.HEIGHT_BUFFER;
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
}