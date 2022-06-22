import { useState } from 'react'
import { fireEvent, render, act } from '@testing-library/react'
import BrushTool from './BrushTool'

const wait = () => new Promise(resolve => setTimeout(resolve))

describe('BrushTool', () => {
  it(`shows the brush list is the sections are visible`, () => {
    const { getAllByRole } = render(<BrushTool
      setBrush={ () => {} }
      areSectionsVisibled={ true }
      setSectionsVisibled={ () => {} }
    />)
    expect(getAllByRole('listitem')).toHaveLength(4)
  })

  it(`shows the pencil brush by default`, () => {
    const { getByTestId } = render(<BrushTool
      setBrush={ () => {} }
      areSectionsVisibled={ false }
      setSectionsVisibled={ () => {} }
    />)
    const currentBrush = getByTestId('currentBrush')
    expect(currentBrush).toBeInTheDocument()
    expect(currentBrush.classList).toContain('icon-pencil')
  })

  it(`shows the selected brush if the user click on it`, () => {
    const { getAllByRole, getByTestId, rerender } = render(<BrushTool
      setBrush={ () => {} }
      areSectionsVisibled={ true }
      setSectionsVisibled={ () => {} }
    />)

    const items = getAllByRole('listitem')
    const quill = items[2]
    act(() => { fireEvent.click(quill) })

    rerender(<BrushTool
      setBrush={ () => {} }
      areSectionsVisibled={ false }
      setSectionsVisibled={ () => {} }
    />)

    const currentBrush = getByTestId('currentBrush')
    expect(currentBrush.classList).toContain('icon-quill')
  })
})
