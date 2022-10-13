import { setSizeBackground } from "./background";
import { src1, src2, src3 } from "./daisyImages";
import { Figure } from "./figure";
import { MountainRange } from "./mountains";
import { GenerateNoise } from "./perlin";
import { addElementToOrderedList, calculateScale, canvas, ctx, getRandomArbitrary, getRandomInt, getRandomWithProb, h, imagesArray, initialHeight, int, lerpColor, linearFunctionBounded, mountainsRanges, planeYCoordinate, scalingFactor, w } from "./utils";

const img1 = new Image()
img1.src = src1
const img2 = new Image()
img2.src = src2
const img3 = new Image()
img3.src = src3
imagesArray.push(img1)
imagesArray.push(img2)
imagesArray.push(img3)
addEventListener("resize", () => setSize())

const setSize = () => {
    console.log(innerHeight, innerWidth)
    console.log()
    // h = canvas.height = innerHeight
    // w = canvas.width = innerWidth
    ctx.globalCompositeOperation = 'destination-over'
    mountainsRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })
    drawScene()
}


const drawScene = () => {
    ctx.clearRect(0, 0, w, h)
    mountainsRanges.forEach((mountain) => {
        mountain.drawDaisies(ctx)
        mountain.drawMountain(ctx, w, h)
    })
}

const getXY = (canvas: { getBoundingClientRect: () => any; }, event: { clientX: number; clientY: number; }) => {
    var rect = canvas.getBoundingClientRect();  // absolute position of canvas
    return {
        x: int(event.clientX - rect.left),
        y: int(event.clientY - rect.top)
    }
}

const createFigureFromCoordinatesRandomPos = (pos: { x: number, y: number }, rand: number, img: HTMLImageElement) => {
    var pushed = false
    for (let index = 0; index < mountainsRanges.length; index++) {
        const otherNewDaisy = new Figure(pos.x, pos.y, calculateScale(pos.y, planeYCoordinate + index * 50, scalingFactor, initialHeight), img)
        const combinedNoise = mountainsRanges[index].rangeCombined
        const yPosition = combinedNoise.pos[pos.x] + mountainsRanges[index].height
        const isGreaterTop = yPosition < (pos.y)
        const isGreaterBottom = yPosition < (otherNewDaisy.properties.y + otherNewDaisy.properties.h)
        if (!isGreaterTop && isGreaterBottom && !pushed && rand < 0.5) {
            addElementToOrderedList(mountainsRanges[index].daisies, otherNewDaisy)
            pushed = true
        }
        if (isGreaterTop && !pushed) {
            addElementToOrderedList(mountainsRanges[index].daisies, otherNewDaisy)
            pushed = true
        }

    }
}

const generateRandomDaisies = () => {
    const x = getRandomInt(w)
    const yCoordinates = mountainsRanges.map((mountain) => {
        const y = mountain.rangeCombined.pos[x] + mountain.height
        return y
    })
    const pow = 3.5
    const max = pow**yCoordinates.length
    const rand = getRandomArbitrary(1,max)
    let ix = 0
    for (let index = 1; index < max; index *= pow) {
        if (rand >= index) {
            ix++
        }
    }
    const img = imagesArray[getRandomInt(imagesArray.length)]

    const pos = {x, y : getRandomArbitrary(mountainsRanges[ix-1].lowestYAxis,ix-1-1 >= 0 ? mountainsRanges[ix-1-1].highestYAxis : h)}
    if (pos.y > yCoordinates[ix-1] ) {
        const otherNewDaisy = new Figure(pos.x, pos.y, calculateScale(pos.y, planeYCoordinate + (ix-1) * 50, scalingFactor, initialHeight), img)
        addElementToOrderedList(mountainsRanges[ix-1].daisies, otherNewDaisy)
    }
    // 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049
    
}


document.addEventListener("click", (e) => {

    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        const pos = getXY(canvas, e)
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }
    for (let index = 0; index < 1000; index++) {

        generateRandomDaisies()
    }
    // for (let index = 0; index < 1000; index++) {
    //     const y = getRandomWithProb()
    //     const x = getRandomInt(w)
        
    //     const img = imagesArray[getRandomInt(imagesArray.length)]
    //     if (img) {
    //         const rand = Math.random()
    //         const pos = { x, y }
    //         createFigureFromCoordinatesRandomPos(pos, rand, img)
    //     }
    // }

    drawScene()
})

addEventListener("resize", () => setSize())


const createMountainRanges = () => {
    const start = "#447741";
    const end = "#C6CC51";
    const layers = getRandomArbitrary(2, 5)
    const bottom = h * 0.3
    const top = h * 0.8

    var heightUnit = (bottom - top) / (layers + 1);

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1));
        const noise = GenerateNoise(40, 100, 4, 1, w)

        const m = new MountainRange({
            color: lerpColor(start, end, index / layers),
            range: noise,
            height: y,
            daisies: []
        })
        mountainsRanges.push(m)
    }
}

createMountainRanges()
setSize()
drawScene()

setSizeBackground()

