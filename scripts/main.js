/// <reference path="daisyImages.ts" />
var _a, _b;
var canvas = (_a = document.getElementById("canvas")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
var ctx = (_b = canvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
var imagesArray = [];
var pathCleared = true;
var figuresArray = [];
var mountains = [];
var mountainsRanges = [];
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var initialHeight = h;
var planeYCoordinate = 50;
var highestAllowedToDraw = 3.5;
var initialSize = 10;
var scalingFactor = 4;
addEventListener("resize", function () { return setSize(); });
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function setSize() {
    h = canvas.height = innerHeight;
    w = canvas.width = innerWidth;
    ctx.globalCompositeOperation = 'destination-over';
    mountainsRanges.forEach(function (mountains, index) {
        mountains.range.forEach(function (noise) { return noise.fillPos(w + 1); });
        if (mountains.height === 0) {
            mountains.height = Math.floor(h / (index + 2));
        }
    });
    drawScene();
}
//perlin line plotting
function DrawMountain(L, x, style) {
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.moveTo(0, x);
    for (var i = 0; i < L.pos.length; i++) {
        ctx.lineTo(i, x + L.pos[i]);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
}
function drawScene() {
    ctx.clearRect(0, 0, w, h);
    // figuresArray.forEach((figure) => {
    //     figure.draw(ctx)
    // })
    // console.log(mountainsRanges)
    var colours = ["blue", "pink", "red", "green", "orange"];
    mountainsRanges.forEach(function (mountainsRange, index) {
        var combinedNoise = CombineNoise(mountainsRange.range);
        mountainsRange.daisies.forEach(function (figure) {
            figure.draw(ctx);
        });
        DrawMountain(combinedNoise, mountainsRange.height, colours[index]);
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
    return true;
    // return y > initialHeight / highestAllowedToDraw ? true : false
};
var calculateScale = function (y, planeYCoordinate) {
    // console.log(y)
    var signedScale = (y) / planeYCoordinate;
    var scale = signedScale > 0 ? signedScale : 0;
    return scale;
};
var calculateScale2 = function (y, planeYCoordinate, scalingFactor, initialHeight) {
    var signedScale2 = (y - ((initialHeight) / (scalingFactor * 2))) / planeYCoordinate;
    var scale = signedScale2 > 0 ? signedScale2 : 0;
    return scale;
};
var focalLength = 0.60;
var calculateScaleFromZIndex = function (zIndex) {
    return (10) * focalLength / zIndex;
};
var calculateZCoordinate = function (b, c, y) {
    return ((b * y)) / c;
};
document.addEventListener("click", function (e) {
    if (checkPositionIsAllowed(e.x, e.y)) {
        var img_1 = imagesArray[1];
        if (img_1) {
            var rand = Math.random();
            var pushed = false;
            var zIndex = 1 / -calculateZCoordinate(.1, 100, e.y);
            for (var index = 0; index < mountainsRanges.length; index++) {
                var scale = calculateScaleFromZIndex(zIndex);
                //calculateScale(e.y, planeYCoordinate + index * 10)
                // const otherNewDaisy = new Figure(e.x - 200, e.y, scale, img)
                // const otherNewDaisy2 = new Figure(e.x - 100, e.y, calculateScale(e.y, planeYCoordinate), img)
                var otherNewDaisy = new Figure(e.x, e.y, calculateScale2(e.y, planeYCoordinate, scalingFactor, initialHeight), img_1);
                // for (let index = 0; index < 10; index++) {
                //     const otherNewDaisy3 = new Figure(e.x + index * 50, e.y, calculateScale2(e.y, planeYCoordinate, index, initialHeight), img)
                //     addElementToOrderedList(figuresArray, otherNewDaisy3)
                // }
                var combinedNoise = CombineNoise(mountainsRanges[index].range);
                var yPosition = combinedNoise.pos[otherNewDaisy.properties.x] + mountainsRanges[index].height;
                var isGreaterTop = yPosition < (otherNewDaisy.properties.y);
                var isGreaterBottom = yPosition < (otherNewDaisy.properties.y + otherNewDaisy.properties.h);
                // console.log("isGreaterTop", isGreaterTop)
                // console.log("isGreaterBottom", isGreaterBottom)
                if (isGreaterBottom && !pushed) {
                    mountainsRanges[index].daisies.push(otherNewDaisy);
                    pushed = true;
                }
                // if (!pushed) {
                //     pushed = true
                //     addElementToOrderedList(figuresArray, otherNewDaisy)
                //     // addElementToOrderedList(figuresArray, otherNewDaisy2)
                // }
                // console.log("------------")
            }
            // const combinedNoise1 = CombineNoise(noise1)
            // console.log(combinedNoise1.pos[otherNewDaisy.properties.x] + h / 2, otherNewDaisy.properties, combinedNoise1.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y + otherNewDaisy.properties.h))
            // mountainsRanges.reduceRight((acc: Mountain[], item) => {
            //     const combinedNoise = CombineNoise(item.range)
            //     const isGreaterTop = combinedNoise.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y)
            //     const isGreaterBottom = combinedNoise.pos[otherNewDaisy.properties.x] + h / 2 > (otherNewDaisy.properties.y + otherNewDaisy.properties.h)
            //     if (isGreaterTop)
            //         item.daisies.push(otherNewDaisy)
            //     return [...acc, item]
            // }, []);220, 42
        }
    }
    drawScene();
});
addEventListener("resize", function () { return setSize(); });
var createMountainRanges = function () {
    var rangesCount = getRandomArbitrary(2, 5);
    for (var index = 0; index < rangesCount; index++) {
        var noise = GenerateNoise(50, 128, 2, 1, w);
        var mountain = {
            range: noise,
            height: Math.floor(h / (index + 2)),
            daisies: []
        };
        mountainsRanges.push(mountain);
    }
};
createMountainRanges();
setSize();
drawScene();
