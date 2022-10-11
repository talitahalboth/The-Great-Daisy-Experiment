/// <reference path="daisyImages.ts" />

const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
const imagesArray: HTMLImageElement[] = []

let figuresArray: Figure[] = []
let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight
const initialHeight = h
const planeYCoordinate = 50
const highestAllowedToDraw = 3.5
const initialSize = 10
const scalingFactor = 4

setSize()

addEventListener("resize", () => setSize())

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

interface Properties {
    x: number
    y: number
    w: number
    h: number
}

class Figure {

    properties: Properties
    img: HTMLImageElement
    constructor(newX: number, newY: number, scale: number) {
        var randomScale = Math.random()
        var imgIndex = getRandomInt(imagesArray.length)
        this.img = imagesArray[imgIndex]
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
    draw() {

        ctx.drawImage(
            this.img,
            Math.floor(this.properties.x),
            Math.floor(this.properties.y),
            Math.floor(this.properties.w),
            Math.floor(this.properties.h)
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
}

const addElementToOrderedList = ((figArray: Figure[], element: Figure) => {
    for (let i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y <= element.properties.y) {
            figArray.splice(i, 0, element)
            return
        }
    }
    figArray.push(element)
})

const checkPositionIsAllowed = (x: number, y: number) => {
    return y > initialHeight / highestAllowedToDraw ? true : false
}

document.addEventListener("click", (e) => {
    const signedScale = (e.y - (initialHeight / scalingFactor)) / planeYCoordinate
    const scale = signedScale > 0 ? signedScale : 0
    if (checkPositionIsAllowed(e.x, e.y)) {
        const otherNewDaisy = new Figure(e.x, e.y, scale)
        addElementToOrderedList(figuresArray, otherNewDaisy)
    }
    drawFlowers()
})

drawFlowers()
