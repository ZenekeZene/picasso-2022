import { useState } from 'react'
import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from 'modules/paint/render'
import createPath from 'modules/paint/render/createPath'

const usePaint = ({ canvas, pointer, config, options, registerPath }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState(null)
  const [points, setPoints] = useState([])
  const { size, color, brush } = config

  const onPointerDown = (event) => {
    const path = createPath(pointer, size, color, options[brush])
    setCurrentPath(path)
    event.target.setPointerCapture(event.pointerId)
    setPoints([[event.pageX, event.pageY, event.pressure]])
    canvas.current.appendChild(path)
  }

  const onPointerMove = (event) => {
    if (event.buttons !== 1) return
    setPoints([...points, [event.pageX, event.pageY, event.pressure]])
    currentPath?.setAttribute('d', getSvgPathFromStroke(getStroke(points, options[brush])))
    setIsDrawing(true)
  }

  const onPointerUp = () => {
    setIsDrawing(false)
    registerPath(points, config)
    setCurrentPath(null)
    setPoints([])
  }

  return {
    isDrawing,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    }
  }
}

export default usePaint
