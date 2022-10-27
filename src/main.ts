import { setSizeBackground } from "./background"
import { src1, src2, src3, src4, src5, src6 } from "./daisyImages"
import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { addElementToOrderedList, calculateScale, canvas, ctx, getRandomArbitrary, getRandomInt, getRandomWithProb, h, imagesArray, initialHeight, int, lerpColor, linearFunctionBounded, hillsWithDaisies, planeYCoordinate, scalingFactor, w, mountainRanges, calculateYFromXAndANgle, binomialCoefficient, figuresArray, angle, canvasHalfh, canvasHalfw, fov, grid, deltaDist, viewDist, daisiesGenerator, reverseCalculateYFromXAndANgle } from './utils'

function addFlowers() {

    for (let index = 0; index < 1000; index++) {
        generateRandomDaisies()
    }
    drawScene()
}
document.getElementById("addFlowers").onclick = addFlowers

const img1 = new Image()
img1.src = src1
const img2 = new Image()
img2.src = src2
const img3 = new Image()
img3.src = src3
const img4 = new Image()
img4.src = src4
const img5 = new Image()
img5.src = src5
const img6 = new Image()
img6.src = src6
imagesArray.push(img1)
imagesArray.push(img2)
imagesArray.push(img3)
imagesArray.push(img4)
imagesArray.push(img5)
imagesArray.push(img6)
addEventListener("resize", () => setSize())

const setSize = () => {
    ctx.globalCompositeOperation = 'destination-over'
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })

    //calculate area of hill based on height and scale
    //this will be used to generate daisies proportionally on each hill
    hillsWithDaisies.forEach((mountain, index) => {
        if (index > 0) {
            const top = mountain.lowestYAxis
            const bottom = hillsWithDaisies[index - 1].highestYAxis
            const randFig = new Figure(
                0,
                calculateYFromXAndANgle(0, bottom, w, mountain.slopeAngle),
                (index) * deltaDist + viewDist,
                imagesArray[getRandomInt(imagesArray.length)],
                mountain.slopeAngle)
            randFig.changeProperties(fov, (index) * deltaDist + viewDist, angle, grid)

            mountain.updateArea((Math.abs(top - bottom) * w)
                / (Math.abs(randFig.properties.h * randFig.properties.w)))
        }
        else {
            const top = mountain.lowestYAxis
            const bottom = h + mountain.offsetHeight + 10
            const randFig = new Figure(
                0,
                calculateYFromXAndANgle(0, bottom, w, mountain.slopeAngle),
                (index) * deltaDist + viewDist,
                imagesArray[getRandomInt(imagesArray.length)],
                mountain.slopeAngle)
            randFig.changeProperties(fov, (index) * deltaDist + viewDist, angle, grid)

            mountain.updateArea((Math.abs(top - bottom) * w)
                / (Math.abs(randFig.properties.h * randFig.properties.w)))
        }
    })

    daisiesGenerator.updateAreasSum(hillsWithDaisies)

    drawScene()
}


const drawScene = () => {


    ctx.clearRect(0, 0, w, h)
    hillsWithDaisies.forEach((mountain, index) => {
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
        const newDaisy = new Figure(
            pos.x,
            pos.y,
            (index) * deltaDist + viewDist,
            img,
            hillsWithDaisies[index].slopeAngle
        )
        const combinedNoise = hillsWithDaisies[index].rangeCombined
        const yPosition = calculateYFromXAndANgle(pos.x, combinedNoise.pos[pos.x] + hillsWithDaisies[index].height, w, hillsWithDaisies[index].slopeAngle)
        const isGreaterTop = yPosition < (pos.y)
        const isGreaterBottom = yPosition < (newDaisy.properties.y + newDaisy.properties.h)

        if (!isGreaterTop && isGreaterBottom && !pushed && rand < 0.5) {
            addElementToOrderedList(hillsWithDaisies[index].daisies, newDaisy)
            pushed = true
        }
        if (isGreaterTop && !pushed) {

            addElementToOrderedList(hillsWithDaisies[index].daisies, newDaisy)
            pushed = true
        }
        if (pushed)
            break

    }
}

const generateRandomDaisies = () => {
    const x = getRandomInt(w)
    daisiesGenerator.updateyCoordinates(hillsWithDaisies, x)
    const hillIndex = daisiesGenerator.getHillIndex(getRandomArbitrary(0, daisiesGenerator.areasSum), hillsWithDaisies)
    const img = imagesArray[getRandomInt(imagesArray.length)]
    daisiesGenerator.createDaisyAtIndex(hillIndex, x, hillsWithDaisies, img)
}


document.addEventListener("click", (e) => {
    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        const pos = getXY(canvas, e)
        // console.log(pos.y, reverseCalculateYFromXAndANgle(pos.x, pos.y, w, Math.PI / 12))
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }

    drawScene()
})


const createHillsWithDaisiess = () => {
    const start = "#447741"
    const end = "#C6CC51"
    const layers = getRandomArbitrary(2, 5)
    const bottom = h * 0.5
    const top = h * 0.9

    const slope = getRandomArbitrary(-Math.PI / 12, Math.PI / 12)

    var heightUnit = (bottom - top) / (layers + 1)

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1))
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


createHillsWithDaisiess()
setSize()
drawScene()
setSizeBackground()

