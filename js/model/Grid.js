import { YellowBrick } from "./brick/YellowBrick.js";

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
                switch (level[r][c]) {
                    case "Y":
                        row.push(new YellowBrick(
                            this.context,
                            this.percentW * c,
                            this.percentH * r,
                            this.percentW,
                            this.percentH));
                        break;
                    case 0:
                        text = "Today is Sunday";
                        break;
                    default:
                        row.push(null);
                }
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