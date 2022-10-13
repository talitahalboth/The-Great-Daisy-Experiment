/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { getRandomArbitrary, h, int, lerpColor, mountainRanges, w } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = w
let height = backgroundCanvas.height = h
const initialBackgroundHeight = height

const drawSunGradient = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    var gradient = ctx.createRadialGradient(w / 4, h / 6, 1, w / 3, h / 6, w);

    // grd.addColorStop(0, "#9eb9d4");
    // gradient.addColorStop(1, "#FFFFFF");
    gradient.addColorStop(0, '#FFFFFF');
    // gradient.addColorStop(0.1, '#F8E2E2');
    // gradient.addColorStop(0.3, '#7AE5F5');
    // gradient.addColorStop(0.5, '#FCCABD');
    // gradient.addColorStop(0.6, '#361e36');
    // gradient.addColorStop(0.9, '#F0AEAF');
    gradient.addColorStop(1, '#C4A1AE');

    /* Sun */
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
}

class Sun {
    x: number
    y: number
    r: number
    constructor(x: number, y: number, r: number) {
        this.x = int(x)
        this.y = int(y)
        this.r = int(r)
    }
    draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
}

const sun = new Sun(int(getRandomArbitrary(w / 3, 3 * w / 4)), int(getRandomArbitrary(h / 8, 2 * h / 8)), 50 + Math.random() * 10)


// const drawSun = (ctx: CanvasRenderingContext2D, w: number, h: number) => {

//     const x = int(getRandomArbitrary(w / 3, 3 * w / 4))
//     const y = int(getRandomArbitrary(h / 8, 2 * h / 8))

//     ctx.beginPath();
//     ctx.arc(x, y, 50 + Math.random() * 10, 0, Math.PI * 2);
//     ctx.fillStyle = '#FFFFFF';
//     ctx.fill();

// }
const createMountains = () => {
    const start = "#8ca4d0";
    const end = "#aabad4";
    const layers = 2
    const bottom = h * 0.2
    const top = h * 0.3

    var heightUnit = (bottom - top) / (layers + 1);

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1));
        const noise = GenerateNoise(100, 150, 2, 3, w)

        const m = new HillsWithDaisies({
            color: lerpColor(start, end, index / layers),
            range: noise,
            height: y,
            daisies: [],
            slopeAngle: 0//- Math.PI / 12
        })
        mountainRanges.push(m)
    }
}

// addEventListener("resize", () => setSizeBackground())


export const setSizeBackground = () => {
    height = backgroundCanvas.height = h
    width = backgroundCanvas.width = w
    backgroundCtx.globalCompositeOperation = 'destination-over'
    backgroundCtx.clearRect(0, 0, width, backgroundCanvas.height)

    mountainRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })

    mountainRanges.forEach((mountain) => {
        mountain.drawMountain(backgroundCtx, w, h)
    })
    sun.draw(backgroundCtx)
    backgroundCtx.globalCompositeOperation = 'destination-over'
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300);
    grd.addColorStop(0, "#9eb9d4");
    grd.addColorStop(1, "#FFFFFF");
    backgroundCtx.fillStyle = grd;
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)

    // backgroundCtx.fillStyle = "#9ab843"
    // backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

}


createMountains()