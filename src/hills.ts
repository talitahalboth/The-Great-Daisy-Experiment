import Gradient from "javascript-color-gradient"
const MIDPOINTS = 20
const colorArr = new Gradient()
    .setColorGradient("#212c24", "#43571f", "#8d7316", "#efc316")
    .setMidpoint(MIDPOINTS)
// .getColors()


import { hillsStartColour, hilssEndColour } from "./constants"
import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { GenerateNoise } from "./perlin"
import { getRandomArbitrary, h, w, lerpColor, hillsWithDaisies, calculateYFromXAndANgle, deltaDist, getRandomInt, imagesArray, perspectiveCalculatingValues, viewDist, map } from "./utils"

export const createHillsWithDaisiess = () => {
    const start = hillsStartColour
    const end = hilssEndColour
    const layers = getRandomArbitrary(3, 5)
    const bottom = h * 0.5
    const top = h * 0.9

    const slope = getRandomArbitrary(-Math.PI / 12, Math.PI / 12)

    var heightUnit = (bottom - top) / (layers + 1)

    for (let index = 0; index < layers; index++) {
        var y = top + getRandomArbitrary(heightUnit * index, heightUnit * (index + 1))
        const noise = GenerateNoise(30, 150, 2, 3, w)// GenerateNoise(40, 100, 16, 2, w)

        const m = new HillsWithDaisies({
            color: colorArr.getColor(map(index, 0, layers - 1, 0, MIDPOINTS) + 1),//lerpColor(start, end, index / layers),
            range: noise,
            height: y,
            daisies: [],
            slopeAngle: slope,
            w
        })
        hillsWithDaisies.push(m)
    }
}

//calculate area of hill based on height and scale
//this will be used to generate daisies proportionally on each hill

export const updateHillsOnSizeChange = () => {
    hillsWithDaisies.forEach((mountain, index) => {
        if (index > 0) {
            const top = mountain.lowestYAxis
            const bottom = hillsWithDaisies[index - 1].highestYAxis
            const randFig = new Figure(
                0,
                calculateYFromXAndANgle(0, bottom, w, mountain.slopeAngle),
                (index) * deltaDist + viewDist,
                imagesArray[getRandomInt(imagesArray.length)],
                mountain.slopeAngle,
                perspectiveCalculatingValues)
            randFig.changeProperties({ ...perspectiveCalculatingValues, viewDist: index * deltaDist + viewDist })//fov, (index) * deltaDist + viewDist, angle, grid)

            mountain.updateArea((Math.abs(top - bottom) * w)
                / (Math.abs(randFig.properties.h * randFig.properties.w)))
        }
        else {
            const top = mountain.lowestYAxis
            const bottom = h + mountain.offsetHeight + 10
            const randFig = new Figure(
                0,
                calculateYFromXAndANgle(0, bottom, w, mountain.slopeAngle),
                (index) * deltaDist + viewDist,
                imagesArray[getRandomInt(imagesArray.length)],
                mountain.slopeAngle,
                perspectiveCalculatingValues)
            randFig.changeProperties({ ...perspectiveCalculatingValues, viewDist: index * deltaDist + viewDist })

            mountain.updateArea((Math.abs(top - bottom) * w)
                / (Math.abs(randFig.properties.h * randFig.properties.w)))
        }
    })

}