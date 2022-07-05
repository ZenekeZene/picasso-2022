import { render, waitFor, fireEvent } from '@testing-library/react'
import ImageTool from './ImageTool'
import FileReaderMock from '__mocks__/FileReader'

describe('ImageTool', () => {
  it(`shows a icon to upload some image
    (and the file picker is invisible)`, () => {
    const { getByRole } = render(<ImageTool />)
    const button = getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('opacity: 0')
  })

  it('loads a file', async () => {
    const file = new File([new ArrayBuffer(1)], 'file.jpg')
    const fileReader = new FileReaderMock()
    jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader)

    const onLoadSpy = jest.fn()
    const { getByRole } = render(<ImageTool onLoad={ onLoadSpy } />)
    const button = getByRole('button')

    await waitFor(() =>
      fireEvent.change(button, {
        target: { files: [file] },
      })
    );

    fileReader.onload({ target: { result: 'my-image' } })
    const calls = onLoadSpy.mock.calls[0][0]

    expect(calls.type).toBe('image')
    expect(calls.url).toBe('my-image')
    expect(fileReader.readAsDataURL).toHaveBeenCalledTimes(1)
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(file)
  })
})
