// import { angle, canvas, canvasHalfh, canvasHalfw, fov, grid, h, w } from "./utils"

// import { canvasHalfw, canvasHalfh, fov, angle, grid } from './main'
import { reverseRotateX, rotateX } from './perspectiveCalculator'
import { PerspectiveValues, reverseCalculateYFromXAndANgle, w } from './utils'
interface Properties {
    x: number
    y: number
    w: number
    h: number
}

const initialSize = 6





const calcStuff = (cx: number, cy: number, perspectiveCalculatingValues: PerspectiveValues, proportion: number) => {
    const c1 = rotateX(cx, cy, perspectiveCalculatingValues); /// upper left corner
    const c3 = rotateX(cx + 1, cy, perspectiveCalculatingValues); /// upper left corner
    const newHeight = Math.abs(c3[0] - c1[0])

    return ({ x: c1[0], y: c1[1], w: -newHeight, h: -newHeight * proportion })

}

export class Figure {

    properties: Properties
    img: HTMLImageElement
    maxY: number
    minY: number
    iniX: number
    iniY: number
    slope: number
    constructor(
        x2d: number,
        y2d: number,
        viewDist: number,
        img: HTMLImageElement,
        slope: number,
        perspectiveCalculatingValues: PerspectiveValues) {
        this.img = img
        const proportion = img.height / img.width
        this.iniX = x2d
        this.iniY = y2d
        const yWithoutSlope = reverseCalculateYFromXAndANgle(x2d, y2d, w, slope)
        const t1 = reverseRotateX(x2d, y2d, { ...perspectiveCalculatingValues, viewDist }); /// upper left corner

        this.properties = calcStuff(t1[0], t1[1], { ...perspectiveCalculatingValues, viewDist }, proportion)

        const t2 = reverseRotateX(x2d, yWithoutSlope, { ...perspectiveCalculatingValues, viewDist }); /// upper left corner

        const properties = calcStuff(t2[0], t2[1], { ...perspectiveCalculatingValues, viewDist }, proportion)

        this.properties.h = Math.abs(properties.h)
        this.properties.w = Math.abs(properties.w)


    }

    changeProperties(perspectiveCalculatingValues: PerspectiveValues) {
        const t1 = reverseRotateX(this.iniX, this.iniY, perspectiveCalculatingValues); /// upper left corner
        const newProperties = calcStuff(t1[0], t1[1], perspectiveCalculatingValues, this.img.height / this.img.width)

        this.properties = newProperties
    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath()
        // ctx.fillStyle = "white"
        // ctx.rect(this.properties.x, this.properties.y, this.properties.w, this.properties.h)
        // ctx.fill()
        // ctx.stroke()
        ctx.drawImage(
            this.img,
            Math.floor(this.properties.x - this.properties.w / 2),
            Math.floor(this.properties.y - this.properties.h / 1.5),
            Math.floor(this.properties.w),
            Math.floor(this.properties.h)
        )
        ctx.closePath()
    }
}
