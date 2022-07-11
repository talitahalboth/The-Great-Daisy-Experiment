/// <reference path="daisyImages.ts" />
var _a, _b;
var canvas = (_a = document.getElementById("canvas")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
var ctx = (_b = canvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
var imagesArray = [];
var figuresArray = [];
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var initialHeight = h;
var planeYCoordinate = 40;
var highestAllowedToDraw = 2.7;
var initialSize = 10;
var scalingFactor = 4;
setSize();
addEventListener("resize", function () { return setSize(); });
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var Figure = /** @class */ (function () {
    function Figure(newX, newY, scale) {
        var randomScale = Math.random();
        var randomIndex = getRandomInt(imagesArray.length);
        this.img = imagesArray[randomIndex];
        this.size = initialSize;
        this.size = this.size * scale;
        // slightly increase the size randomly
        this.size += this.size * randomScale / 5;
        this.y = newY - Math.floor((this.size * this.img.height / this.img.width) / 2);
        this.x = newX - Math.floor((this.size) / 2);
        this.color = "white";
    }
    Figure.prototype.draw = function () {
        // ctx.fillStyle = this.color
        // ctx.beginPath()
        // ctx.rect(this.x, this.y, this.size, this.size)
        // ctx.closePath()
        // ctx.fill()
        // ctx.stroke()
        ctx.drawImage(this.img, Math.floor(this.x), Math.floor(this.y), Math.floor(this.size * this.img.width / this.img.width), Math.floor(this.size * this.img.height / this.img.width));
    };
    return Figure;
}());
function setSize() {
    h = canvas.height = innerHeight;
    w = canvas.width = innerWidth;
    ctx.globalCompositeOperation = 'destination-over';
}
function drawFlowers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figuresArray.forEach(function (figure) {
        figure.draw();
    });
    requestAnimationFrame(drawFlowers);
}
var addElementToOrderedList = (function (figArray, element) {
    for (var i = 0; i < figArray.length; i++) {
        if (figArray[i].y <= element.y) {
            figArray.splice(i, 0, element);
            return;
        }
    }
    figArray.push(element);
});
document.addEventListener("click", function (e) {
    var unsignedScale = (e.y - (initialHeight / scalingFactor)) / planeYCoordinate;
    var scale = unsignedScale > 0 ? unsignedScale : 0;
    var y = e.y;
    var newDaisy = new Figure(e.x, e.y, e.y > initialHeight / highestAllowedToDraw ? scale : 0);
    addElementToOrderedList(figuresArray, newDaisy);
    drawFlowers();
});
drawFlowers();
// imagesArray.push(img)
// imagesArray.push(img2)
// imagesArray.push(img3)
