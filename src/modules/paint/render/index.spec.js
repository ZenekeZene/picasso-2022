import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from "."

jest.mock('perfect-freehand', () => ({
  getStroke: () => [[0, 1], [2, 3]]
}))

describe('getSvgPathFromStroke', () => {
  it(`turn the points returned from
    perfect-freehand into SVG path data`, () => {
    const stroke = getStroke()
    const result = getSvgPathFromStroke(stroke)
    expect(result).toBe('M 0 1 Q 0 1 1 2 2 3 1 2 Z')
  })
})
