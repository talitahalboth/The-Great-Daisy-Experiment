import { Figure } from "./figure"
import { MountainRange } from "./mountains"

export const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
export const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
export const imagesArray: HTMLImageElement[] = []
export const figuresArray: Figure[] = []
export const mountainsRanges: MountainRange[] = []
export let w = canvas.width = 600
export let h = canvas.height = 450
export const initialHeight = h
export const planeYCoordinate = 50
export const scalingFactor = 8
export let closestToXAxis = h

const hexToRGB = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const int = (n: number) => {
    return Math.floor(n);
};
const componentToHex = (c: any) => {
    var hex = int(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const lerp = (a: number, b: number, n: number) => {
    return Math.abs((b - a) * n + a);
};


export const lerpColor = (beginning: string, end: string, percent: number) => {
    var c1 = hexToRGB(beginning) ?? { r: 0, b: 0, g: 0 };
    var c2 = hexToRGB(end) ?? { r: 0, b: 0, g: 0 };
    return rgbToHex(
        lerp(c1.r, c2.r, percent),
        lerp(c1.g, c2.g, percent),
        lerp(c1.b, c2.b, percent)
    );
};




export const addElementToOrderedList = ((figArray: Figure[], element: Figure) => {
    for (let i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y <= element.properties.y) {
            figArray.splice(i, 0, element)
            return
        }
    }
    figArray.push(element)
})


export const calculateScale = (y: number, planeYCoordinate: number, scalingFactor: number, initialHeight: number) => {
    const signedScale = (y - (initialHeight) / (scalingFactor)) / planeYCoordinate
    const scale = signedScale > 0 ? signedScale : 0
    return scale
}

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}
export const getRandomInt = (max: number) => {
    return int(Math.random() * max);
}

const map = (v: number, a1: number, b1: number, a2: number, b2: number) => {
    return (((v - a1) / (b1 - a1)) * (b2 - a2) + a2);
}

export const linearFunctionBounded = (min: number, max: number) => {
    const rand = Math.random()
    return map(rand*rand, 0, 1, min, max)
}

const exponentialFunction = (a: number, b: number, r: number, t: number) => {
    return a * (Math.pow(b, t / r))
}

export const getRandomWithProbBounded = (min: number, max: number) => {
    var d = 30
    var rand = Math.random() * d
    var a = 3
    var b = 3
    var r = 5
    var y = exponentialFunction(a, b, r, rand)
    return int(
        map(
            y,
            0,
            exponentialFunction(a, b, r, d),
            min,
            max
        )
    )
}

export const getRandomWithProb = () => {
        var min = h * 0.2 + 40
    return getRandomWithProbBounded(min, h)
//     var d = 30
//     var rand = Math.random() * d
//     var a = 3
//     var b = 3
//     var r = 5
//     var y = exponentialFunction(a, b, r, rand)
//     return int(
//         map(
//             y,
//             0,
//             exponentialFunction(a, b, r, d),
//             min,
//             h
//         )
//     )
}