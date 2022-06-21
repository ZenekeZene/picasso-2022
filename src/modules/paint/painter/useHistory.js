import { useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from 'modules/paint/render'
import createPath from 'modules/paint/render/createPath'

const useHistory = ({ canvas, options }) => {
  const [pointer, setPointer] = useState(0)
  const [history, setHistory] = useState([])

  const onUndo = useCallback(() => {
    const path = canvas.current.getElementById(`path-${pointer - 1}`)
    if (!path) return
    path.remove()
    setPointer(oldPointer => oldPointer - 1)
  }, [pointer])

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
