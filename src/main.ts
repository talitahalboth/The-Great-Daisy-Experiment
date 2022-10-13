import { setSizeBackground } from "./background";
import { src1, src2, src3 } from "./daisyImages";
import { Figure } from "./figure";
import { HillsWithDaisies } from "./mountains";
import { GenerateNoise } from "./perlin";
import { addElementToOrderedList, calculateScale, canvas, ctx, getRandomArbitrary, getRandomInt, getRandomWithProb, h, imagesArray, initialHeight, int, lerpColor, linearFunctionBounded, hillsWithDaisies, planeYCoordinate, scalingFactor, w, mountainRanges, calculateYFromXAndANgle } from "./utils";

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
    // console.log(innerHeight, innerWidth)
    console.log()
    // h = canvas.height = innerHeight
    // w = canvas.width = innerWidth
    ctx.globalCompositeOperation = 'destination-over'
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })
    mountainRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })
    drawScene()
}


const drawScene = () => {
    ctx.clearRect(0, 0, w, h)
    hillsWithDaisies.forEach((mountain) => {
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
    for (let index = 0; index < hillsWithDaisies.length; index++) {
        const otherNewDaisy = new Figure(pos.x, pos.y, calculateScale(pos.y, planeYCoordinate + index * 50, scalingFactor, initialHeight), img)
        const combinedNoise = hillsWithDaisies[index].rangeCombined
        const yPosition = calculateYFromXAndANgle(pos.x, combinedNoise.pos[pos.x] + hillsWithDaisies[index].height, w, hillsWithDaisies[index].slopeAngle)
        const isGreaterTop = yPosition < (pos.y)
        const isGreaterBottom = yPosition < (otherNewDaisy.properties.y + otherNewDaisy.properties.h)
        if (!isGreaterTop && isGreaterBottom && !pushed && rand < 0.5) {
            addElementToOrderedList(hillsWithDaisies[index].daisies, otherNewDaisy)
            pushed = true
        }
        if (isGreaterTop && !pushed) {
            addElementToOrderedList(hillsWithDaisies[index].daisies, otherNewDaisy)
            pushed = true
        }

    }
}

const generateRandomDaisies = () => {
    const x = getRandomInt(w)
    const yCoordinates = hillsWithDaisies.map((mountain) => {
        const y = mountain.rangeCombined.pos[x] + mountain.height
        return y
    })
    const pow = hillsWithDaisies.length / 2 + 1
    const max = pow ** yCoordinates.length
    const rand = getRandomArbitrary(1, max)
    let ix = 0
    for (let index = 1; index < max; index *= pow) {
        if (rand >= index) {
            ix++
        }
    }

    const offSetHeight = hillsWithDaisies[hillsWithDaisies.length - 1].offsetHeight
    const img = imagesArray[getRandomInt(imagesArray.length)]
    const hillIndex = ix - 1
    const pos = {
        x,
        y: getRandomArbitrary(
            hillsWithDaisies[hillIndex].lowestYAxis,
            hillIndex - 1 >= 0 ? hillsWithDaisies[hillIndex - 1].highestYAxis : (h + offSetHeight)
        )
    }
    if (pos.y > yCoordinates[hillIndex]) {
        const otherNewDaisy = new Figure(
            pos.x,
            calculateYFromXAndANgle(
                pos.x,
                pos.y,
                w,
                hillsWithDaisies[hillIndex].slopeAngle
            ),
            calculateScale(pos.y, planeYCoordinate + (hillIndex) * 60, scalingFactor, initialHeight),
            img
        )
        addElementToOrderedList(hillsWithDaisies[hillIndex].daisies, otherNewDaisy)
    }

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

    drawScene()
})

addEventListener("resize", () => setSize())


const createHillsWithDaisiess = () => {
    const start = "#447741";
    const end = "#C6CC51";
    const layers = getRandomArbitrary(2, 5)
    const bottom = h * 0.5
    const top = h * 0.9

    const slope = getRandomArbitrary(-Math.PI / 12, Math.PI / 12)

    var heightUnit = (bottom - top) / (layers + 1);

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1));
        const noise = GenerateNoise(60, 150, 2, 3, w)// GenerateNoise(40, 100, 16, 2, w)

        const m = new HillsWithDaisies({
            color: lerpColor(start, end, index / layers),
            range: noise,
            height: y,
            daisies: [],
            slopeAngle: slope,
            w
        })
        hillsWithDaisies.push(m)
    }
}


console.log(w, h)
createHillsWithDaisiess()
setSize()
drawScene()

setSizeBackground()

