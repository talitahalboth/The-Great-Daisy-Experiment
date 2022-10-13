/// <reference path="main.ts" />
/// <reference path="perlin.ts" />

import { h, w } from "./utils"

const backgroundCanvas = document.getElementById("background-layer") as HTMLCanvasElement ?? new HTMLCanvasElement
const backgroundCtx = backgroundCanvas.getContext("2d") ?? new CanvasRenderingContext2D()

let width = w
let height = h
const initialBackgroundHeight = height



addEventListener("resize", () => setSizeBackground())


export function setSizeBackground() {
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


