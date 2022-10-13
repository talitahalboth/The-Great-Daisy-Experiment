
const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
const imagesArray: HTMLImageElement[] = []
const figuresArray: Figure[] = []
const mountainsRanges2: MountainRange[] = []
let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight
const initialHeight = h
const planeYCoordinate = 50
const scalingFactor = 8
let closestToXAxis = h

var hexToRGB = function (hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var int = function (n: number) {
    return Math.floor(n);
};
var componentToHex = function (c: any) {
    var hex = int(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

var rgbToHex = function (r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

var lerp = function (a: number, b: number, n: number) {
    return Math.abs((b - a) * n + a);
};


var lerpColor = function (beginning: string, end: string, percent: number) {
    var c1 = hexToRGB(beginning) ?? { r: 0, b: 0, g: 0 };
    var c2 = hexToRGB(end) ?? { r: 0, b: 0, g: 0 };
    return rgbToHex(
        lerp(c1.r, c2.r, percent),
        lerp(c1.g, c2.g, percent),
        lerp(c1.b, c2.b, percent)
    );
};



var map = function (v: number, a1: number, b1: number, a2: number, b2: number) {
    return (((v - a1) / (b1 - a1)) * (b2 - a2) + a2);
};



const addElementToOrderedList = ((figArray: Figure[], element: Figure) => {
    for (let i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y <= element.properties.y) {
            figArray.splice(i, 0, element)
            return
        }
    }
    figArray.push(element)
})


const calculateScale = (y: number, planeYCoordinate: number, scalingFactor: number, initialHeight: number) => {
    const signedScale = (y - ((initialHeight) / (scalingFactor))) / planeYCoordinate
    const scale = signedScale > 0 ? signedScale : 0
    return scale
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(max: number) {
    return int(Math.random() * max);
}

function exponentialFunction(a: number, b: number, r: number, t: number) {
    return a * (Math.pow(b, t / r))
}

function getRandomWithProb() {
    var d = 30
    var rand = Math.random() * d
    var a = 3
    var b = 3
    var r = 5
    var y = exponentialFunction(a, b, r, rand)
    var min = h / 3.5
    return int(
        map(
            y,
            0,
            exponentialFunction(a, b, r, d),
            min,
            h
        )
    )
}