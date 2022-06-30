import { fireEvent, render, act, queryByLabelText } from '@testing-library/react'
import SizeTool from './SizeTool'

describe('SizeTool', () => {
  it(`shows the color of dot and the initial size value`, () => {
    const areSectionsVisibled = true
    const sizeState = [10, () => {} ]
    const { getByRole, getByLabelText } = render(
      <SizeTool
        color={ 'red' }
        sectionsState={ [areSectionsVisibled, () => {}] }
        sizeState={ sizeState }
      />
    )
    expect(getByLabelText(10)).toBeInTheDocument()
    expect(getByRole('figure')).toHaveStyle('background-color: red')
  })

  it(`update the selected size if the user moves the slider`, () => {
    const areSectionsVisibled = true
    const sizeState = [10, () => {} ]
    const { getByRole, getByLabelText } = render(
      <SizeTool
        color={ 'red' }
        sectionsState={ [areSectionsVisibled, () => {}] }
        sizeState={ sizeState }
      />
    )
    const slider = getByRole('slider')
    fireEvent.change(slider, { target: { value: 25 } })
    expect(getByLabelText(25)).toBeInTheDocument()
    expect(getByRole('figure')).toHaveStyle('width: 25px')
  })

  it(`only shows the current size if the sections are hidden`, () => {
    const areSectionsVisibled = false
    const sizeState = [12, () => {} ]
    const { queryByRole, getByText } = render(
      <SizeTool
        color={ 'red' }
        sectionsState={ [areSectionsVisibled, () => {}] }
        sizeState={ sizeState }
      />
    )
    expect(getByText(12)).toBeInTheDocument()
    expect(queryByRole('slider')).not.toBeInTheDocument()
    expect(queryByRole('figure')).not.toBeInTheDocument()
  })
})
