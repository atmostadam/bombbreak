import { YellowBrick } from "./YellowBrick.js";

export class Grid {
    constructor(context, level) {
        this.context = context;
        this.level = level;
        this.numberOfRows = 30;
        this.numberOfColumns = 20;
        this.columnPercentArray = this.percentArray(this.numberOfColumns);
        this.rowPercentArray = this.percentArray(this.numberOfRows);
        this.grid = this.createGrid(level);
    }

    update() {
        for (let r = 0; r < this.numberOfRows; r++) {
            for (let c = 0; c < this.numberOfColumns; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].update();
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

    createGrid(levelNumber) {
        let grid = [];
        let level = this.context.getLevelConfiguration().getLevel(levelNumber, this.numberOfRows);
        for (let r = 0; r < this.numberOfRows; r++) {
            let row = [];
            for (let c = 0; c < this.numberOfColumns; c++) {
                switch (level[r][c]) {
                    case "Y":
                        row.push(new YellowBrick());
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

    percentArray(number) {
        let arr = [];
        for (let i = 0; i < number; i++) {
            arr.push(100 / number);
        }
        return arr;
    }

    getNumberOfRows() {
        return this.numberOfRows;
    }

    getNumberOfColumns() {
        return this.numberOfColumns;
    }
}