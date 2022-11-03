import { Cloud, cloudsOverlap } from "./clouds"
import { mountainStartColour, mountainEndColour, skyColours, mounstainGradientStopColour1, mounstainGradientStopColour2 } from "./constants"
import { createMountainsWithTrees, Mountains, MountainsWithTrees } from "./mountains"
import { GenerateNoise } from "./perlin"
import { newSun, sun } from "./sun"
import { ctx, getRandomArbitrary, h, int, lerpColor, mountainRanges, w } from "./utils"

const clouds: Cloud[] = []
const mountainsWithTrees: MountainsWithTrees[] = []



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

const createSkyGradient = (ctx: CanvasRenderingContext2D) => {
    var grd = ctx.createLinearGradient(0, 0, 0, h / 2)

    skyColours.forEach((colour, index) => {
        grd.addColorStop(index / skyColours.length, colour)
    })

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)


}

export const drawBackgroundOnContextReverse = (ctx: CanvasRenderingContext2D) => {

    createSkyGradient(ctx)

    sun.draw(ctx)
    clouds.forEach((cloud) => cloud.draw(ctx))

    mountainRanges.slice().reverse().forEach((mountain) => {
        mountain.drawMountain(ctx, w, h)
    })

    mountainsWithTrees.slice().reverse().forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(ctx, w, h)
        mountain.drawTrees(ctx, w, h)
    })
}

export const drawBackgroundOnContext = (ctx: CanvasRenderingContext2D, clearRect?: boolean) => {
    ctx.globalCompositeOperation = 'destination-over'
    if (clearRect) ctx.clearRect(0, 0, w, h)

    mountainsWithTrees.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawTrees(ctx, w, h)
        mountain.drawMountain(ctx, w, h)
    })
    mountainRanges.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(ctx, w, h)
    })

    clouds.forEach((cloud) => cloud.draw(ctx))
    sun.draw(ctx)

    createSkyGradient(ctx)
}




createMountains()
createClouds()
createMountainsWithTrees(mountainsWithTrees)

export const clearBackground = () => {
    while (clouds.length > 0) clouds.pop()
    while (mountainsWithTrees.length > 0) mountainsWithTrees.pop()
    while (mountainRanges.length > 0) mountainRanges.pop()
    newSun()
    createMountainsWithTrees(mountainsWithTrees)
    createMountains()
    createClouds()

}