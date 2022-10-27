// import { angle, canvas, canvasHalfh, canvasHalfw, fov, grid, h, w } from "./utils"

// import { canvasHalfw, canvasHalfh, fov, angle, grid } from './main'
import { reverseRotateX, rotateX } from './perspectiveCalculator'
import { angle, canvasHalfh, canvasHalfw, fov, grid, h, w } from './utils'
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
    constructor(
        x2d: number,
        y2d: number,
        viewDist: number,
        img: HTMLImageElement) {
        // var randomScale = Math.random()
        this.img = img
        const proportion = img.height / img.width
        this.iniX = x2d
        this.iniY = y2d
        const t1 = reverseRotateX(x2d, y2d, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
        // const c1 = rotateX(t1[0], t1[1], fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
        // const t2 = reverseRotateX(x2d, y2d, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner
        // const c2 = rotateX(t2[0] + 1, t2[1] + 1, fov, viewDist, canvasHalfw, canvasHalfh, angle, grid); /// upper left corner

        // console.log(x2d, y2d, c1, c2)

        // const x = c1[0]
        // const y = c1[1]
        // const w = c2[0]
        // const h = c2[1]

        // const x = 0
        // const y = 0
        // const w = 0
        // const h = 0

        // var size = initialSize
        // size = size * scale
        // slightly increase the size randomly
        // size += size * randomScale / 5
        // var y = x2d - Math.floor((size * img.height / img.width) / 2)
        // var x = y2d - Math.floor((size) / 2)
        // var color = "white"
        // var w = Math.floor(size * img.width / img.width)
        // var h = Math.floor(size * img.height / img.width)
        this.properties = calcStuff(t1[0], t1[1], fov, viewDist, canvasHalfw, canvasHalfh, angle, grid, proportion)
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
