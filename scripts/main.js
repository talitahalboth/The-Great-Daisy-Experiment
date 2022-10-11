/// <reference path="daisyImages.ts" />
var _a, _b;
var canvas = (_a = document.getElementById("canvas")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
var ctx = (_b = canvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
var imagesArray = [];
var figuresArray = [];
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var initialHeight = h;
var planeYCoordinate = 50;
var highestAllowedToDraw = 3.5;
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
        var imgIndex = getRandomInt(imagesArray.length);
        this.img = imagesArray[imgIndex];
        var size = initialSize;
        size = size * scale;
        // slightly increase the size randomly
        size += size * randomScale / 5;
        var y = newY - Math.floor((size * img.height / img.width) / 2);
        var x = newX - Math.floor((size) / 2);
        var color = "white";
        var w = Math.floor(size * img.width / img.width);
        var h = Math.floor(size * img.height / img.width);
        this.properties = {
            x: x,
            y: y,
            w: w,
            h: h
        };
    }
    Figure.prototype.draw = function () {
        ctx.drawImage(this.img, Math.floor(this.properties.x), Math.floor(this.properties.y), Math.floor(this.properties.w), Math.floor(this.properties.h));
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
}
var addElementToOrderedList = (function (figArray, element) {
    for (var i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y <= element.properties.y) {
            figArray.splice(i, 0, element);
            return;
        }
    }
    figArray.push(element);
});
var checkPositionIsAllowed = function (x, y) {
    return y > initialHeight / highestAllowedToDraw ? true : false;
};
document.addEventListener("click", function (e) {
    var signedScale = (e.y - (initialHeight / scalingFactor)) / planeYCoordinate;
    var scale = signedScale > 0 ? signedScale : 0;
    if (checkPositionIsAllowed(e.x, e.y)) {
        var otherNewDaisy = new Figure(e.x, e.y, scale);
        addElementToOrderedList(figuresArray, otherNewDaisy);
    }
    drawFlowers();
});
drawFlowers();
