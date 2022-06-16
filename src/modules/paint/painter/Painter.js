import { useRef, useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import options from 'modules/paint/config'
import Tools from 'modules/paint/tools/Tools'
import { colors } from 'modules/paint/tools/color/ColorsTool'
import { getSvgPathFromStroke } from 'modules/paint/render'
import GlowFilter from '../filters/GlowFilter'
import EffectFilter from '../filters/EffectFilter'
import BlopFilter from '../filters/BlopFilter'
import './Painter.scss'

function createPath (pointer, size, color, options) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('stroke', color)
  path.setAttribute('stroke-width', size)
  path.setAttribute('fill', color)
  path.setAttribute('id', `path-${pointer}`)
  if (options?.opacity) {
    path.setAttribute('opacity', options.opacity)
  }
  if (options?.glow) {
    path.classList.add('with-glow')
  }
  if (options?.effect) {
    path.classList.add('with-effect')
  }
  if (options?.blop) {
    path.classList.add('with-blop')
  }
  return path
}

const Painter = () => {
  const canvas = useRef(null)
  const [brush, setBrush] = useState('pencil')
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(10)
  const [pointer, setPointer] = useState(0)
  const [history, setHistory] = useState([])
  const [currentPath, setCurrentPath] = useState(null)
  const [points, setPoints] = useState([])

  const handlePointerDown = (event) => {
    const path = createPath(pointer, size, color, options[brush])
    setCurrentPath(path)
    event.target.setPointerCapture(event.pointerId)
    setPoints([[event.pageX, event.pageY, event.pressure]])
    canvas.current.appendChild(path)
  }

  const handlePointerMove = (event) => {
    if (event.buttons !== 1) return
    setPoints([...points, [event.pageX, event.pageY, event.pressure]])
    currentPath?.setAttribute('d', getSvgPathFromStroke(getStroke(points, options[brush])))
  }

  const handlePointerUp = () => {
    setHistory(oldHistory => [...oldHistory, { points, color, size, brush }])
    setPointer(oldPointer => oldPointer + 1)
    setCurrentPath(null)
    setPoints([])
  }

  const handleUndo = useCallback(() => {
    const path = canvas.current.getElementById(`path-${pointer - 1}`)
    if (!path) return
    path.remove()
    setPointer(oldPointer => oldPointer - 1)
  }, [pointer])

  const handleRedo = useCallback(() => {
    if (!history[pointer]) return
    const config = history[pointer]
    const path = createPath(pointer, config.size, config.color, options[config.brush])
    path.setAttribute('d', getSvgPathFromStroke(getStroke(config.points, options[config.brush])))
    canvas.current.appendChild(path)
    setPointer(oldPointer => oldPointer + 1)
  }, [pointer, history])

  const handleDelete = useCallback(() => {
    const paths = canvas.current.getElementsByTagName('path')
    Array.from(paths).forEach(path => path.remove())
  }, [])

  return (<>
    <svg
      className="canvas-svg"
      ref={ canvas }
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
      onPointerUp={ handlePointerUp }
    >
      <defs>
        <GlowFilter />
        <EffectFilter />
        <BlopFilter />
      </defs>
    </svg>
    <Tools
      color={ color }
      onColor={ setColor }
      onBrush={ setBrush }
      size={ size }
      onSize={ setSize }
      onUndo={ handleUndo }
      onRedo={ handleRedo }
      onDelete={ handleDelete }
    />
  </>)
}


export default Painter
