export class GameException extends Error {
    constructor(message, instance) {
        super(message);
        if (!message || !instance) {
            console.error("[FATAL] Developer Error! Input variables for Exception cannot be null: GameException(" + message + ", " + instance + ")]");
        }
        console.error("[FATAL] FATAL CRASH! [" + instance.constructor.name + "] GameException -> message [" + message + "]", instance);
    }
}