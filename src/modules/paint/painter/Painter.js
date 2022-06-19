import { useRef, useState, useCallback } from 'react'
import { getStroke } from 'perfect-freehand'
import options from 'modules/paint/config'
import Tools from 'modules/paint/tools/Tools'
import { colors } from 'modules/paint/tools/color/ColorsTool'
import { getSvgPathFromStroke } from 'modules/paint/render'
import DesktopCamera from 'modules/camera/desktop/DesktopCamera'
import GlowFilter from '../filters/GlowFilter'
import BlopFilter from '../filters/BlopFilter'
import './Painter.scss'

function createPath (pointer, size, color, options) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('stroke', color)
  path.setAttribute('stroke-width', size)
  path.setAttribute('fill', color)
  path.setAttribute('id', `path-${pointer}`)

  if (options?.opacity) { path.setAttribute('opacity', options.opacity) }
  if (options?.glow) { path.classList.add('with-glow') }
  if (options?.blop) { path.classList.add('with-blop') }
  return path
}

const Painter = () => {
  const [cameraEnabled, enableCamera] = useState(false)
  const imageContainer = useRef(null)
  const canvas = useRef(null)
  const photoCanvas = useRef(null)
  const video = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
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

  const handleStartCamera = (stream) => {
    video.current.srcObject = stream
    enableCamera(true)
  }

  const handleTakeThePhoto = () => {
    photoCanvas.current.getContext('2d').drawImage(video.current, 0, 0, photoCanvas.current.width, photoCanvas.current.height)
   	const imageDataUrl = photoCanvas.current.toDataURL('image/jpeg')
    setImageLoaded(true)

   	// data url of the image
   	console.log(imageDataUrl)
    enableCamera(false)
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

  const removeDesktopImage = () => {
    photoCanvas.current.getContext('2d').clearRect(0, 0, photoCanvas.current.width, photoCanvas.current.height)
    setImageLoaded(false)
  }

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
        <BlopFilter />
      </defs>
    </svg>

    <DesktopCamera
      cameraEnabled={ cameraEnabled }
      enableCamera={ enableCamera }
      video={ video }
      photoCanvas={ photoCanvas }
    />
    { imageLoaded && <span className="photo-canvas-remove icon-cross" onClick={ removeDesktopImage }></span> }
    <section ref={ imageContainer }></section>

    <Tools
      color={ color }
      onColor={ setColor }
      onBrush={ setBrush }
      size={ size }
      onSize={ setSize }
      onUndo={ handleUndo }
      onRedo={ handleRedo }
      onDelete={ handleDelete }
      isCameraEnabled={ cameraEnabled }
      onStartCamera={ handleStartCamera }
      onTakeThePhoto={ handleTakeThePhoto }
      imageContainer={ imageContainer }
    />
  </>)
}


export default Painter
