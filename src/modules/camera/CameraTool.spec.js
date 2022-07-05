import { fireEvent, render } from "@testing-library/react"
import CameraTool from "./CameraTool"
import MobileChecker from 'adapter/Mobile.Checker'
import { act } from "react-dom/test-utils"
jest.mock('adapter/Mobile.Checker')

describe('CameraTool', () => {
  it(`shows a mobile version of camera tool
    if the current device is mobile`, () => {
    MobileChecker.mockImplementation(() => true)
    const { getByRole } = render(<CameraTool />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it(`shows a desktop version of camera tool
    if the current device is desktop`, () => {
    MobileChecker.mockImplementation(() => false)
    const { getByTestId } = render(<CameraTool />)
    expect(getByTestId('camera-tool')).toBeInTheDocument()
  })

  it(`shows a message to take the picture
    if is previouly clicked and It call to onLoad callback
    if the user take the photo`, async () => {
    MobileChecker.mockImplementation(() => false)
    const mediaDevices = { getUserMedia: jest.fn() }
    global.navigator.mediaDevices = mediaDevices

    const onLoadSpy = jest.fn()

    const { getByTestId, getByText } = render(<CameraTool onLoad={ onLoadSpy } />)
    const icon = getByTestId('camera-tool')

    await act(async () => { fireEvent.click(icon) })
    expect(getByText(/Sacar foto/)).toBeInTheDocument()

    await act(async () => { fireEvent.click(icon) })
    expect(onLoadSpy).toHaveBeenCalledTimes(1)
    const calls = onLoadSpy.mock.calls[0][0]
    expect(calls.type).toBe('canvas')
    expect(calls.url.tagName).toBe('VIDEO')
  })
})
