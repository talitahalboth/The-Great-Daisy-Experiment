import { Figure } from "./figure"
import { Perlin, CombineNoise } from "./perlin"

export class MountainRange {
    range: Perlin[]
    rangeCombined: { pos: number[] }
    height: number
    daisies: Figure[]
    color: string
    constructor(props: { range: Perlin[], height: number, daisies: Figure[], color: string }) {
        const { range, height, daisies, color } = props
        this.range = range
        this.height = height
        this.daisies = daisies
        this.color = color
        this.rangeCombined = CombineNoise(range)

    }

    updateMountains(h: number, w: number) {
        this.range.forEach((noise) => noise.fillPos(w))
        if (this.height === 0) {
            this.height = h
        }
        this.rangeCombined = CombineNoise(this.range)
    }

    drawDaisies(ctx: CanvasRenderingContext2D) {
        this.daisies.forEach((figure) => {
            figure.draw(ctx)
        })
    }

    drawMountain(ctx: CanvasRenderingContext2D, w: number, h: number) {

        // const combinedNoise = CombineNoise(this.range)
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(0, this.height + this.rangeCombined.pos[0] ?? this.height);
        for (var i = 0; i < this.rangeCombined.pos.length; i++) {
            ctx.lineTo(i, this.height + this.rangeCombined.pos[i]);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();

    }
}