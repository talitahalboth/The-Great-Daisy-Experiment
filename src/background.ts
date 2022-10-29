/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

import { sunColour, mountainStartColour, mountainEndColour, backgroundStartColour, backgroundEndColour } from "./constants"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { getRandomArbitrary, h, int, lerpColor, mountainRanges, w } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = w
let height = backgroundCanvas.height = h
const initialBackgroundHeight = height


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

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = sunColour
        ctx.fill()
        this.drawSunWaves(ctx, sunColour, backgroundEndColour)
    }

    drawSunWaves(ctx: CanvasRenderingContext2D, start: string, end: string) {

        const layers = 3

        let prevR = this.r

        for (let index = 0; index < layers; index++) {

            ctx.globalAlpha = 1 / (index + 3)
            const color = lerpColor(start, end, index / layers)
            ctx.beginPath()
            const newR = prevR + 10 + (layers - index) * 5
            ctx.arc(this.x, this.y, newR, 0, Math.PI * 2)
            prevR = newR
            ctx.fillStyle = `${color}`
            ctx.fill()

        }
        ctx.globalAlpha = 1
    }
}

const sun = new Sun(int(getRandomArbitrary(w / 3, 3 * w / 4)), int(getRandomArbitrary(h / 8, 2 * h / 8)), 50 + Math.random() * 10)


const createMountains = () => {
    const start = mountainStartColour
    const end = mountainEndColour
    const layers = 2
    const bottom = h * 0.25
    const top = h * 0.45

    var heightUnit = (bottom - top) / (layers + 1)

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1))
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

export const drawBackgroundOnContextReverse = (backgroundCtx: CanvasRenderingContext2D) => {

    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300)
    grd.addColorStop(0, backgroundStartColour)
    grd.addColorStop(1, backgroundEndColour)
    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)


    sun.draw(backgroundCtx)

    mountainRanges.slice().reverse().forEach((mountain) => {
        mountain.drawMountain(backgroundCtx, w, h)
    })
    backgroundCtx.globalCompositeOperation = 'destination-over'
}

export const drawBackgroundOnContext = (backgroundCtx: CanvasRenderingContext2D) => {
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
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300)
    grd.addColorStop(0, backgroundStartColour)
    grd.addColorStop(1, backgroundEndColour)
    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)
}



export const setSizeBackground = () => {
    height = backgroundCanvas.height = h
    width = backgroundCanvas.width = w

    drawBackgroundOnContext(backgroundCtx)


    // backgroundCtx.fillStyle = "#9ab843"
    // backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

}

//https://www.123rf.com/clipart-vector/pastoral_scene.html

createMountains()