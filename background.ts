/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = window.innerWidth
let height = backgroundCanvas.height = window.innerHeight
const initialBackgroundHeight = height



addEventListener("resize", () => setSizeBackground())


function setSizeBackground() {
    height = backgroundCanvas.height = innerHeight
    width = backgroundCanvas.width = innerWidth
    backgroundCtx.globalCompositeOperation = 'destination-over'
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#8ad0f2");
    grd.addColorStop(1, "#e5f0f2");
    backgroundCtx.fillStyle = grd;
    // backgroundCtx.fillRect(0, 0, backgroundCanvas.width, initialBackgroundHeight / highestAllowedToDraw)


    backgroundCtx.fillStyle = "#9ab843"
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

}



setSizeBackground()