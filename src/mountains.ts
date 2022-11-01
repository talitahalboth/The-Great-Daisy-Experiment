import { mountainStartColour, mountainEndColour, treesGradientStopColour1, treesGradientStopColour2 } from "./constants"
import { Figure } from "./figure"
import { Perlin, CombineNoise, GenerateNoise } from "./perlin"
import { calculateYFromXAndANgle, getRandomArbitrary, h, int, lerpColor, map, mountainRanges, w } from "./utils"

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

interface MountainsWithTreesProps extends MountainProps {
    treeMaxHeight: number
}



export class MountainsWithTrees extends Mountains {
    treeMaxHeight: number
    treesPos: { x: number, height: number }[]

    treeTotalHeight: number
    treeHalfWidth: number
    treesHeight: number[]

    generateTree(index: number) {
        const rand = Math.random()
        if (rand < 0.1) {
            const height = int(map(Math.random(), 0, 1, this.treeMaxHeight / 3, this.treeMaxHeight))
            this.treesPos.push({ x: index, height })
        }
    }
    constructor(props: MountainsWithTreesProps) {
        super(props)
        this.treesPos = []
        this.treeTotalHeight = props.treeMaxHeight * 2
        this.treeMaxHeight = props.treeMaxHeight
        const angle = 30 * (Math.PI / 180)
        this.treeHalfWidth = int(this.treeTotalHeight * angle)
        console.log(this.treeHalfWidth)
        for (let index = 0; index < w; index++) {
            this.generateTree(index)
        }
    }

    updateMountains(h: number, w: number) {
        this.updateOffsetHeight(w)

        this.range.forEach((noise) => noise.fillPos(w))
        if (this.height === 0) {
            this.height = h
        }
        this.rangeCombined = CombineNoise(this.range)

        for (let index = this.treesPos.length; index < w; index++) {
            const rand = Math.random()
            if (rand < 0.01) {
                this.generateTree(index)
            }

        }

        this.calcuHighestAndLowestYAxis()
    }

    drawTrees(ctx: CanvasRenderingContext2D, w: number, h: number) {

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
        this.treesPos.forEach((tree) => {

            ctx.beginPath()
            ctx.lineWidth = 0
            const y = calculateYFromXAndANgle(
                tree.x,
                this.rangeCombined.pos[tree.x] + this.height,
                w,
                this.slopeAngle
            )
            const iniY = y + this.treeTotalHeight
            const endY = y - tree.height
            ctx.lineTo(tree.x - this.treeHalfWidth, iniY)
            ctx.lineTo(tree.x, endY)
            ctx.lineTo(tree.x + this.treeHalfWidth, iniY)
            ctx.closePath()
            ctx.fill()
        })
    }

}

export const createMountainsWithTrees = (array: MountainsWithTrees[]) => {
    const start = mountainStartColour
    const end = mountainEndColour
    const layers = 2
    const bottom = h * 0.50
    const top = h * 0.55

    var heightUnit = (bottom - top) / (layers + 1)
    var treeMaxHeight = h / 30

    const minAngle = -10 * (Math.PI / 180)
    const maxAngle = -minAngle
    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1))
        const noise = GenerateNoise(40, 150, 2, 3, w)
        const gradient = [
            lerpColor(treesGradientStopColour1.start, treesGradientStopColour1.end, index / layers)
            , lerpColor(treesGradientStopColour2.start, treesGradientStopColour2.end, index / layers)

        ]
        const m = new MountainsWithTrees({
            color: lerpColor(start, end, index / layers),
            colourGradient: gradient,
            range: noise,
            height: y,
            daisies: [],
            slopeAngle: getRandomArbitrary(minAngle, maxAngle),
            treeMaxHeight
        })
        array.push(m)
        // mountainRanges.push(m)
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