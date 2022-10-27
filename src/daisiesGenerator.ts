import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { getRandomArbitrary, h, calculateYFromXAndANgle, w, deltaDist, viewDist, fov, angle, grid, addElementToOrderedList } from "./utils"

export class DaisiesGenerator {
    areasSum = 0
    yCoordinates: number[]
    updateAreasSum(hillsWithDaisies: HillsWithDaisies[]) {
        this.areasSum = hillsWithDaisies.reduce((sum, current) => sum + current.areaProportionalToHeight, 0)
    }

    updateyCoordinates(hillsWithDaisies: HillsWithDaisies[], x: number) {
        this.yCoordinates = hillsWithDaisies.map((mountain) => {
            const y = mountain.rangeCombined.pos[x] + mountain.height
            return y
        })
    }

    getHillIndex(rand: number, hillsWithDaisies: HillsWithDaisies[]) {
        let ix = 0
        let iniValue = hillsWithDaisies[0].areaProportionalToHeight
        for (let index = 1; index < hillsWithDaisies.length; index++) {
            if (rand > iniValue)
                ix++
            iniValue += hillsWithDaisies[index].areaProportionalToHeight
        }
        return ix
    }

    createDaisyAtIndex(hillIndex: number, x: number, hillsWithDaisies: HillsWithDaisies[], img: HTMLImageElement) {
        const offSetHeight = hillsWithDaisies[hillsWithDaisies.length - 1].offsetHeight
        const pos = {
            x,
            y: getRandomArbitrary(
                hillsWithDaisies[hillIndex].lowestYAxis,
                hillIndex - 1 >= 0 ? hillsWithDaisies[hillIndex - 1].highestYAxis : (h + offSetHeight + 10)
            )
        }
        if (pos.y > this.yCoordinates[hillIndex]) {
            const newDaisy = new Figure(
                pos.x,
                // pos.y,
                calculateYFromXAndANgle(
                    pos.x,
                    pos.y,
                    w,
                    // hillIndex * deltaDist + viewDist,
                    hillsWithDaisies[hillIndex].slopeAngle
                ),
                (hillIndex) * deltaDist + viewDist,
                // calculateScale(pos.y, planeYCoordinate, scalingFactor, initialHeight, hillIndex),
                img
            )
            newDaisy.changeProperties(fov, (hillIndex) * deltaDist + viewDist, angle, grid)

            addElementToOrderedList(hillsWithDaisies[hillIndex].daisies, newDaisy)
        }

    }
}