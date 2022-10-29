/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

import { Cloud, cloudsOverlap } from "./clouds"
import { mountainStartColour, mountainEndColour, backgroundStartColour, backgroundEndColour } from "./constants"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { sun } from "./sun"
import { getRandomArbitrary, getRandomInt, h, int, lerpColor, mountainRanges, w } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = w
let height = backgroundCanvas.height = h
const initialBackgroundHeight = height
const clouds: Cloud[] = []


const createMountains = () => {
    const start = mountainStartColour
    const end = mountainEndColour
    const layers = 2
    const bottom = h * 0.25
    const top = h * 0.45

    var heightUnit = (bottom - top) / (layers + 1)


    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1))
        const noise = GenerateNoise(100, 150, 2, 3, w)

        const m = new HillsWithDaisies({
            color: lerpColor(start, end, index / layers),
            range: noise,
            height: y,
            daisies: [],
            slopeAngle: getRandomArbitrary(-Math.PI / 12, Math.PI / 12)
        })
        mountainRanges.push(m)
    }
}

const createClouds = () => {
    const numClouds = int(getRandomArbitrary(2, 4))
    for (let index = 0; index < numClouds; index++) {
        let attempts = 0
        let overlap = false
        do {
            overlap = false
            const newCloud = new Cloud()

            clouds.forEach(cloud => {
                overlap = overlap ? overlap : cloudsOverlap(newCloud, cloud)
                overlap = overlap ? overlap : cloudsOverlap(cloud, newCloud)

            })
            if (!overlap) clouds.push(newCloud)
            else {

            }
            attempts++
        } while (overlap && attempts < 20)

    }
}

export const drawBackgroundOnContextReverse = (backgroundCtx: CanvasRenderingContext2D) => {

    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300)
    grd.addColorStop(0, backgroundStartColour)
    grd.addColorStop(1, backgroundEndColour)
    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)


    sun.draw(backgroundCtx)
    clouds.forEach((cloud) => cloud.draw(backgroundCtx))

    mountainRanges.slice().reverse().forEach((mountain) => {
        mountain.drawMountain(backgroundCtx, w, h)
    })
    backgroundCtx.globalCompositeOperation = 'destination-over'
}

export const drawBackgroundOnContext = (backgroundCtx: CanvasRenderingContext2D) => {
    backgroundCtx.globalCompositeOperation = 'destination-over'
    backgroundCtx.clearRect(0, 0, width, backgroundCanvas.height)

    mountainRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })

    mountainRanges.forEach((mountain) => {
        mountain.drawMountain(backgroundCtx, w, h)
    })

    clouds.forEach((cloud) => cloud.draw(backgroundCtx))
    sun.draw(backgroundCtx)

    backgroundCtx.globalCompositeOperation = 'destination-over'
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300)
    grd.addColorStop(0, backgroundStartColour)
    grd.addColorStop(1, backgroundEndColour)
    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)
}



export const setSizeBackground = () => {
    height = backgroundCanvas.height = h
    width = backgroundCanvas.width = w

    drawBackgroundOnContext(backgroundCtx)


    // backgroundCtx.fillStyle = "#9ab843"
    // backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

}

//https://www.123rf.com/clipart-vector/pastoral_scene.html

createMountains()
createClouds()