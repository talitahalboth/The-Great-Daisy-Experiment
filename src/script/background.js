/// <reference path="main.ts" />
/// <reference path="perlin.ts" />
var _a, _b;
var backgroundCanvas = (_a = document.getElementById("background-layer")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
var backgroundCtx = (_b = backgroundCanvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
var width = backgroundCanvas.width = 450;
var height = backgroundCanvas.height = 450;
var initialBackgroundHeight = height;
addEventListener("resize", function () { return setSizeBackground(); });
function setSizeBackground() {
    // height = backgroundCanvas.height = innerHeight
    // width = backgroundCanvas.width = innerWidth
    backgroundCtx.globalCompositeOperation = 'destination-over';
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    var grd = backgroundCtx.createLinearGradient(0, 0, 0, 300);
    grd.addColorStop(0, "#78ddfa");
    grd.addColorStop(1, "#C9F6FF");
    backgroundCtx.fillStyle = grd;
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCtx.fillStyle = "#9ab843";
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
}
setSizeBackground();
