import { GameException } from "./../exception/GameException.js";

/** 
 * AWS S3 is blocking CSV fetch config files for security reasons. Fetch works fine locally, but there are
 * polices in place on AWS that prevent it from working. We now create CSV Strings instead of config files.
 * Do not change this pattern unless moving to an AWS service other than S3.
 */
export class LevelConfiguration {
    constructor() {
        this.levels = [];
        this.levels.push(this.constructLevel1());
    }

    constructLevel1() {
        return `,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  , Y, Y,  ,  ,  ,  , Y, Y,  ,  ,  , Y, Y,  ,  ,  , 
 ,  ,  , Y,  , Y,  ,  , Y,  ,  , Y,  ,  , Y,  , Y,  ,  , 
 ,  ,  , Y,  ,  , Y,  , Y,  ,  , Y,  ,  , Y,  ,  , Y,  , 
 ,  ,  , Y,  ,  , Y,  , Y,  ,  , Y,  ,  , Y,  ,  , Y,  , 
 ,  ,  , Y,  ,  , Y,  , Y, Y, Y, Y,  ,  , Y,  ,  , Y,  , 
 ,  ,  , Y,  , Y,  ,  , Y,  ,  , Y,  ,  , Y,  , Y,  ,  , 
 ,  ,  , Y, Y,  ,  ,  , Y,  ,  , Y,  ,  , Y, Y,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,`;
    }

    getLevel(levelNumber, numberOfRows, numberOfColumns) {
        let rows = this.levels[levelNumber - 1].split("\n");
        let level = [];
        for (let r = 0; r < numberOfRows; r++) {
            let columns = rows[r].split(",");
            let arr = [];
            for (let c = 0; c < numberOfColumns; c++) {
                arr.push(columns[c].trim());
            }
            level.push(arr);
        }
        return level;
    }
}