import {
    BRICK_BLUE_SRC,
    BRICK_GRAY_SRC,
    BRICK_GREEN_SRC,
    BRICK_ORANGE_SRC,
    BRICK_PURPLE_SRC,
    BRICK_RED_SRC,
    BRICK_YELLOW_SRC
} from "./../configuration/GameConfiguration.js";
import { Brick } from "./Brick.js";

export class Grid {
    constructor(context, level) {
        this.context = context;
        this.level = level;
        this.numberOfRows = 30;
        this.numberOfColumns = 20;
        this.percentW = 100 / this.numberOfColumns;
        this.percentH = 100 / this.numberOfRows;
        this.grid = this.createGrid(level);
    }

    update(tick) {
        for (let r = 0; r < this.numberOfRows; r++) {
            for (let c = 0; c < this.numberOfColumns; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].update(tick);
                }
            }
        }
    }

    draw() {
        for (let r = 0; r < this.numberOfRows; r++) {
            for (let c = 0; c < this.numberOfColumns; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].draw();
                }
            }
        }
    }

    get(row, column) {
        return this.grid[row][column];
    }

    set(row, column, instance) {
        this.grid[row][column] = instance;
    }

    createGrid(levelNumber) {
        let grid = [];
        let level = this.context.getLevelConfiguration()
            .getLevel(levelNumber, this.numberOfRows, this.numberOfColumns);
        for (let r = 0; r < this.numberOfRows; r++) {
            let row = [];
            for (let c = 0; c < this.numberOfColumns; c++) {
                let brick = new Brick(
                    this.context,
                    this.percentW * c,
                    this.percentH * r,
                    this.percentW,
                    this.percentH
                )
                switch (level[r][c]) {
                    case "G":
                        brick.setState(BRICK_GREEN_SRC);
                        break;
                    case "Y":
                        brick.setState(BRICK_YELLOW_SRC);
                        break;
                    case "B":
                        brick.setState(BRICK_BLUE_SRC);
                        break;
                    case "P":
                        brick.setState(BRICK_PURPLE_SRC);
                        break;
                    case "O":
                        brick.setState(BRICK_ORANGE_SRC);
                        break;
                    case "R":
                        brick.setState(BRICK_RED_SRC);
                        break;
                    case "X":
                        brick.setState(BRICK_GRAY_SRC);
                        break;
                }
                row.push(brick);
            }
            grid.push(row);
        }
        return grid;
    }

    getNumberOfRows() {
        return this.numberOfRows;
    }

    getNumberOfColumns() {
        return this.numberOfColumns;
    }
}