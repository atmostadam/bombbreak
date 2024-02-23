const SRC = "./images/publicdomain/public-domain-boom.png"
//await loadImage(SRC, loadImage(SRC));

export class Explosion {
    constructor(context, cell) {
        this.context = context;
        this.IX = 0;
        this.IY = 0;
        this.W = 1500;
        this.H = 1500;
        this.x = cell.x;
        this.y = cell.y;
        this.sw = cell.w * 1.2;
        this.sh = cell.w * 1.2;
        this.cell = cell;
    }

    init() {
        this.finalTick = this.tick + 20;
        this.loaded = true;
    }

    update(tick) {
        super.update(tick);
    }

    draw() {
        super.draw();
        if (this.finalTick < this.tick) {
            this.cell.setImage(null);
        }
    }

    getImage() {
        return this.context.getImage(SRC);
    }
}