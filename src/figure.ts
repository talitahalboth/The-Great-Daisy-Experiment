
interface Properties {
    x: number
    y: number
    w: number
    h: number
}

const initialSize = 3
export class Figure {

    properties: Properties
    img: HTMLImageElement
    constructor(newX: number, newY: number, scale: number, img: HTMLImageElement) {
        var randomScale = Math.random()
        this.img = img
        var size = initialSize
        size = size * scale
        // slightly increase the size randomly
        size += size * randomScale / 5
        var y = newY - Math.floor((size * img.height / img.width) / 2)
        var x = newX - Math.floor((size) / 2)
        var color = "white"
        var w = Math.floor(size * img.width / img.width)
        var h = Math.floor(size * img.height / img.width)
        this.properties = {
            x, y, w, h
        }
    }
    draw(ctx: CanvasRenderingContext2D) {

        ctx.drawImage(
            this.img,
            Math.floor(this.properties.x),
            Math.floor(this.properties.y),
            Math.floor(this.properties.w),
            Math.floor(this.properties.h)
        );
    }
}
