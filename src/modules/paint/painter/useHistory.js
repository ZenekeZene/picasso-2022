import { useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import { useHotkeys } from 'react-hotkeys-hook'
import { getSvgPathFromStroke } from 'modules/paint/render'
import createPath from 'modules/paint/render/createPath'

const UNDO_SHORCUT = 'cmd+z'
const REDO_SHORCUT = 'cmd+shift+z'

const useHistory = ({ canvas, options }) => {
  const [pointer, setPointer] = useState(0)
  const [history, setHistory] = useState([])

  useHotkeys(UNDO_SHORCUT, () => onUndo(), [pointer])
  useHotkeys(REDO_SHORCUT, () => onRedo(), [pointer])

  const onUndo = useCallback(() => {
    const path = canvas.current.getElementById(`path-${pointer - 1}`)
    if (!path) return
    path.remove()
    setPointer(oldPointer => oldPointer - 1)
  }, [canvas.current, pointer, useHotkeys])

  const onRedo = useCallback(() => {
    if (!history[pointer]) return
    const config = history[pointer]
    const path = createPath(pointer, config.size, config.color, options[config.brush])
    path.setAttribute('d', getSvgPathFromStroke(getStroke(config.points, options[config.brush])))
    canvas.current.appendChild(path)
    setPointer(oldPointer => oldPointer + 1)
  }, [pointer, history])

  const onDelete = useCallback(() => {
    const paths = canvas.current.getElementsByTagName('path')
    Array.from(paths).forEach(path => path.remove())
    setPointer(0)
    setHistory([])
  }, [])

  const registerPath = (points, { color, size, brush }) => {
    setHistory(oldHistory => [...oldHistory, { points, color, size, brush }])
    setPointer(oldPointer => oldPointer + 1)
  }

  return {
    pointer,
    registerPath,
    handlers: {
      onUndo,
      onRedo,
      onDelete,
    }
  }
}

export default useHistory
