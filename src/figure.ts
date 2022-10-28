// import { angle, canvas, canvasHalfh, canvasHalfw, fov, grid, h, w } from "./utils"

// import { canvasHalfw, canvasHalfh, fov, angle, grid } from './main'
import { reverseRotateX, rotateX } from './perspectiveCalculator'
import { angle, calculateYFromXAndANgle, canvasHalfh, canvasHalfw, fov, grid, h, reverseCalculateYFromXAndANgle, w } from './utils'
interface Properties {
    x: number
    y: number
    w: number
    h: number
}

const initialSize = 6





const calcStuff = (cx: number, cy: number, fov: number, viewDist: number, w: number, h: number, angle: number, grid: any, proportion: number) => {
    const c1 = rotateX(cx, cy, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
    const c3 = rotateX(cx + 2, cy + 2, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
    const newHeight = Math.abs(c3[1] - c1[1])

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
        slope: number) {
        // var randomScale = Math.random()
        this.img = img
        const proportion = img.height / img.width
        this.iniX = x2d
        this.iniY = y2d
        const yWithoutSlope = reverseCalculateYFromXAndANgle(x2d, y2d, w, slope)
        const t1 = reverseRotateX(x2d, y2d, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner

        this.properties = calcStuff(t1[0], t1[1], fov, viewDist, canvasHalfw, canvasHalfh, angle, grid, proportion)

        const t2 = reverseRotateX(x2d, yWithoutSlope, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner

        const properties = calcStuff(t2[0], t2[1], fov, viewDist, canvasHalfw, canvasHalfh, angle, grid, proportion)
        // console.log(this.properties.h)
        // console.log(properties.h)
        // console.log('a-----------')
        // console.log(y2d, yWithoutSlope)
        // console.log(t1)
        // console.log(t2)
        this.properties.h = Math.abs(properties.h)
        this.properties.w = Math.abs(properties.w)

        // const 
        // {
        //     x, y, w, h
        // }
    }

    changeProperties(fov: number, viewDist: number, angle: number, grid: any) {
        const t1 = reverseRotateX(this.iniX, this.iniY, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
        const newProperties = calcStuff(t1[0], t1[1], fov, viewDist, canvasHalfw, canvasHalfh, angle, grid, this.img.height / this.img.width)
        // console.log("------------------")
        // console.log(this.properties)
        // console.log(newProperties)
        this.properties = newProperties
    }

    draw(ctx: CanvasRenderingContext2D) {

        // ctx.fillStyle = "white"
        // ctx.beginPath()
        // ctx.rect(this.properties.x, this.properties.y, this.properties.w, this.properties.h)
        // ctx.closePath()
        // ctx.fill()
        // ctx.stroke()
        ctx.drawImage(
            this.img,
            Math.floor(this.properties.x - this.properties.w / 2),
            Math.floor(this.properties.y - this.properties.w / 2),
            Math.floor(this.properties.w),
            Math.floor(this.properties.h)
        )
    }
}
