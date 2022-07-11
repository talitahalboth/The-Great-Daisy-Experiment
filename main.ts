/// <reference path="daisyImages.ts" />

const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
const imagesArray: HTMLImageElement[] = []

let figuresArray: Figure[] = []
let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight
const initialHeight = h
const planeYCoordinate = 40
const highestAllowedToDraw = 2.7
const initialSize = 10
const scalingFactor = 4

setSize()

addEventListener("resize", () => setSize())

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Figure {
    size: number
    x: number
    color: string
    y: number
    img: HTMLImageElement
    scale: number

    constructor(newX: number, newY: number, scale: number) {
        var randomScale = Math.random()
        var randomIndex = getRandomInt(imagesArray.length)
        this.img = imagesArray[randomIndex]
        this.size = initialSize
        this.size = this.size * scale
        // slightly increase the size randomly
        this.size += this.size * randomScale / 5
        this.y = newY - Math.floor((this.size * this.img.height / this.img.width) / 2)
        this.x = newX - Math.floor((this.size) / 2)
        this.color = "white"
    }

    draw() {

        // ctx.fillStyle = this.color
        // ctx.beginPath()
        // ctx.rect(this.x, this.y, this.size, this.size)
        // ctx.closePath()
        // ctx.fill()
        // ctx.stroke()
        ctx.drawImage(
            this.img,
            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.size * this.img.width / this.img.width),
            Math.floor(this.size * this.img.height / this.img.width)
        );
    }
}

function setSize() {
    h = canvas.height = innerHeight
    w = canvas.width = innerWidth
    ctx.globalCompositeOperation = 'destination-over'
}

function drawFlowers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    figuresArray.forEach((figure) => {
        figure.draw()
    })
    requestAnimationFrame(drawFlowers)
}

const addElementToOrderedList = ((figArray: Figure[], element: Figure) => {
    for (let i = 0; i < figArray.length; i++) {
        if (figArray[i].y <= element.y) {
            figArray.splice(i, 0, element)
            return
        }
    }
    figArray.push(element)
})

document.addEventListener("click", (e) => {
    const unsignedScale = (e.y - (initialHeight / scalingFactor)) / planeYCoordinate
    const scale = unsignedScale > 0 ? unsignedScale : 0
    const newScale = e.y > initialHeight / highestAllowedToDraw ? scale : 0
    const y = e.y
    if (newScale !== 0) {
        const newDaisy = new Figure(e.x, e.y, newScale)
        addElementToOrderedList(figuresArray, newDaisy)

    }
    drawFlowers()
})

drawFlowers()

// imagesArray.push(img)
// imagesArray.push(img2)
// imagesArray.push(img3)