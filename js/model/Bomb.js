import { GameOverScreen } from "../screen/GameOverScreen.js";
import {
    BOMB_H,
    BOMB_IX,
    BOMB_IY,
    BOMB_PERCENT_HEIGHT,
    BOMB_PERCENT_WIDTH,
    BOMB_PERCENT_X, BOMB_PERCENT_Y,
    bombSpeedPercentX,
    bombSpeedPercentY,
    BOMB_SRC,
    BOMB_STATE_BOMB,
    BOMB_STATE_BOOM,
    BOMB_STATE_DROPPING,
    BOMB_W,
    BOOM_H,
    BOOM_IX, BOOM_IY,
    BOOM_SRC,
    BOOM_W,
    BRICK_EMPTY,
    bombBoomNumberOfTicks,
    bombBoomSizeMultiplier,
    bombExplosionMultiplier
} from "./../configuration/GameConfiguration.js";
import { loadImage } from "./../context/GameContext.js";

await loadImage(BOMB_SRC);
await loadImage(BOOM_SRC);

export class Bomb {
    constructor(context, screen, grid, paddle) {
        this.paddle = paddle;
        this.screen = screen;
        this.grid = grid;
        this.context = context;
        this.percentX = BOMB_PERCENT_X;
        this.percentY = BOMB_PERCENT_Y;
        this.speedPercentX = bombSpeedPercentX;
        this.speedPercentY = bombSpeedPercentY;
        this.state = BOMB_STATE_DROPPING;
    }

    update(tick) {
        this.tick = tick;
        if (BOMB_STATE_DROPPING == this.state) {
            if (this.bounceIfCollidingPaddle()) {
                this.state = BOMB_STATE_BOMB;
            }
            this.gameOverIfCollidingBottomSide();
            this.moveY();
        } else if (BOMB_STATE_BOMB == this.state) {
            this.bounceIfCollidingPaddle();
            this.bounceIfCollidingLeftSide();
            this.bounceIfCollidingRightSide();
            this.bounceIfCollidingTopSide();
            this.gameOverIfCollidingBottomSide();
            this.moveX();
            this.moveY();
        } else if (BOMB_STATE_BOOM == this.state && this.tick > this.finalTick) {
            this.screen.deleteBomb(this);
            this.screen.addBomb();
        }
    }

    draw() {
        let ctx = this.context.getCtx();
        if (BOMB_STATE_DROPPING == this.state || BOMB_STATE_BOMB == this.state) {
            ctx.drawImage(
                this.context.getImage(BOMB_SRC),
                BOMB_IX,
                BOMB_IY,
                BOMB_W,
                BOMB_H,
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            );
        } else if (this.state == BOMB_STATE_BOOM) {
            ctx.drawImage(
                this.context.getImage(BOOM_SRC),
                BOOM_IX,
                BOOM_IY,
                BOOM_W,
                BOOM_H,
                this.getBoomX(),
                this.getBoomY(),
                this.getBoomW(),
                this.getBoomH()
            );
        }
    }

    moveX() {
        this.percentX += this.speedPercentX;
    }

    moveY() {
        this.percentY += this.speedPercentY;
    }

    bounceX() {
        this.speedPercentX *= -1;
    }

    bounceY() {
        this.speedPercentY *= -1;
    }

    onHit() {
        if (this.state == BOMB_STATE_BOMB) {
            for (let rowNumber = 0; rowNumber < this.grid.getNumberOfRows(); rowNumber++) {
                for (let columnNumber = 0; columnNumber < this.grid.getNumberOfColumns(); columnNumber++) {
                    var brick = this.grid.get(rowNumber, columnNumber);
                    if (brick && brick.getState() != BRICK_EMPTY) {
                        if (this.context.checkCollision(
                            this.getExplosionX(),
                            this.getExplosionY(),
                            this.getExplosionW(),
                            this.getExplosionH(),
                            brick.getX(),
                            brick.getY(),
                            brick.getSw(),
                            brick.getSh())) {
                            brick.onHit(this.grid, rowNumber, columnNumber);
                            this.state = BOMB_STATE_BOOM;
                            this.finalTick = this.tick + bombBoomNumberOfTicks
                        }
                    }
                }
            }
        }
    }

    bounceIfCollidingPaddle() {
        if (this.collidingPaddle()) {
            if (this.collidingPaddleX()) {
                this.bounceOnPaddle();
                this.moveX();
            }
            if (this.collidingPaddleY()) {
                this.bounceY();
                this.moveY();
            }
            return true;
        }
        return false;
    }

    bounceOnPaddle() {
        let paddleMiddleW = this.paddle.getW() / 2;
        let paddleMiddleX = this.paddle.getX() + paddleMiddleW;
        let bombMiddleX = this.getX() + (this.getW() / 2);
        let paddleDistanceW =
            bombMiddleX >= paddleMiddleX ?
                bombMiddleX - paddleMiddleX :
                -(paddleMiddleX - bombMiddleX);
        this.speedPercentX = bombSpeedPercentX * (paddleDistanceW / paddleMiddleW);
        this.speedPercentY = bombSpeedPercentY + (1 - Math.abs(this.speedPercentX));
    }

    bounceIfCollidingLeftSide() {
        if (this.collidingLeftSide()) {
            this.bounceX();
        }
    }

    bounceIfCollidingRightSide() {
        if (this.collidingRightSide()) {
            this.bounceX();
        }
    }

    bounceIfCollidingTopSide() {
        if (this.collidingTopSide()) {
            this.bounceY();
        }
    }

    gameOverIfCollidingBottomSide() {
        if (this.collidingBottomSide()) {
            this.context.setScreen(new GameOverScreen(this.context));
        }
    }

    collidingPaddle() {
        return this.context.checkCollision(
            this.getX(),
            this.getY(),
            this.getW(),
            this.getH(),
            this.paddle.getX(),
            this.paddle.getY(),
            this.paddle.getW(),
            this.paddle.getH());
    }

    collidingPaddleX() {
        return this.context.checkCollisionX(
            this.paddle.getX(),
            this.paddle.getW(),
            this.getX(),
            this.getW());
    }

    collidingPaddleY() {
        return this.context.checkCollisionY(
            this.paddle.getY(),
            this.paddle.getH(),
            this.getY(),
            this.getH());
    }

    collidingLeftSide() {
        return this.getX() <= this.context.getLeft();
    }

    collidingRightSide() {
        return this.getX() + this.getW() >= this.context.getRight();
    }

    collidingTopSide() {
        return this.getY() <= this.context.getTop();
    }

    collidingBottomSide() {
        return this.getY() + this.getH() >= this.context.getBottom();
    }

    getX() {
        return this.context.getWidthPercent(this.percentX);
    }

    getY() {
        return this.context.getHeightPercent(this.percentY);
    }

    getW() {
        return this.context.getHeightPercent(BOMB_PERCENT_WIDTH);
    }

    getH() {
        return this.context.getHeightPercent(BOMB_PERCENT_HEIGHT);
    }

    getExplosionX() {
        return this.getX() - (this.getExplosionW() / 2);
    }

    getExplosionY() {
        return this.getY() - (this.getExplosionH() / 2);
    }

    getExplosionW() {
        return this.getW() * bombExplosionMultiplier;
    }

    getExplosionH() {
        return this.getH() * bombExplosionMultiplier;
    }

    getBoomX() {
        return this.getX() - (this.getBoomW() / 2);
    }

    getBoomY() {
        return this.getY() - (this.getBoomH() / 2);
    }

    getBoomW() {
        return this.getW() * bombBoomSizeMultiplier;
    }

    getBoomH() {
        return this.getH() * bombBoomSizeMultiplier;
    }
}