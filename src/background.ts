/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = backgroundCanvas.width = 450
let height = backgroundCanvas.height = 450
const initialBackgroundHeight = height



addEventListener("resize", () => setSizeBackground())


export function setSizeBackground() {
    // height = backgroundCanvas.height = innerHeight
    // width = backgroundCanvas.width = innerWidth
    backgroundCtx.globalCompositeOperation = 'destination-over'
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300);
    grd.addColorStop(0, "#78ddfa");
    grd.addColorStop(1, "#C9F6FF");
    backgroundCtx.fillStyle = grd;
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)


    backgroundCtx.fillStyle = "#9ab843"
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)

}


