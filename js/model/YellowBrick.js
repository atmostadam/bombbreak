const SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Yellow-64x32.png"
//await loadImage(SRC, loadImage(SRC));

export class YellowBrick {
    constructor(context, cell) {
        this.context = context;
        this.cell = cell;
        this.IX = 0;
        this.IY = 0;
        this.W = 64;
        this.H = 32;
        this.setHp(2);
    }

    getImage() {
        return this.context.getImage(SRC);
    }

    decreaseHp() {
        this.hp--;
        //return new GreenBrickTile(this.context, this.row, this.column);
    }

    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp; }
}