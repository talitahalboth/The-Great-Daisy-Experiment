"use strict";
var _a, _b;
exports.__esModule = true;
exports.getRandomWithProb = exports.getRandomInt = exports.getRandomArbitrary = exports.calculateScale = exports.addElementToOrderedList = exports.lerpColor = exports.int = exports.closestToXAxis = exports.scalingFactor = exports.planeYCoordinate = exports.initialHeight = exports.h = exports.w = exports.mountainsRanges2 = exports.figuresArray = exports.imagesArray = exports.ctx = exports.canvas = void 0;
exports.canvas = (_a = document.getElementById("canvas")) !== null && _a !== void 0 ? _a : new HTMLCanvasElement;
exports.ctx = (_b = exports.canvas.getContext("2d")) !== null && _b !== void 0 ? _b : new CanvasRenderingContext2D();
exports.imagesArray = [];
exports.figuresArray = [];
exports.mountainsRanges2 = [];
exports.w = exports.canvas.width = 450;
exports.h = exports.canvas.height = 450;
exports.initialHeight = exports.h;
exports.planeYCoordinate = 50;
exports.scalingFactor = 8;
exports.closestToXAxis = exports.h;
var hexToRGB = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
var int = function (n) {
    return Math.floor(n);
};
exports.int = int;
var componentToHex = function (c) {
    var hex = (0, exports.int)(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};
var rgbToHex = function (r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
var lerp = function (a, b, n) {
    return Math.abs((b - a) * n + a);
};
var lerpColor = function (beginning, end, percent) {
    var _a, _b;
    var c1 = (_a = hexToRGB(beginning)) !== null && _a !== void 0 ? _a : { r: 0, b: 0, g: 0 };
    var c2 = (_b = hexToRGB(end)) !== null && _b !== void 0 ? _b : { r: 0, b: 0, g: 0 };
    return rgbToHex(lerp(c1.r, c2.r, percent), lerp(c1.g, c2.g, percent), lerp(c1.b, c2.b, percent));
};
exports.lerpColor = lerpColor;
exports.addElementToOrderedList = (function (figArray, element) {
    for (var i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y <= element.properties.y) {
            figArray.splice(i, 0, element);
            return;
        }
    }
    figArray.push(element);
});
var calculateScale = function (y, planeYCoordinate, scalingFactor, initialHeight) {
    var signedScale = (y - (initialHeight) / (scalingFactor)) / planeYCoordinate;
    var scale = signedScale > 0 ? signedScale : 0;
    return scale;
};
exports.calculateScale = calculateScale;
var getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
};
exports.getRandomArbitrary = getRandomArbitrary;
var getRandomInt = function (max) {
    return (0, exports.int)(Math.random() * max);
};
exports.getRandomInt = getRandomInt;
var map = function (v, a1, b1, a2, b2) {
    return (((v - a1) / (b1 - a1)) * (b2 - a2) + a2);
};
var exponentialFunction = function (a, b, r, t) {
    return a * (Math.pow(b, t / r));
};
var getRandomWithProb = function () {
    var d = 30;
    var rand = Math.random() * d;
    var a = 3;
    var b = 3;
    var r = 5;
    var y = exponentialFunction(a, b, r, rand);
    var min = exports.h * 0.2 + 40;
    return (0, exports.int)(map(y, 0, exponentialFunction(a, b, r, d), min, exports.h));
};
exports.getRandomWithProb = getRandomWithProb;
