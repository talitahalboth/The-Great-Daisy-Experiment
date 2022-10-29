import { sunColour, backgroundEndColour } from "./constants"
import { int, lerpColor, getRandomArbitrary, w, h } from "./utils"

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

export const sun = new Sun(int(getRandomArbitrary(w / 3, 3 * w / 4)), int(getRandomArbitrary(h / 8, 2 * h / 8)), 50 + Math.random() * 10)
