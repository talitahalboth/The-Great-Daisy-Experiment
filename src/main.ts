import { setSizeBackground } from "./background"
import { src1, src2, src3 } from "./daisyImages"
import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { addElementToOrderedList, calculateScale, canvas, ctx, getRandomArbitrary, getRandomInt, getRandomWithProb, h, imagesArray, initialHeight, int, lerpColor, linearFunctionBounded, hillsWithDaisies, planeYCoordinate, scalingFactor, w, mountainRanges, calculateYFromXAndANgle, binomialCoefficient, figuresArray } from "./utils"

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
    hillsWithDaisies.forEach((mountain) => {
        mountain.drawDaisies(ctx)
        mountain.drawMountain(ctx, w, h)
    })
    figuresArray.forEach(daisy => { daisy.draw(ctx) })
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
        const newDaisy = new Figure(pos.x, pos.y, index * 20 + 20, img)
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
    console.log(max)
    console.log(rand, ix)


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
            calculateYFromXAndANgle(
                pos.x,
                pos.y,
                w,
                hillsWithDaisies[hillIndex].slopeAngle
            ),
            calculateScale(pos.y, planeYCoordinate, scalingFactor, initialHeight, hillIndex),
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



    for (let index = 0; index < 1000; index++) {
        // generateRandomDaisies()
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

// const grid2d = () => {

//     const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
//     const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
//     const fov = 1024 /// Field of view kind of the lense, smaller values = spheric
//     const viewDist = 30 /// view distance, higher values = further away
//     const w = canvas.width / 2 /// center of screen
//     const h = canvas.height / 2
//     const angle = -60 /// grid angle
//     /* i, p1, p2,         /// counter and two points (corners) */
//     const grid = 20 /// grid size in Cartesian


//     function rotateX(x: number, y: number) {

//         let rd, ca, sa, ry, rz, f;

//         rd = angle * Math.PI / 180; /// convert angle into radians
//         ca = Math.cos(rd);
//         sa = Math.sin(rd);

//         ry = y * ca; /// convert y value as we are rotating
//         rz = y * sa; /// only around x. Z will also change

//         /// Project the new coords into screen coords
//         f = fov / (viewDist + rz);
//         const x2d = x * f + w;
//         const y2d = ry * f + h;
//         var rev = reverseRotateX(x2d, y2d)
//         if ((Math.round(rev[0]) !== x || Math.round(rev[1]) !== y)) {

//             console.log("-------------")
//             console.log(x, y)
//             console.log(Math.round(rev[0]), Math.round(rev[1]))
//             console.log(x2d, y2d)
//         }
//         return [x2d, y2d];
//     }

//     function reverseRotateX(x2d: number, y2d: number) {
//         let rd, ca, sa, ry, rz, f;

//         rd = angle * Math.PI / 180; /// convert angle into radians
//         ca = Math.cos(rd);
//         sa = Math.sin(rd);

//         const numerator = viewDist * (y2d - h)
//         const denominator = ca * fov + sa * (h - y2d)

//         const y = numerator / denominator

//         ry = y * ca; /// convert y value as we are rotating
//         rz = y * sa; /// only around x. Z will also change

//         /// Project the new coords into screen coords
//         f = fov / (viewDist + rz);

//         const x = (x2d - w) / f


//         return [x, y];

//     }



//     const strokeLine = (x1: number, y1: number, x2: number, y2: number) => {
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();
//     }

//     const drawGrid = () => {

//         /// create vertical lines
//         for (let i = -grid; i <= grid; i++) {
//             const p1 = rotateX(i, -grid);
//             const p2 = rotateX(i, grid);
//             strokeLine(p1[0], p1[1], p2[0], p2[1]); //from easyCanvasJS, see demo
//         }

//         /// create horizontal lines
//         for (let i = -grid; i <= grid; i++) {
//             const p1 = rotateX(-grid, i);
//             const p2 = rotateX(grid, i);
//             strokeLine(p1[0], p1[1], p2[0], p2[1]);
//         }
//     }


//     const doStuff = (cx: number, cy: number, color: string) => {
//         const c1 = rotateX(cx, cy); /// upper left corner
//         const c2 = rotateX(cx + 1, cy); /// upper right corner
//         const c3 = rotateX(cx + 1, cy + 1); /// bottom right corner
//         const c4 = rotateX(cx, cy + 1); /// bottom left corner

//         ctx.fillStyle = color;
//         ctx.strokeStyle = color;

//         /// draw a polygon between the points
//         ctx.beginPath();
//         ctx.moveTo(c1[0], c1[1]);
//         ctx.lineTo(c2[0], c2[1]);
//         ctx.lineTo(c3[0], c3[1]);
//         ctx.lineTo(c4[0], c4[1]);
//         ctx.closePath();

//         /// fill the polygon
//         ctx.fill();
//         ctx.strokeStyle = "black";
//     }

//     // //a hex code for blue
//     // doStuff(0, 0, "#306eba")

//     // //a hex code for yellow
//     // doStuff(-1, 0, "#e6b530")

//     // //a hex code for pink
//     // doStuff(0, -1, "#a530ba")

//     // //a hex code for green
//     // doStuff(-1, -1, "#32a862")


//     drawGrid()
//     var a = reverseRotateX(Math.random() * canvas.width, Math.random() * canvas.height)
//     doStuff(a[0], a[1], "#32a862")

//     a = reverseRotateX(Math.random() * canvas.width, Math.random() * canvas.height)
//     doStuff(a[0], a[1], "#a530ba")

//     a = reverseRotateX(Math.random() * canvas.width, Math.random() * canvas.height)
//     doStuff(a[0], a[1], "#306eba")



//     // document.addEventListener("click", (e) => {
//     //     a = reverseRotateX(e.clientX, e.clientY)
//     //     doStuff(a[0], a[1], "#306eba")
//     // })

//     // doStuff(-10, -10)

//     function drawOnCanvasX(x: number) {
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, 20);
//         ctx.strokeStyle = "red";
//         // ctx.strokeStyle("red")
//         ctx.stroke();
//     }

//     function drawOnCanvas(y: number) {
//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(20, y);
//         // ctx.strokeStyle("red")
//         ctx.strokeStyle = "red";
//         ctx.stroke();
//     }
//     function drawRuler() {
//         var ppm = 5
//         const count = Math.floor(canvas.width / ppm);

//         for (var i = 0; i < count; i++) {
//             var topPos = (i * ppm);
//             drawOnCanvas(Math.floor(topPos) + .5);
//             drawOnCanvasX(Math.floor(topPos) + .5);


//         };

//     }

//     drawRuler()

// }