import { drawBackgroundOnContext, setSizeBackground } from "./background"
import { sources, sourcesSize2, sourcesSize3 } from "./daisyImages"
import { Figure } from "./figure"
import { createHillsWithDaisiess, updateHillsOnSizeChange } from "./hills"
import { addElementToOrderedList, canvas, ctx, getRandomArbitrary, getRandomInt, h, imagesArray, hillsWithDaisies, w, calculateYFromXAndANgle, deltaDist, viewDist, daisiesGenerator, getXY, perspectiveCalculatingValues, imagesS2Array, imagesS3Array, exportCanvasSvg } from './utils'
addEventListener("resize", () => setSize())



function addFlowers() {
    setSize()
    daisiesGenerator.updateAreasSum(hillsWithDaisies)
    for (let index = 0; index < 1000; index++) {
        generateRandomDaisies()
    }
    drawScene()
}


function removeAllFlowers() {
    hillsWithDaisies.forEach((hill) => hill.daisies = [])
    drawScene()
}


const setSize = () => {
    ctx.globalCompositeOperation = 'destination-over'
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })

    updateHillsOnSizeChange()
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


const createFigureFromCoordinatesRandomPos = (pos: { x: number, y: number }, rand: number, img: HTMLImageElement) => {
    var pushed = false
    for (let index = 0; index < hillsWithDaisies.length; index++) {
        const newDaisy = new Figure(
            pos.x,
            pos.y,
            (index) * deltaDist + viewDist,
            img,
            hillsWithDaisies[index].slopeAngle,
            perspectiveCalculatingValues
        )
        const combinedNoise = hillsWithDaisies[index].rangeCombined
        const yPosition = calculateYFromXAndANgle(pos.x, combinedNoise.pos[pos.x] + hillsWithDaisies[index].height, w, hillsWithDaisies[index].slopeAngle)
        const isGreaterTop = yPosition < (pos.y)
        const isGreaterBottom = yPosition < (newDaisy.properties.y + newDaisy.properties.h * 0.15)
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
    const img = hillIndex > 0 ? hillIndex > 1 ? imagesS3Array[getRandomInt(imagesArray.length)] : imagesS2Array[getRandomInt(imagesArray.length)] : imagesArray[getRandomInt(imagesArray.length)]
    daisiesGenerator.createDaisyAtIndex(hillIndex, x, hillsWithDaisies, img)
}


document.addEventListener("click", (e) => {
    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        const pos = getXY(canvas, e)
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }
    drawScene()
})


document.getElementById("canvas")?.addEventListener('contextmenu', () => {
    drawBackgroundOnContext(ctx, false)
})

sources.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesArray.push(img)
})

sourcesSize2.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesS2Array.push(img)
})

sourcesSize3.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesS3Array.push(img)
})

createHillsWithDaisiess()
setSize()
drawScene()
setSizeBackground()
document.getElementById("exportCanvasSvg").onclick = exportCanvasSvg
document.getElementById("addFlowers").onclick = addFlowers
document.getElementById("removeAllFlowers").onclick = removeAllFlowers

