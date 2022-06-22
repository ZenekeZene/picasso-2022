import { useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import { useHotkeys } from 'react-hotkeys-hook'
import { getSvgPathFromStroke } from 'modules/paint/render'
import createPath from 'modules/paint/render/createPath'
import useObserverDOM from 'hooks/useObserverDOM'
import useEventListener from 'hooks/useEventListener'

const UNDO_SHORCUT = 'cmd+z'
const REDO_SHORCUT = 'cmd+shift+z'

const useHistory = ({ canvasRef, options }) => {
  const [pointer, setPointer] = useState(0)
  const [history, setHistory] = useState([])

  useHotkeys(UNDO_SHORCUT, () => onUndo(), [pointer])
  useHotkeys(REDO_SHORCUT, () => onRedo(), [pointer])

  useEventListener('touchstart', (event) => {
    const touchesLength = event.touches.length
    if (touchesLength === 3) { onRedo() }
  })

  useObserverDOM(canvasRef, () => {
    const pathsLength = canvasRef.current.childNodes.length - 1
    setPointer(pathsLength)
  })

  const onUndo = useCallback(() => {
    if (pointer === 0) return
    const path = canvasRef.current.lastChild
    path?.remove()
  }, [pointer, canvasRef])

  const onRedo = useCallback(() => {
    const config = history[pointer]
    if (!config) return
    const path = createPath(pointer, config.size, config.color, options[config.brush])
    path.setAttribute('d', getSvgPathFromStroke(getStroke(config.points, options[config.brush])))
    canvasRef.current.appendChild(path)
  }, [canvasRef, options, history, pointer])

  const onDelete = useCallback(() => {
    const paths = canvasRef.current.getElementsByTagName('path')
    Array.from(paths).forEach(path => path.remove())
    setPointer(0)
    setHistory([])
  }, [canvasRef])

  const adjustHistory = () => {
    if (history.length < pointer) return
    const adjustedHistory = history.splice(0, pointer)
    setHistory(adjustedHistory)
  }

  const registerPath = (points, { color, size, brush }) => {
    setHistory(oldHistory => [...oldHistory, { points, color, size, brush }])
  }

  return {
    pointer,
    registerPath,
    adjustHistory,
    handlers: {
      onUndo,
      onRedo,
      onDelete,
    }
  }
}

export default useHistory
