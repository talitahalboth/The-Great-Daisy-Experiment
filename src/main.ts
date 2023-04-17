import { clearBackground, drawBackgroundOnContext } from "./background"
import { sourcesLarge, sourcesMedium, sourcesSmall, sourcesIcon } from "./daisyImages"
import { Figure } from "./figure"
import { createHillsWithDaisiess, updateHillsOnSizeChange } from "./hills"
import { addElementToOrderedList, canvas, ctx, getRandomArbitrary, getRandomInt, h, imagesArray, hillsWithDaisies, w, calculateYFromXAndANgle, deltaDist, viewDist, daisiesGenerator, getXY, perspectiveCalculatingValues, imagesS2Array, imagesS3Array, exportCanvasSvg, setSize, exportCanvasPng, imagesS4Array } from './utils'
import { inject } from '@vercel/analytics';

inject();
addEventListener("resize", () => setSize())
require('./favicon.ico')


function addFlowers() {
    setSize(true)
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


export const setHillsSize = (avoidDrawingScene?: boolean) => {
    ctx.globalCompositeOperation = 'destination-over'
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })

    updateHillsOnSizeChange()
    daisiesGenerator.updateAreasSum(hillsWithDaisies)
    if (avoidDrawingScene)
        return
    drawScene()
}


const drawScene = () => {
    ctx.clearRect(0, 0, w, h)
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.drawDaisies(ctx)
        mountain.drawMountain(ctx, w, h)
    })
    drawBackgroundOnContext(ctx)
}

const randomImageBasedOnHillIndex = (hillIndex: number) => {
    const img = hillIndex > 0 ?
        hillIndex > 1 ?
            hillIndex > 2 ? imagesS4Array[getRandomInt(imagesArray.length)] :
                imagesS3Array[getRandomInt(imagesArray.length)] :
            imagesS2Array[getRandomInt(imagesArray.length)] :
        imagesArray[getRandomInt(imagesArray.length)]
    return img
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
            const img = randomImageBasedOnHillIndex(index)
            newDaisy.img = img
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
    const img = randomImageBasedOnHillIndex(hillIndex)
    daisiesGenerator.createDaisyAtIndex(hillIndex, x, hillsWithDaisies, img)
}


document.addEventListener("click", (e) => {
    const pos = getXY(canvas, e)
    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }
    drawScene()
})


document.getElementById("canvas")?.addEventListener('contextmenu', () => {
    drawBackgroundOnContext(ctx, false)
})

sourcesLarge.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesArray.push(img)
})

sourcesMedium.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesS2Array.push(img)
})

sourcesSmall.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesS3Array.push(img)
})
sourcesIcon.forEach((source) => {
    const img = new Image()
    img.src = source
    imagesS4Array.push(img)
})

createHillsWithDaisiess()
setSize()
drawScene()
drawBackgroundOnContext(ctx, false)
const exportCanvasImgButton = document.getElementById("exportCanvasImg")

if (exportCanvasImgButton) {

    exportCanvasImgButton.onclick = ((e) => {
        e.preventDefault();
        e.stopPropagation()
        exportCanvasPng()
    })
}
const addFlowerButton = document.getElementById("addFlowers")
if (addFlowerButton) {
    addFlowerButton.onclick = ((e) => {
        e.stopPropagation()
        addFlowers()
    })
}
const removeAllFlowersButton = document.getElementById("removeAllFlowers")
if (removeAllFlowersButton) {
    removeAllFlowersButton.onclick = ((e) => {
        e.stopPropagation()
        removeAllFlowers()
    })
}



let rotation = 0
const randomizeLandscapeButton = document.getElementById("randomizeLandscape")
if (randomizeLandscapeButton) {
    randomizeLandscapeButton.onclick = ((e) => {
        const reloadSvg = document.getElementById("reloadSvg")
        if (reloadSvg) {
            rotation -= 360;
            reloadSvg.style.transform = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
        }
        e.stopPropagation()
        removeAllFlowers()
        while (hillsWithDaisies.length > 0) {
            hillsWithDaisies.pop();
        }
        clearBackground()
        createHillsWithDaisiess()
        setSize()
        drawScene()
        drawBackgroundOnContext(ctx, false)
    })
}




let isDrawing = false

canvas.onmousedown = function(e) {
    isDrawing = true
}

canvas.onmousemove = function(e) {
    if (!isDrawing) return

    const pos = getXY(canvas, e)
    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }
    drawScene()
}

canvas.onmouseup = function() {
    isDrawing = false
}


const touchStart = (evt: { preventDefault: () => void }) => {
    isDrawing = true
    if (isDrawing) {
        return;
    }
    evt.preventDefault();
};

const touchMove = (evt: any) => {
    if (!isDrawing)
        return
    const pos = getXY(canvas, evt)
    const img = imagesArray[getRandomInt(imagesArray.length)]
    if (img) {
        const rand = Math.random()
        createFigureFromCoordinatesRandomPos(pos, rand, img)
    }
    drawScene()
    evt.preventDefault();
};

const touchEnd = (evt: any) => {
    isDrawing = false;
};

canvas.addEventListener("touchstart", touchStart, false);
canvas.addEventListener("touchend", touchEnd, false);
canvas.addEventListener("touchcancel", touchEnd, false);
canvas.addEventListener("touchmove", touchMove, false);
