import { cloudsColour } from "./constants";
import { getRandomArbitrary, getRandomInt, h, int, w, distance, rectanglesIntersect } from "./utils";

class Fluff {
    x: number;
    y: number;
    r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    static calcPositionLeft = (prev: Fluff, r: number) => {
        const r1 = prev.r;
        const r2 = r;
        const hLine = getRandomInt(prev.r / 1.5);

        const a = r1 - r2 - hLine;
        const h = r1 + r2;
        const b = Math.sqrt(h * h - a * a);
        const x1 = prev.x;
        const y1 = prev.y;

        const x2 = x1 - b;
        const y2 = y1 + a;
        const newFluff = new Fluff(x2, y2, r2);
        return newFluff;
    };

    static calcPositionRight = (prev: Fluff, r: number) => {
        const r1 = prev.r;
        const r2 = r;
        const hLine = getRandomInt(prev.r / 1.5);

        const a = r1 - r2 - hLine;
        const h = r1 + r2;
        const b = Math.sqrt(h * h - a * a);
        const x1 = prev.x;
        const y1 = prev.y;

        const x2 = x1 + b;
        const y2 = y1 + a;
        const newFluff = new Fluff(x2, y2, r2);
        return newFluff;
    };
    draw = (ctx: CanvasRenderingContext2D, offset: number) => {
        ctx.moveTo(this.x + offset, this.y);
        ctx.arc(this.x + offset, this.y, this.r, 0, Math.PI * 2);
    };
}

export const cloudsOverlap = (cloud1: Cloud, cloud2: Cloud) => {
    return rectanglesIntersect(
        cloud1.x1,
        cloud1.y1,
        cloud1.x2,
        cloud1.y2,
        cloud2.x1,
        cloud2.y1,
        cloud2.x2,
        cloud2.y2
    );
};

export class Cloud {
    fluffs: Fluff[];
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    speed: number;
    offset = 0;
    constructor() {
        const minSizebigFluff = (w + h) / 50;
        const maxSizebigFluff = (w + h) / 40;

        const fluffs: Fluff[] = [];

        const bigFluff = {
            x: getRandomInt(w),
            y: getRandomInt(h),
            r: int(getRandomArbitrary(minSizebigFluff, maxSizebigFluff)),
        };
        const minSize = bigFluff.r / 3;
        const maxSize = bigFluff.r;
        let prevFluffLeft = new Fluff(bigFluff.x, bigFluff.y, bigFluff.r);

        const amountOfFluff = int(getRandomArbitrary(1, 3));
        let prevFluffRight: Fluff = prevFluffLeft;
        fluffs.push(prevFluffRight);
        for (let index = 0; index < amountOfFluff; index += 2) {
            let fluffLeft = getRandomArbitrary(minSize, maxSize);
            let fluffRight =
                index + 1 < amountOfFluff
                    ? getRandomArbitrary(minSize, maxSize)
                    : 0;
            const rand = Math.random();
            if (rand < 0.5) {
                fluffLeft = fluffLeft + fluffRight;
                fluffRight = fluffLeft - fluffRight;
                fluffLeft = fluffLeft - fluffRight;
            }
            // calculate x and y of left fluff
            const newFluffLeft = Fluff.calcPositionLeft(prevFluffLeft, fluffLeft);
            fluffs.unshift(newFluffLeft);
            prevFluffLeft = newFluffLeft;

            //calculate x and y of right fluff
            const newFluffRight = Fluff.calcPositionRight(prevFluffRight, fluffRight);
            fluffs.push(newFluffRight);
            prevFluffRight = newFluffRight;
        }

        const furthersYValue = fluffs.reduce((prev, curr) => {
            return Math.max(prev, curr.y + curr.r);
        }, 0);

        const smallestYValue = fluffs.reduce((prev, curr) => {
            return Math.min(prev, curr.y - curr.r);
        }, h);

        const createEndFluffLeft = () => {
            const firstFluff = fluffs[0];
            const diam = Math.max(minSize * 2, furthersYValue - firstFluff.y);
            const r = diam / 2;
            const x = Fluff.calcPositionLeft(firstFluff, r).x;
            const y = furthersYValue - r;
            const offsetDistance =
                distance(firstFluff.x, firstFluff.y, x, y) - (firstFluff.r + r);
            const fluffLeft = new Fluff(x + offsetDistance, y, diam / 2);

            fluffs.unshift(fluffLeft);
        };

        const createEndFluffRight = () => {
            const lastFluff = fluffs[fluffs.length - 1];
            const diam = Math.max(minSize * 2, furthersYValue - lastFluff.y);

            const r = diam / 2;
            const x = Fluff.calcPositionRight(lastFluff, r).x;
            const y = furthersYValue - r;
            const offsetDistance =
                distance(lastFluff.x, lastFluff.y, x, y) - (lastFluff.r + r);
            const fluffRight = new Fluff(x - offsetDistance, y, r);

            fluffs.push(fluffRight);
        };

        createEndFluffLeft();
        createEndFluffRight();

        const furthersXValue = fluffs.reduce((prev, curr) => {
            return Math.max(prev, curr.x + curr.r);
        }, 0);

        const smallestXValue = fluffs.reduce((prev, curr) => {
            return Math.min(prev, curr.x - curr.r);
        }, h);

        const y1 = smallestYValue;
        const y2 = furthersYValue;
        const x1 = smallestXValue;
        const x2 = furthersXValue;
        const speed = Math.random() * 0.5 + 0.2; // Speed of movement
        this.fluffs = fluffs;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.speed = speed;

    }
    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.globalAlpha = (0.5)
        ctx.beginPath();

        // Draw all the fluffs
        this.fluffs.forEach((fluff) => fluff.draw(ctx, this.offset));

        // Draw the cloud outline and bottom line
        this.drawCloudOutline(ctx);

        ctx.fillStyle = cloudsColour;

        ctx.fill();
        ctx.globalAlpha = (1)
    };

    private drawCloudOutline(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.fluffs[0].x + this.offset, this.y2); // Start from the first fluff at the bottom line
        this.fluffs.forEach((fluff) => ctx.lineTo(fluff.x + this.offset, fluff.y)); // Draw lines connecting each fluff
        ctx.lineTo(this.fluffs[this.fluffs.length - 1].x + this.offset, this.y2); // Connect the last fluff to the bottom line
    }

}
