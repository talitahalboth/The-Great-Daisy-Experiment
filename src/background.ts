import { Cloud, cloudsOverlap } from "./clouds"
import { mountainStartColour, mountainEndColour, skyColours, mounstainGradientStopColour1, mounstainGradientStopColour2 } from "./constants"
import { createMountainsWithTrees, Mountains, MountainsWithTrees } from "./mountains"
import { GenerateNoise } from "./perlin"
import { sun } from "./sun"
import { getRandomArbitrary, h, int, lerpColor, mountainRanges, w } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = w
let height = backgroundCanvas.height = h
const clouds: Cloud[] = []
const mountainsWithTrees: MountainsWithTrees[] = []


createMountainsWithTrees(mountainsWithTrees)

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
        const gradient = [
            lerpColor(mounstainGradientStopColour1.start, mounstainGradientStopColour1.end, index / layers)
            , lerpColor(mounstainGradientStopColour2.start, mounstainGradientStopColour2.end, index / layers)

        ]
        const m = new Mountains({
            color: lerpColor(start, end, index / layers),
            colourGradient: gradient,
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
            })
            if (!overlap) clouds.push(newCloud)
            else {

            }
            attempts++
        } while (overlap && attempts < 20)

    }
}

const createSkyGradient = (backgroundCtx: CanvasRenderingContext2D) => {
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, h / 2)

    skyColours.forEach((colour, index) => {
        grd.addColorStop(index / skyColours.length, colour)
    })

    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)


}

export const drawBackgroundOnContextReverse = (backgroundCtx: CanvasRenderingContext2D) => {

    createSkyGradient(backgroundCtx)

    sun.draw(backgroundCtx)
    clouds.forEach((cloud) => cloud.draw(backgroundCtx))

    mountainRanges.slice().reverse().forEach((mountain) => {
        mountain.drawMountain(backgroundCtx, w, h)
    })

    mountainsWithTrees.slice().reverse().forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(backgroundCtx, w, h)
        mountain.drawTrees(backgroundCtx, w, h)
    })
}

export const drawBackgroundOnContext = (backgroundCtx: CanvasRenderingContext2D, clearRect?: boolean) => {
    backgroundCtx.globalCompositeOperation = 'destination-over'
    if (clearRect) backgroundCtx.clearRect(0, 0, width, backgroundCanvas.height)

    mountainsWithTrees.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawTrees(backgroundCtx, w, h)
        mountain.drawMountain(backgroundCtx, w, h)
    })
    mountainRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(backgroundCtx, w, h)
    })

    clouds.forEach((cloud) => cloud.draw(backgroundCtx))
    sun.draw(backgroundCtx)

    createSkyGradient(backgroundCtx)
}



export const setSizeBackground = () => {
    height = backgroundCanvas.height = h
    width = backgroundCanvas.width = w

    drawBackgroundOnContext(backgroundCtx)
}

createMountains()
createClouds()