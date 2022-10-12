/// <reference path="daisyImages.ts" />

interface Mountain {
    range: Perlin[]
    height: number
    daisies: Figure[]
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
const imagesArray: HTMLImageElement[] = []
var pathCleared = true
const figuresArray: Figure[] = []
const mountains: Perlin[][] = []
const mountainsRanges: Mountain[] = []
let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight
const initialHeight = h
const planeYCoordinate = 50
const highestAllowedToDraw = 3.5
const initialSize = 10
const scalingFactor = 4


addEventListener("resize", () => setSize())


function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}



function setSize() {
    h = canvas.height = innerHeight
    w = canvas.width = innerWidth
    ctx.globalCompositeOperation = 'destination-over'
    mountainsRanges.forEach((mountains, index) => {
        mountains.range.forEach((noise) => noise.fillPos(w + 1))
        if (mountains.height === 0) {
            mountains.height = Math.floor(h / (index + 2))
        }
    })
    drawScene()
}


//perlin line plotting
function DrawMountain(L: { pos: any; }, x: number, style: string) {

    ctx.fillStyle = style
    ctx.beginPath()
    ctx.moveTo(0, x);
    for (var i = 0; i < L.pos.length; i++) {
        ctx.lineTo(i, x + L.pos[i]);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
}

function drawScene() {
    ctx.clearRect(0, 0, w, h)
    // figuresArray.forEach((figure) => {
    //     figure.draw(ctx)
    // })
    // console.log(mountainsRanges)
    const colours = ["blue", "pink", "red", "green", "orange"]
    mountainsRanges.forEach((mountainsRange, index) => {
        const combinedNoise = CombineNoise(mountainsRange.range)
        mountainsRange.daisies.forEach((figure) => {
            figure.draw(ctx)
        })
        DrawMountain(combinedNoise, mountainsRange.height, colours[index])
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
    return true
    // return y > initialHeight / highestAllowedToDraw ? true : false
}

const calculateScale = (y: number, planeYCoordinate: number) => {
    // console.log(y)
    const signedScale = (y) / planeYCoordinate
    const scale = signedScale > 0 ? signedScale : 0
    return scale
}

const calculateScale2 = (y: number, planeYCoordinate: number, scalingFactor: number, initialHeight: number) => {
    const signedScale2 = (y - ((initialHeight) / (scalingFactor * 2))) / planeYCoordinate
    const scale = signedScale2 > 0 ? signedScale2 : 0
    return scale
}

const focalLength = 0.60
const calculateScaleFromZIndex = (zIndex: number) => {
    return (10) * focalLength / zIndex
}


const calculateZCoordinate = (b: number, c: number, y: number) => {
    return ((b * y)) / c
}

document.addEventListener("click", (e) => {
    if (checkPositionIsAllowed(e.x, e.y)) {
        const img = imagesArray[1]
        if (img) {
            const rand = Math.random();
            var pushed = false
            const zIndex = 1 / -calculateZCoordinate(.1, 100, e.y)
            for (let index = 0; index < mountainsRanges.length; index++) {
                const scale = calculateScaleFromZIndex(zIndex)
                //calculateScale(e.y, planeYCoordinate + index * 10)
                // const otherNewDaisy = new Figure(e.x - 200, e.y, scale, img)
                // const otherNewDaisy2 = new Figure(e.x - 100, e.y, calculateScale(e.y, planeYCoordinate), img)
                const otherNewDaisy = new Figure(e.x, e.y, calculateScale2(e.y, planeYCoordinate, scalingFactor, initialHeight), img)
                // for (let index = 0; index < 10; index++) {
                //     const otherNewDaisy3 = new Figure(e.x + index * 50, e.y, calculateScale2(e.y, planeYCoordinate, index, initialHeight), img)
                //     addElementToOrderedList(figuresArray, otherNewDaisy3)

                // }
                const combinedNoise = CombineNoise(mountainsRanges[index].range)
                const yPosition = combinedNoise.pos[otherNewDaisy.properties.x] + mountainsRanges[index].height
                const isGreaterTop = yPosition < (otherNewDaisy.properties.y)
                const isGreaterBottom = yPosition < (otherNewDaisy.properties.y + otherNewDaisy.properties.h)
                // console.log("isGreaterTop", isGreaterTop)
                // console.log("isGreaterBottom", isGreaterBottom)
                if (isGreaterBottom && !pushed) {
                    mountainsRanges[index].daisies.push(otherNewDaisy)
                    pushed = true

                }
                // if (!pushed) {
                //     pushed = true
                //     addElementToOrderedList(figuresArray, otherNewDaisy)
                //     // addElementToOrderedList(figuresArray, otherNewDaisy2)
                // }
                // console.log("------------")

            }
            // const combinedNoise1 = CombineNoise(noise1)
            // console.log(combinedNoise1.pos[otherNewDaisy.properties.x] + h / 2, otherNewDaisy.properties, combinedNoise1.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y + otherNewDaisy.properties.h))
            // mountainsRanges.reduceRight((acc: Mountain[], item) => {
            //     const combinedNoise = CombineNoise(item.range)
            //     const isGreaterTop = combinedNoise.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y)
            //     const isGreaterBottom = combinedNoise.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y + otherNewDaisy.properties.h)
            //     if (isGreaterTop)
            //         item.daisies.push(otherNewDaisy)
            //     return [...acc, item]
            // }, []);220, 42


        }
    }
    drawScene()
})

addEventListener("resize", () => setSize())

const createMountainRanges = () => {
    const rangesCount = getRandomArbitrary(2, 5)
    for (let index = 0; index < rangesCount; index++) {
        const noise = GenerateNoise(50, 128, 2, 1, w)
        const mountain: Mountain = {
            range: noise,
            height: Math.floor(h / (index + 2)),
            daisies: []
        }
        mountainsRanges.push(mountain)
    }
}

createMountainRanges()
setSize()
drawScene()
