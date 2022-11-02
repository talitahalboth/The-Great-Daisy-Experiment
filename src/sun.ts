import { sunColour, backgroundEndColour, sunGradient } from "./constants"
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
        var grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.r * 2)

        sunGradient.forEach((colour, index) => {
            grd.addColorStop(index / sunGradient.length, colour)
        })
        ctx.fillStyle = grd
        ctx.fill()
        ctx.closePath()
        this.drawSunWaves(ctx, sunColour, backgroundEndColour)
    }

    drawSunWaves(ctx: CanvasRenderingContext2D, start: string, end: string) {

        const layers = 3

        let prevR = this.r

        for (let index = 0; index < layers; index++) {

            ctx.globalAlpha = 1 / (index + 3)
            const color = lerpColor(start, end, index / layers)
            ctx.beginPath()
            const newR = prevR + (h + w) / 100 + (layers - index) * (h + w) / 200
            ctx.arc(this.x, this.y, newR, 0, Math.PI * 2)
            prevR = newR
            ctx.fillStyle = `${color}`
            ctx.fill()
            ctx.closePath()

        }
        ctx.globalAlpha = 1
    }

}


export const sun = new Sun(int(getRandomArbitrary(w / 3, 3 * w / 4)), int(getRandomArbitrary(h / 8, 2 * h / 8)), (h + w) / 25 + Math.random() * (h + w) / 100)
