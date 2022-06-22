import { useState } from 'react'
import { fireEvent, render, act } from '@testing-library/react'
import BrushTool from './BrushTool'

const wait = () => new Promise(resolve => setTimeout(resolve))

describe('BrushTool', () => {
  const propsDummy = {
    setBrush: () => {}
  }

  it(`shows the brush list is the sections are visible`, () => {
    const areSectionsVisibled = true
    const { getAllByRole } = render(<BrushTool
      { ...propsDummy }
      sectionsState={ [areSectionsVisibled, () => {}] }
    />)
    expect(getAllByRole('listitem')).toHaveLength(4)
  })

  it(`shows the pencil brush by default`, () => {
    const areSectionsVisibled = false
    const { getByTestId } = render(<BrushTool
      { ...propsDummy }
      sectionsState={ [areSectionsVisibled, () => {}] }
    />)
    const currentBrush = getByTestId('currentBrush')
    expect(currentBrush).toBeInTheDocument()
    expect(currentBrush.classList).toContain('icon-pencil')
  })

  it(`shows the selected brush if the user click on it`, () => {
    let areSectionsVisibled = true
    const { getAllByRole, getByTestId, rerender } = render(<BrushTool
      { ...propsDummy }
      sectionsState={ [areSectionsVisibled, () => {}] }
    />)

    const items = getAllByRole('listitem')
    const quill = items[2]
    act(() => { fireEvent.click(quill) })

    areSectionsVisibled = false
    rerender(<BrushTool
      { ...propsDummy }
      sectionsState={ [areSectionsVisibled, () => {}] }
    />)

    const currentBrush = getByTestId('currentBrush')
    expect(currentBrush.classList).toContain('icon-quill')
  })
})
