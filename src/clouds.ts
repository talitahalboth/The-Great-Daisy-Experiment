import { getRandomArbitrary, getRandomInt, h, int, w } from "./utils";

export const roundRect = (ctx: CanvasRenderingContext2D, x: any, y: any, width: number, height: number, radius: number) => {
    radius = Math.min(Math.max(width - 1, 1), Math.max(height - 1, 1), radius);
    var rectX = x;
    var rectY = y;
    var rectWidth = width;
    var rectHeight = height;
    var cornerRadius = radius;
    ctx.beginPath()

    ctx.lineJoin = "round";
    ctx.fillStyle = "#fdb9e6";
    ctx.strokeStyle = "#fdb9e6";
    ctx.lineWidth = cornerRadius;
    ctx.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    // ctx.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);


    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

class CloudPiece {
    x: number
    y: number
    w: number
    h: number
    constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = (0.5)
        roundRect(ctx, int(this.x), int(this.y), int(this.w), int(this.h), int(this.h))
        ctx.globalAlpha = 1
    }

}

const isBetween = (x: number, a: number, b: number): Boolean => {
    return (x >= a && x <= b)
}

function checkRectOverlap(rect1: number[][], rect2: number[][]) {
    /*
     * Each array in parameter is one rectangle
     * in each array, there is an array showing the co-ordinates of two opposite corners of the rectangle
     * Example:
     * [[x1, y1], [x2, y2]], [[x3, y3], [x4, y4]]
     */

    //Check whether there is an x overlap
    if ((rect1[0][0] < rect2[0][0] && rect2[0][0] < rect1[1][0]) //Event that x3 is inbetween x1 and x2
        || (rect1[0][0] < rect2[1][0] && rect2[1][0] < rect1[1][0]) //Event that x4 is inbetween x1 and x2
        || (rect2[0][0] < rect1[0][0] && rect1[1][0] < rect2[1][0])) {  //Event that x1 and x2 are inbetween x3 and x4
        //Check whether there is a y overlap using the same procedure
        if ((rect1[0][1] < rect2[0][1] && rect2[0][1] < rect1[1][1]) //Event that y3 is between y1 and y2
            || (rect1[0][1] < rect2[1][1] && rect2[1][1] < rect1[1][1]) //Event that y4 is between y1 and y2
            || (rect2[0][1] < rect1[0][1] && rect1[1][1] < rect2[1][1])) { //Event that y1 and y2 are between y3 and y4
            return true;
        }
    }
    return false;
}

export const cloudsOverlap = (c1: Cloud, c2: Cloud) => {

    return checkRectOverlap([[c1.x, c1.y], [c1.x2, c1.y2]], [[c2.x, c2.y], [c2.x2, c2.y2]])
    // if (isBetween(c1.x, c2.x, c2.x2)) {
    //     if (isBetween(c1.y, c2.y, c2.y2)) {
    //         return true
    //     }
    //     if (isBetween(c1.y2, c2.y, c2.y2)) {
    //         return true
    //     }
    //     return false
    // }
    // if (isBetween(c1.x2, c2.x, c2.x2)) {
    //     if (isBetween(c1.y, c2.y, c2.y2)) {
    //         return true
    //     }
    //     if (isBetween(c1.y2, c2.y, c2.y2)) {
    //         return true
    //     }
    //     return false
    // }

    // return false
}

export class Cloud {
    cloudPieces: CloudPiece[] = []

    x: number
    y: number
    x2: number
    y2: number
    constructor() {
        const pieces = getRandomArbitrary(0, 1)
        const width = int(getRandomArbitrary(100, 350))
        const height = int(getRandomArbitrary(40, 50))
        const x = int(getRandomArbitrary(0 - width / 2, w - width / 2))
        const y = int(getRandomArbitrary(0, h / 2))
        // const firstPiece = 
        let previousPiece = (new CloudPiece(x, y, width, height))
        // rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius
        this.x = previousPiece.x
        this.y = previousPiece.y
        this.x2 = previousPiece.x + previousPiece.w
        this.y2 = previousPiece.y + previousPiece.h
        this
        for (let index = 0; index < pieces; index++) {
            const rand = Math.random()
            const width = int(getRandomArbitrary(Math.max(100, previousPiece.w - 100), Math.max(100, previousPiece.w - 50)))
            const height = int(getRandomArbitrary(40, 50))
            const x = int(previousPiece.x + (previousPiece.w / 4))
            const y = previousPiece.y + (rand > 0.5 ? previousPiece.h : -height)
            const next = (new CloudPiece(x, y, width, height))

            // this.cloudPieces.push(next)
            this.cloudPieces.push(previousPiece)
            previousPiece = next
            this.x = Math.min(previousPiece.x, this.x)
            this.y = Math.min(previousPiece.y, this.y)
            this.x2 = Math.max(previousPiece.x + previousPiece.w, this.x2)
            this.y2 = Math.max(previousPiece.y + previousPiece.h, this.y2)
        }
        this.cloudPieces.push(previousPiece)
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.cloudPieces.forEach(cloud => {
            cloud.draw(ctx)
        });
    }
}