// import ctx from "@mithrandirii/canvas2svg"
import { Cloud, cloudsOverlap } from "./clouds"
import { mountainStartColour, mountainEndColour, skyColours, mounstainGradientStopColour1, mounstainGradientStopColour2, treesLakeGradientStopColour2, treesLakeGradientStopColour1, mounstainLakeGradientStopColour2, mounstainLakeGradientStopColour1, treesGradientStopColour1, treesGradientStopColour2 } from "./constants"
import { createMountainsWithTrees, Mountains, MountainsWithTrees } from "./mountains"
import { GenerateNoise } from "./perlin"
import { newSun, sun } from "./sun"
import { getRandomArbitrary, h, int, lerpColor, mountainRanges, w, ctx } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = w
let height = backgroundCanvas.height = h
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

const createSkyGradient = (backgroundCtx: CanvasRenderingContext2D) => {
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, h / 2)

    skyColours.forEach((colour, index) => {
        grd.addColorStop(index / skyColours.length, colour)
    })

    backgroundCtx.fillStyle = grd
    backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)


}

const drawskyAndMountainsReverse = (backgroundCtx: CanvasRenderingContext2D) => {

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

export const drawBackgroundOnContextReverse = (ctx: CanvasRenderingContext2D) => {


    drawskyAndMountainsReverse(ctx)
    ctx.clearRect(0, h * 0.6, width, h)
    ctx.globalAlpha = 1

    ctx.save()
    ctx.translate(0, h + h / 5)
    ctx.scale(1, -1);
    mountainsWithTrees.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(ctx, w, h)
        mountain.drawTrees(ctx, w, h)
    })
    ctx.fillStyle = "blue"
    // ctx.rect(0, 0, w, h)
    ctx.fill()
    ctx.restore()


    // ctx.fillStyle = "blue"
    // ctx.globalAlpha = 0.5
    // ctx.rect(0, h * 0.6, w, h)
    // ctx.fill()
    // ctx.globalAlpha = 1
}

const drawskyAndMountains = (backgroundCtx: CanvasRenderingContext2D) => {
    backgroundCtx.globalCompositeOperation = 'destination-over'
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
    backgroundCtx.globalCompositeOperation = 'source-over'
}

const createLakeGradient = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    var grd = ctx.createLinearGradient(0, h * 0.6, 0, h * 0.6 + h)
    const lakeColours = ["#dd7660", "#43304c"]
    // grd.addColorStop(0.5,)
    // grd.addColorStop(1, )
    lakeColours.forEach((colour, index) => {
        grd.addColorStop(index / skyColours.length, colour)
    })


    ctx.fillStyle = grd
    ctx.rect(x, y, width, height)
    ctx.fill()
    // backgroundCtx.fillStyle = grd
    // backgroundCtx.fillRect(0, 0, width, backgroundCanvas.height)
}

export const drawBackgroundOnContext = (ctx: CanvasRenderingContext2D, clearRect?: boolean) => {
    ctx.globalCompositeOperation = 'source-over'
    if (clearRect) ctx.clearRect(0, 0, width, backgroundCanvas.height)

    drawskyAndMountains(ctx)


    // ctx.clearRect(0, h * 0.6, width, h - h * 0.6)



    // createLakeGradient(ctx, 0, 0, w, h)

}


export const drawLakeOnContext = (ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, width, backgroundCanvas.height)


    ctx.save()
    ctx.translate(0, h + h / 5)
    ctx.scale(1, -1);
    // ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    mountainsWithTrees.forEach((mountain, index) => {
        const gradient = [
            lerpColor(treesLakeGradientStopColour2.start, treesLakeGradientStopColour1.end, index / mountainsWithTrees.length)
            , lerpColor(treesLakeGradientStopColour2.start, treesLakeGradientStopColour2.end, index / mountainsWithTrees.length)

        ]
        console.log(gradient)
        mountain.colourGradient = gradient
    })
    mountainRanges.forEach((mountain, index) => {
        const gradient = [
            lerpColor(mounstainLakeGradientStopColour2.start, mounstainLakeGradientStopColour2.end, index / mountainsWithTrees.length)
            , lerpColor(mounstainLakeGradientStopColour1.start, mounstainLakeGradientStopColour1.end, index / mountainsWithTrees.length)

        ]
        console.log(gradient)
        mountain.colourGradient = gradient
    })

    mountainRanges.slice().reverse().forEach((mountain, index) => {
        // if (index == 0) {

        mountain.updateMountains(h / (index + 1), w)
        // mountain.drawMountain(ctx, w, h)
        // }
    })

    mountainsWithTrees.slice().reverse().forEach((mountain, index) => {
        // if (index == 0) {

        mountain.updateMountains(h / (index + 1), w)
        mountain.drawMountain(ctx, w, h)
        mountain.drawTrees(ctx, w, h)
        // }
    })
    ctx.closePath()
    // ctx.globalCompositeOperation = 'source-over'


    ctx.restore()

    // ctx.globalCompositeOperation = 'lighten'
    // ctx.beginPath()
    // ctx.fillStyle = "white"
    // ctx.globalAlpha = 0.05
    // ctx.rect(0, h * 0.6, width, h - h * 0.6)
    // createLakeGradient(ctx, 0, h * 0.6, width, h - h * 0.6)
    // ctx.fill()
    // ctx.closePath()
    // ctx.globalAlpha = 1
    ctx.clearRect(0, 0, width, h * 0.6)


    ctx.globalCompositeOperation = 'destination-over'
    // // ctx.globalCompositeOperation = 'lighten'
    // ctx.beginPath()
    // ctx.fillStyle = "white"
    // // ctx.globalAlpha = 0.05
    // ctx.rect(0, h * 0.6, width, h - h * 0.6)
    // // createLakeGradient(ctx, 0, h * 0.6, width, h - h * 0.6)
    // ctx.fill()
    // ctx.closePath()
    // ctx.globalAlpha = 1
    ctx.beginPath()
    createLakeGradient(ctx, 0, h * 0.6, width, h)
    ctx.closePath()

    mountainsWithTrees.forEach((mountain, index) => {
        const gradient = [
            lerpColor(treesGradientStopColour1.start, treesGradientStopColour1.end, index / mountainsWithTrees.length)
            , lerpColor(treesGradientStopColour2.start, treesGradientStopColour2.end, index / mountainsWithTrees.length)

        ]
        console.log(gradient)
        mountain.colourGradient = gradient
    })
    mountainRanges.forEach((mountain, index) => {
        const gradient = [
            lerpColor(mounstainGradientStopColour1.start, mounstainGradientStopColour1.end, index / mountainsWithTrees.length)
            , lerpColor(mounstainGradientStopColour2.start, mounstainGradientStopColour2.end, index / mountainsWithTrees.length)

        ]
        console.log(gradient)
        mountain.colourGradient = gradient
    })
}


export const setSizeBackground = () => {
    height = backgroundCanvas.height = h
    width = backgroundCanvas.width = w

    drawBackgroundOnContext(backgroundCtx)
    drawLakeOnContext(ctx)
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