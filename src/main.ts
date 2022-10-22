import { setSizeBackground } from "./background"
import { src1, src2, src3 } from "./daisyImages"
import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { addElementToOrderedList, calculateScale, canvas, ctx, getRandomArbitrary, getRandomInt, getRandomWithProb, h, imagesArray, initialHeight, int, lerpColor, linearFunctionBounded, hillsWithDaisies, planeYCoordinate, scalingFactor, w, mountainRanges, calculateYFromXAndANgle, binomialCoefficient, figuresArray } from "./utils"

/**
 * 
 * 
 * ===========BEGIN===========
 * PERSPECTIVE VARIABLES
 * 
 * 
 */

// const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
// const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
export var fov = 1024 /// Field of view kind of the lense, smaller values = spheric
// export var viewDist = 30 /// view distance, higher values = further away
// export var w = canvas.width / 2 /// center of screen
// export var h = canvas.height / 2
export var angle = -60 /// grid angle
/* i, p1, p2,         /// counter and two points (corners) */
export var grid = 20 /// grid size in Cartesian
export var canvasHalfh = h / 2
export var canvasHalfw = w / 2
export var viewDist = 20
export var deltaDist = 30

/**
 * 
 * 
 * ===========END===========
 * PERSPECTIVE VARIABLES
 * 
 * 
 */

/**
 * 
 * 
 * ===========BEGIN===========
 * PERSPECTIVE ALTERATING FUNCTIONS
 * 
 * 
 */

function addFlowers() {

    for (let index = 0; index < 100; index++) {
        generateRandomDaisies()
    }
    drawScene()
}
document.getElementById("addFlowers").onclick = addFlowers;

function incVd() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewDist = viewDist + 5;
    console.log("viewDist", viewDist)
    drawScene()
}
document.getElementById("incVd").onclick = incVd;


function decVd() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewDist = viewDist - 5;
    console.log("viewDist", viewDist)
    drawScene()
}
document.getElementById("decVd").onclick = decVd;


function incdeltaDist() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deltaDist = deltaDist + 5;
    console.log("deltaDist", deltaDist)
    drawScene()
}
document.getElementById("incdeltaDist").onclick = incdeltaDist;


function decdeltaDist() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    deltaDist = deltaDist - 5;
    console.log("deltaDist", deltaDist)
    drawScene()
}
document.getElementById("decdeltaDist").onclick = decdeltaDist;

function incAngle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle = angle + 5;
    console.log("angle", angle)
    drawScene()
}
document.getElementById("incAngle").onclick = incAngle;


function decAngle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle = angle - 5;
    console.log("angle", angle)
    drawScene()
}
document.getElementById("decAngle").onclick = decAngle;

function incFov() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fov = fov * 2;
    console.log("fov", fov)
    drawScene()
}
document.getElementById("incFov").onclick = incFov;


function decFov() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fov = fov / 2;
    console.log("fov", fov)
    drawScene()
}
document.getElementById("decFov").onclick = decFov;


function incGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid = grid * 2;
    console.log("grid", grid)
    drawScene()
}
document.getElementById("incGrid").onclick = incGrid;


function decGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid = grid / 2;
    console.log("grid", grid)
    drawScene()
}
document.getElementById("decGrid").onclick = decGrid;



/**
 * 
 * 
 * ===========END===========
 * PERSPECTIVE ALTERATING FUNCTIONS
 * 
 * 
 */

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
    // h = canvas.height = innerHeight
    // w = canvas.width = innerWidth
    ctx.globalCompositeOperation = 'destination-over'
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.updateMountains(h / (index + 1), w)
    })
    drawScene()
}


const drawScene = () => {


    ctx.clearRect(0, 0, w, h)
    hillsWithDaisies.forEach((mountain, index) => {
        mountain.daisies.forEach((daisy) => {
            daisy.changeProperties(fov, index * deltaDist + viewDist, angle, grid)
        })
        mountain.drawDaisies(ctx)
        mountain.drawMountain(ctx, w, h)
    })
    figuresArray.forEach(daisy => {
        daisy.changeProperties(fov, viewDist, angle, grid)
        daisy.draw(ctx)
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
    // const newDaisyFake = new Figure(pos.x, pos.y, 20, img)
    // addElementToOrderedList(figuresArray, newDaisyFake)
    for (let index = 0; index < hillsWithDaisies.length; index++) {
        const newDaisy = new Figure(pos.x, pos.y, index * deltaDist + viewDist, img)
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

    }
}

const generateRandomDaisies = () => {
    const x = getRandomInt(w)
    const yCoordinates = hillsWithDaisies.map((mountain) => {
        const y = mountain.rangeCombined.pos[x] + mountain.height
        return y
    })
    //pra 5 layers: 3
    //pra 3 layers: 4 ??????
    // const pow = 3 + 1 / hillsWithDaisies.length
    // const max = pow ** yCoordinates.length
    // const rand = getRandomArbitrary(1, max)
    // let ix = 0
    // for (let index = 1; index < max; index *= pow) {
    //     if (rand >= index) {
    //         ix++
    //     }
    // }
    let ix = 0;
    const max = binomialCoefficient(hillsWithDaisies.length + 1, hillsWithDaisies.length - 1)
    const rand = getRandomArbitrary(0, max)
    for (let index = 1; index < hillsWithDaisies.length; index++) {
        if (rand > binomialCoefficient(index + 1, index - 1))
            ix++
    }


    const offSetHeight = hillsWithDaisies[hillsWithDaisies.length - 1].offsetHeight
    const img = imagesArray[getRandomInt(imagesArray.length)]
    const hillIndex = ix
    const pos = {
        x,
        y: getRandomArbitrary(
            hillsWithDaisies[hillIndex].lowestYAxis,
            hillIndex - 1 >= 0 ? hillsWithDaisies[hillIndex - 1].highestYAxis : (h + offSetHeight)
        )
    }
    if (pos.y > yCoordinates[hillIndex]) {
        const newDaisy = new Figure(
            pos.x,
            pos.y,
            // calculateYFromXAndANgle(
            //     pos.x,
            //     pos.y,
            //     hillIndex * deltaDist + viewDist,
            //     hillsWithDaisies[hillIndex].slopeAngle
            // ),
            hillIndex * deltaDist + viewDist,
            // calculateScale(pos.y, planeYCoordinate, scalingFactor, initialHeight, hillIndex),
            img
        )
        addElementToOrderedList(hillsWithDaisies[hillIndex].daisies, newDaisy)
    }

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

