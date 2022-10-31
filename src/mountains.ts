import { Figure } from "./figure"
import { Perlin, CombineNoise } from "./perlin"
import { calculateYFromXAndANgle } from "./utils"

interface MountainProps {
    colourGradient?: string[],
    range: Perlin[],
    height: number,
    daisies: Figure[],
    color: string,
    slopeAngle: number,
    w?: number

}

export class Mountains {
    range: Perlin[]
    rangeCombined: { pos: number[] }
    height: number
    color: string
    highestYAxis: number
    lowestYAxis: number
    slopeAngle: number
    offsetHeight: number
    areaProportionalToHeight: number
    colourGradient?: string[]
    constructor(props: MountainProps) {
        const { range, height, color, slopeAngle, w, colourGradient } = props
        this.range = range
        this.height = height
        this.color = color
        this.rangeCombined = CombineNoise(range)
        this.calcuHighestAndLowestYAxis()
        this.slopeAngle = slopeAngle
        this.updateOffsetHeight(w)
        this.colourGradient = colourGradient
    }

    updateOffsetHeight(w: number) {
        this.offsetHeight = Math.sin(this.slopeAngle) * w / 2
        this.offsetHeight = Math.abs(this.offsetHeight)
    }

    calcuHighestAndLowestYAxis() {
        this.lowestYAxis = Math.min(...this.rangeCombined.pos) + this.height
        this.highestYAxis = Math.max(...this.rangeCombined.pos) + this.height
    }

    updateMountains(h: number, w: number) {
        this.updateOffsetHeight(w)

        this.range.forEach((noise) => noise.fillPos(w))
        if (this.height === 0) {
            this.height = h
        }
        this.rangeCombined = CombineNoise(this.range)
        this.calcuHighestAndLowestYAxis()
    }

    drawMountain(ctx: CanvasRenderingContext2D, w: number, h: number) {

        if (this.colourGradient) {
            var grd = ctx.createLinearGradient(0, this.lowestYAxis, 0, h)

            this.colourGradient.forEach((colour, index) => {
                grd.addColorStop(index / this.colourGradient.length, colour)
            })
            ctx.fillStyle = grd
        }
        else {
            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color

        }
        ctx.beginPath()
        ctx.lineWidth = 0
        ctx.moveTo(0, this.height + this.rangeCombined.pos[0] ?? this.height)
        for (var i = 0; i < this.rangeCombined.pos.length; i++) {
            var y = calculateYFromXAndANgle(
                i,
                this.rangeCombined.pos[i] + this.height,
                w,
                this.slopeAngle
            )
            ctx.lineTo(i, y)
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fill()
    }


}

interface HillsProps extends MountainProps {
    daisies: Figure[]
}

export class HillsWithDaisies extends Mountains {
    daisies: Figure[]

    constructor(props: HillsProps) {
        super(props)
        const { daisies } = props
        this.daisies = daisies
    }

    updateArea(height: number) {
        this.areaProportionalToHeight = height
    }


    drawDaisies(ctx: CanvasRenderingContext2D, reverse?: boolean) {
        if (reverse)
            this.daisies.slice().reverse().forEach((figure) => {
                figure.draw(ctx)
            })
        else
            this.daisies.forEach((figure) => {
                figure.draw(ctx)
            })
    }
}