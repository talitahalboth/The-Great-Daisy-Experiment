import { drawBackgroundOnContext, drawBackgroundOnContextReverse } from "./background"
import { DaisiesGenerator } from "./daisiesGenerator"
import { Figure } from "./figure"
import { HillsWithDaisies, Mountains } from "./mountains"
import C2S from '@mithrandirii/canvas2svg'
import { setHillsSize } from "./main"

export const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
export const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
export const imagesArray: HTMLImageElement[] = []
export const imagesS2Array: HTMLImageElement[] = []
export const imagesS3Array: HTMLImageElement[] = []
export const figuresArray: Figure[] = []
export const hillsWithDaisies: HillsWithDaisies[] = []
export const mountainRanges: Mountains[] = []
export let w = canvas.width = canvas.getBoundingClientRect().width
export let h = canvas.height = canvas.getBoundingClientRect().height
export const initialHeight = h
export let closestToXAxis = h


export const fov = 1024 /// Field of view kind of the lense, smaller values = spheric
export const angle = -80 /// grid angle
export const grid = 20 /// grid size in Cartesian
export const canvasHalfh = h / 2
export const canvasHalfw = w / 2
export var viewDist = 60
export var deltaDist = 50 /// view distance, higher values = further away

export interface PerspectiveValues {
    fov: number
    angle: number
    grid: number
    w: number
    h: number
    viewDist: number
    deltaDist: number
}

export const perspectiveCalculatingValues: PerspectiveValues = {
    fov,
    angle,
    grid,
    w: canvasHalfw,
    h: canvasHalfh,
    viewDist,
    deltaDist
}

export const daisiesGenerator: DaisiesGenerator = new DaisiesGenerator()

export const calculateYFromXAndANgle = (x: number, y: number, width: number, angle: number) => {
    return y + Math.sin(angle) * (x - width / 2)
}

export const reverseCalculateYFromXAndANgle = (x: number, newY: number, width: number, angle: number) => {
    return newY - Math.sin(angle) * (x - width / 2)
}


export const setSize = () => {
    // h = canvas.height = canvas.getBoundingClientRect().height
    // w = canvas.width = canvas.getBoundingClientRect().width
    let rect = canvas.getBoundingClientRect();

    // increase the actual size of our canvas
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    // ensure all drawing operations are scaled
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.globalCompositeOperation = 'destination-over'

    w = rect.width
    h = rect.height

    setHillsSize()
    drawBackgroundOnContext(ctx, false)

}

addEventListener("resize", () => setSize())

const hexToRGB = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

export const int = (n: number) => {
    return Math.floor(n)
}
const componentToHex = (c: any) => {
    var hex = int(c).toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const lerp = (a: number, b: number, n: number) => {
    return Math.abs((b - a) * n + a)
}


export const lerpColor = (beginning: string, end: string, percent: number) => {
    var c1 = hexToRGB(beginning) ?? { r: 0, b: 0, g: 0 }
    var c2 = hexToRGB(end) ?? { r: 0, b: 0, g: 0 }

    return rgbToHex(
        lerp(c1.r, c2.r, percent),
        lerp(c1.g, c2.g, percent),
        lerp(c1.b, c2.b, percent)
    )
}

export const addElementToOrderedList = ((figArray: Figure[], element: Figure) => {
    for (let i = 0; i < figArray.length; i++) {
        if (figArray[i].properties.y + figArray[i].properties.h <= element.properties.y + element.properties.h) {
            figArray.splice(i, 0, element)
            return
        }
    }
    figArray.push(element)
})

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}
export const getRandomInt = (max: number) => {
    return int(Math.random() * max)
}

export const map = (v: number, a1: number, b1: number, a2: number, b2: number) => {
    return (((v - a1) / (b1 - a1)) * (b2 - a2) + a2)
}

export const linearFunctionBounded = (min: number, max: number) => {
    const rand = Math.random()
    return map(rand * rand, 0, 1, min, max)
}

const exponentialFunction = (a: number, b: number, r: number, t: number) => {
    return a * (Math.pow(b, t / r))
}

export const getRandomWithProbBounded = (min: number, max: number) => {

    var rand = Math.random()
    return int(map(rand * rand * rand, 0, 1, min, max))
}

export const getRandomWithProb = () => {
    var min = h * 0.2 + 40
    return getRandomWithProbBounded(min, h)
}



function saveSvg(svgEl: SVGSVGElement, name: string) {
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svgEl);

    //add name spaces.
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    //convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    //set url value to a element's href attribute.

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    //you can download svg file by right click menu.
}


export function exportCanvasSvg() {
    var ctx = new C2S({ width: w, height: h })
    ctx.clearRect(0, 0, w, h)

    drawBackgroundOnContextReverse(ctx)

    hillsWithDaisies.slice().reverse().forEach((mountain, index) => {
        mountain.drawMountain(ctx, w, h)
        mountain.drawDaisies(ctx, true)
    })
    var svg = ctx.getSvg()

    saveSvg(svg, "mySVG.svg")
}

export function exportCanvasPng() {
    const canvas = document.getElementById("hiddenCanvas") as HTMLCanvasElement ?? new HTMLCanvasElement
    const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()

    canvas.width = w
    canvas.height = h
    ctx.globalCompositeOperation = 'destination-over'

    ctx.clearRect(0, 0, w, h)

    hillsWithDaisies.forEach((mountain) => {
        // need daisies as svgUri for this addind daisies to png to work
        mountain.drawDaisies(ctx)
        mountain.drawMountain(ctx, w, h)
    })

    ctx.globalCompositeOperation = 'destination-over'
    drawBackgroundOnContext(ctx, false)

    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL()
    link.click();
}



export const getXY = (canvas: { getBoundingClientRect: () => any; }, event: { clientX: number; clientY: number; }) => {
    var rect = canvas.getBoundingClientRect();  // absolute position of canvas
    return {
        x: int(event.clientX - rect.left),
        y: int(event.clientY - rect.top)
    }
}