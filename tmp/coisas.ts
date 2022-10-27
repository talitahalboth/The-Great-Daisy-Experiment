
/**
 *
 *
 * ===========BEGIN===========
 * PERSPECTIVE VARIABLES
 *
 *
 */

// // const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
// // const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
// export var fov = 1024 /// Field of view kind of the lense, smaller values = spheric
// // export var viewDist = 30 /// view distance, higher values = further away
// // export var w = canvas.width / 2 /// center of screen
// // export var h = canvas.height / 2
// export var angle = -70 /// grid angle
// /* i, p1, p2,         /// counter and two points (corners) */
// export var grid = 20 /// grid size in Cartesian
// export var canvasHalfh = h / 2
// export var canvasHalfw = w / 2
// export var viewDist = 50
// export var deltaDist = 30

// /**
//  *
//  *
//  * ===========END===========
//  * PERSPECTIVE VARIABLES
//  *
//  *
//  */

// /**
//  *
//  *
//  * ===========BEGIN===========
//  * PERSPECTIVE ALTERATING FUNCTIONS
//  *
//  *
//  */

// function addFlowers() {

//     for (let index = 0; index < 1000; index++) {
//         generateRandomDaisies()
//     }
//     drawScene()
// }
// document.getElementById("addFlowers").onclick = addFlowers

// function incVd() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     viewDist = viewDist + 5
//     inputviewDist.value = viewDist.toString()
//     console.log("viewDist", viewDist)
//     drawScene()
// }
// document.getElementById("incVd").onclick = incVd

// const inputviewDist = (document.getElementById("setVd") as HTMLInputElement)
// inputviewDist.value = viewDist.toString()
// function setVd() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     viewDist = parseInt(inputviewDist.value)
//     inputviewDist.value = viewDist.toString()
//     console.log("viewDist", viewDist)
//     drawScene()
// }


// document.getElementById("setVdbtn").onclick = setVd


// function decVd() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     viewDist = viewDist - 5
//     inputviewDist.value = viewDist.toString()
//     console.log("viewDist", viewDist)
//     drawScene()
// }
// document.getElementById("decVd").onclick = decVd


// function incdeltaDist() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     deltaDist = deltaDist + 5
//     inputdeltaDist.value = deltaDist.toString()
//     console.log("deltaDist", deltaDist)
//     drawScene()
// }
// document.getElementById("incdeltaDist").onclick = incdeltaDist

// const inputdeltaDist = (document.getElementById("setdeltaDist") as HTMLInputElement)
// inputdeltaDist.value = deltaDist.toString()
// function setdeltaDist() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     deltaDist = parseInt(inputdeltaDist.value)
//     inputdeltaDist.value = deltaDist.toString()
//     console.log("deltaDist", deltaDist)
//     drawScene()
// }


// document.getElementById("setdeltaDistbtn").onclick = setdeltaDist


// function decdeltaDist() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     deltaDist = deltaDist - 5
//     inputdeltaDist.value = deltaDist.toString()
//     console.log("deltaDist", deltaDist)
//     drawScene()
// }
// document.getElementById("decdeltaDist").onclick = decdeltaDist

// function incAngle() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     angle = angle + 5
//     inputangle.value = angle.toString()
//     console.log("angle", angle)
//     drawScene()
// }
// document.getElementById("incAngle").onclick = incAngle

// const inputangle = (document.getElementById("setAngle") as HTMLInputElement)
// inputangle.value = angle.toString()
// function setAngle() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     angle = parseInt(inputangle.value)
//     inputangle.value = angle.toString()
//     console.log("angle", angle)
//     drawScene()
// }


// document.getElementById("setAnglebtn").onclick = setAngle


// function decAngle() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     angle = angle - 5
//     inputangle.value = angle.toString()
//     console.log("angle", angle)
//     drawScene()
// }
// document.getElementById("decAngle").onclick = decAngle

// function incFov() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     fov = fov * 2
//     inputfov.value = fov.toString()
//     console.log("fov", fov)
//     drawScene()
// }
// document.getElementById("incFov").onclick = incFov

// const inputfov = (document.getElementById("setFov") as HTMLInputElement)
// inputfov.value = fov.toString()
// function setFov() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     fov = parseInt(inputfov.value)
//     inputfov.value = fov.toString()
//     console.log("fov", fov)
//     drawScene()
// }


// document.getElementById("setFovbtn").onclick = setFov


// function decFov() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     fov = fov / 2
//     inputfov.value = fov.toString()
//     console.log("fov", fov)
//     drawScene()
// }
// document.getElementById("decFov").onclick = decFov


// function incGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     grid = grid * 2
//     inputgrid.value = grid.toString()
//     console.log("grid", grid)
//     drawScene()
// }
// document.getElementById("incGrid").onclick = incGrid

// const inputgrid = (document.getElementById("setGrid") as HTMLInputElement)
// inputgrid.value = grid.toString()
// function setGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     grid = parseInt(inputgrid.value)
//     inputgrid.value = grid.toString()
//     console.log("grid", grid)
//     drawScene()
// }


// document.getElementById("setGridbtn").onclick = setGrid


// function decGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     grid = grid / 2
//     inputgrid.value = grid.toString()
//     console.log("grid", grid)
//     drawScene()
// }
// document.getElementById("decGrid").onclick = decGrid



// /**
//  *
//  *
//  * =========== END ===========
//  * PERSPECTIVE ALTERATING FUNCTIONS
//     *
//  *
//  * /
