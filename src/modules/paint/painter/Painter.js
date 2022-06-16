import { useRef, useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import options from 'modules/paint/config'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import { getSvgPathFromStroke } from 'modules/paint/render'
import './Painter.scss'

function createPath (pointer, size, color) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('stroke', color)
  path.setAttribute('stroke-width', size)
  path.setAttribute('fill', color)
  path.setAttribute('id', `path-${pointer}`)
  return path
}

const Painter = () => {
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(16)
  const canvas = useRef(null)
  const [pointer, setPointer] = useState(0)
  const [history, setHistory] = useState([])
  const [currentPath, setCurrentPath] = useState(null)
  const [points, setPoints] = useState([])

  const handlePointerDown = (event) => {
    const path = createPath(pointer, size, color)
    setCurrentPath(path)
    event.target.setPointerCapture(event.pointerId)
    setPoints([[event.pageX, event.pageY, event.pressure]])
    canvas.current.appendChild(path)
  }

  const handlePointerMove = (event) => {
    if (event.buttons !== 1) return
    setPoints([...points, [event.pageX, event.pageY, event.pressure]])
    currentPath?.setAttribute('d', getSvgPathFromStroke(getStroke(points, options)))
  }

  const handlePointerUp = () => {
    setHistory(oldHistory => [...oldHistory, { points, color, size }])
    setPointer(oldPointer => oldPointer + 1)
    setCurrentPath(null)
    setPoints([])
  }

  const handleUndo = useCallback(() => {
    const path = canvas.current.getElementById(`path-${pointer - 1}`)
    if (path) {
      path && path.remove()
      setPointer(oldPointer => oldPointer - 1)
    }
  }, [pointer])

  const handleRedo = useCallback(() => {
    if (!history[pointer]) return
    const path = createPath(pointer, history[pointer].size, history[pointer].color)
    path.setAttribute('d', getSvgPathFromStroke(getStroke(history[pointer].points, options)))
    canvas.current.appendChild(path)
    setPointer(oldPointer => oldPointer + 1)
  }, [pointer])

  const handleDelete = useCallback(() => {
    while (canvas.current.firstChild) {
      canvas.current.removeChild(canvas.current.firstChild)
    }
  }, [])

  return (<>
    <p>{ pointer }</p>
    <svg
      className="canvas-svg"
      ref={ canvas }
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
      onPointerUp={ handlePointerUp }
    ></svg>
    <section className="tools">
      <ColorsTool onColor={ setColor } />
      <SizeTool color={ color } onSize={ setSize } />
      <span className="icon-reply" onClick={ handleUndo } />
      <span className="icon-forward" onClick={ handleRedo } />
      <span className="icon-trash" onClick={ handleDelete } />
    </section>
  </>)
}


export default Painter
