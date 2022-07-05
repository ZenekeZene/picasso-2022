import { fireEvent, render } from '@testing-library/react'
import Painter from './Painter'

jest.mock("modules/paint/tools/color/tool/ColorsTool", () => () => {
  const MockName = "Colors-tool-mock"
  return <MockName data-testid="colors-tool" />
})

jest.mock("modules/paint/filters")

describe('Painter', () => {
  it('render a svg element', () => {
    const { getByRole } = render(<Painter />)
    expect(getByRole('application')).toBeInTheDocument()
  })

  it('render all tools relationated with paint and it opens them', () => {
    const { getByLabelText, getByTestId } = render(<Painter />)
    const brushTool = getByTestId('currentBrush')
    fireEvent.click(brushTool)

    expect(getByTestId('colors-tool')).toBeInTheDocument()
    expect(getByLabelText('10')).toBeInTheDocument()
    expect(getByTestId('camera-tool')).toBeInTheDocument()
    expect(getByTestId('reply-tool')).toBeInTheDocument()
    expect(getByTestId('forward-tool')).toBeInTheDocument()
    expect(getByTestId('delete-tool')).toBeInTheDocument()
  })
})
