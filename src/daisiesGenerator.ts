import { Figure } from "./figure"
import { HillsWithDaisies } from "./mountains"
import { h, calculateYFromXAndANgle, w, deltaDist, viewDist, addElementToOrderedList, getRandomWithProbBounded, perspectiveCalculatingValues } from "./utils"

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
            y: getRandomWithProbBounded(
                hillsWithDaisies[hillIndex].lowestYAxis - 10,
                hillIndex - 1 >= 0 ? hillsWithDaisies[hillIndex - 1].highestYAxis : (h + offSetHeight + 10)
            )
        }
        if (pos.y > this.yCoordinates[hillIndex]) {
            const newY = calculateYFromXAndANgle(
                pos.x,
                pos.y,
                w,
                hillsWithDaisies[hillIndex].slopeAngle
            )
            const newDaisy = new Figure(
                pos.x,
                newY,
                (hillIndex) * deltaDist + viewDist,
                img,
                hillsWithDaisies[hillIndex].slopeAngle,
                perspectiveCalculatingValues
            )

            addElementToOrderedList(hillsWithDaisies[hillIndex].daisies, newDaisy)
        }

    }
}