var _a, _b;
/// <reference path="main.ts" />
var backgroundCanvas = (_a = document.getElementById("background-layer")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
var backgroundCtx = (_b = backgroundCanvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
var width = backgroundCanvas.width = window.innerWidth;
var height = backgroundCanvas.height = window.innerHeight;
var initialBackgroundHeight = height;
setSizeBackground();
addEventListener("resize", function () { return setSizeBackground(); });
function setSizeBackground() {
    height = backgroundCanvas.height = innerHeight;
    width = backgroundCanvas.width = innerWidth;
    backgroundCtx.globalCompositeOperation = 'destination-over';
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#8ad0f2");
    grd.addColorStop(1, "#e5f0f2");
    backgroundCtx.fillStyle = grd;
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, initialBackgroundHeight / highestAllowedToDraw);
    backgroundCtx.fillStyle = "#9ab843";
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
}
