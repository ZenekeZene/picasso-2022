import { useState } from 'react'
import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from 'modules/paint/render'
import createPath from 'modules/paint/render/createPath'

const usePaint = ({ canvas, pointer, config, options, registerPath, adjustHistory }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState(null)
  const [points, setPoints] = useState([])
  const { size, color, brush } = config

  const onPointerDown = (event) => {
    if (!event.isPrimary) return
    adjustHistory()
    const path = createPath(pointer, size, color, options[brush])
    setPoints([[event.pageX, event.pageY, event.pressure]])
    setCurrentPath(path)
    event.target.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (event.buttons !== 1) return
    setPoints([...points, [event.pageX, event.pageY, event.pressure]])
    currentPath?.setAttribute('d', getSvgPathFromStroke(getStroke(points, options[brush])))
    canvas.current.appendChild(currentPath)
    setIsDrawing(true)
  }

  const onPointerUp = (event) => {
    setIsDrawing(false)
    if (!event.isPrimary) return
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
