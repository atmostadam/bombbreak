// AWS blocks js access to load properties files without paid Amazon IAM.
// Use variables instead of configuration files.

export var bombBoomNumberOfTicks = 20;
export var bombBoomSizeMultiplier = 5;
export var bombExplosionMultiplier = 5;
export var bombSpeedPercentX = 2;
export var bombSpeedPercentY = 2;
export var bombDropSpeedPercent = 3;

export var explosionNumberOfTicks = 20;

export const BOMB_STATE_BOMB = "bomb";
export const BOMB_STATE_BOOM = "boom";
export const BOMB_STATE_DROPPING = "dropping";
export const BOMB_SRC = "./images/publicdomain/public-domain-red-bomb.png";
export const HIGH_SCORE_KEY = "bomb.break.highest.score";
export const MAX_LEVEL_KEY = "bomb.break.highest.level";
export const GAMES_PLAYED_KEY = "bomb.break.games.played";

export const BOMB_PERCENT_X = 45;
export const BOMB_PERCENT_Y = 1;
export const BOMB_PERCENT_WIDTH = 8;
export const BOMB_PERCENT_HEIGHT = 8;
export const BOMB_IX = 0;
export const BOMB_IY = 0;
export const BOMB_W = 1500;
export const BOMB_H = 1500;

export const BOOM_IX = 0;
export const BOOM_IY = 0;
export const BOOM_W = 1500;
export const BOOM_H = 1500;
export const BOOM_SRC = "./images/publicdomain/public-domain-boom.png";

export const TRAMPOLINE_SRC = "./images/publicdomain/public-domain-trampoline.png";
export const TRAMPOLINE_IX = 0;
export const TRAMPOLINE_IY = 0;
export const TRAMPOLINE_W = 600;
export const TRAMPOLINE_H = 300;
export const TRAMPOLINE_PERCENT_Y = 90;
export const TRAMPOLINE_PERCENT_W = 20;
export const TRAMPOLINE_PERCENT_H = 10;

export const BRICK_IX = 0;
export const BRICK_IY = 0;
export const BRICK_W = 64;
export const BRICK_H = 32;
export const BRICK_BLUE_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Blue-64x32.png";
export const BRICK_GRAY_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Gray-64x32.png";
export const BRICK_GREEN_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Green-64x32.png";
export const BRICK_ORANGE_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Orange-64x32.png";
export const BRICK_PURPLE_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Purple-64x32.png";
export const BRICK_RED_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Red-64x32.png";
export const BRICK_YELLOW_SRC = "./images/opensourcecc/screamingbrainstudios/Colored_Yellow-64x32.png";
export const BRICK_EMPTY = "empty";
export const BRICK_GREEN_POINTS = 100;
export const BRICK_YELLOW_POINTS = 200;
export const BRICK_BLUE_POINTS = 400;
export const BRICK_PURPLE_POINTS = 800;
export const BRICK_ORANGE_POINTS = 1600;
export const BRICK_RED_POINTS = 3200;

export const EXPLOSION_SRC = "./images/publicdomain/public-domain-explosion.png";
export const EXPLOSION_W = 1500;
export const EXPLOSION_H = 1000;