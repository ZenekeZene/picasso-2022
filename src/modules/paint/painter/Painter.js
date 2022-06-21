import { useRef, useState } from 'react'
import brushesConfig from 'modules/paint/brushes'
import Tools from 'modules/paint/tools/Tools'
import DesktopCamera from 'modules/camera/desktop/DesktopCamera'
import Filters from 'modules/paint/filters'
import usePaint from './usePaint'
import useHistory from './useHistory'
import './Painter.scss'

const Painter = () => {
  const imageContainer = useRef(null)
  const canvas = useRef(null)
  const photoCanvas = useRef(null)
  const video = useRef(null)

  const [imageLoaded, setImageLoaded] = useState(false)
  const [cameraEnabled, enableCamera] = useState(false)

  const [brush, setBrush] = useState(null)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(10)

  const config = { size, color, brush }

  const {
    handlers: historyHandlers,
    pointer,
    registerPath
  } = useHistory({ canvas, options: brushesConfig })

  const {
    handlers: paintHandlers,
    isDrawing,
  } = usePaint({
    canvas,
    pointer,
    config,
    options: brushesConfig,
    registerPath
  })

  const handleStartCamera = (stream) => {
    video.current.srcObject = stream
    enableCamera(true)
  }

  const handleTakeThePhoto = () => {
    photoCanvas.current.getContext('2d').drawImage(video.current, 0, 0, photoCanvas.current.width, photoCanvas.current.height)
   	photoCanvas.current.toDataURL('image/jpeg')
    setImageLoaded(true)
    enableCamera(false)
  }

  const removeDesktopImage = () => {
    photoCanvas.current.getContext('2d').clearRect(0, 0, photoCanvas.current.width, photoCanvas.current.height)
    setImageLoaded(false)
  }

  return (
    <main className="height-100">
      <svg
        className="canvas-svg"
        ref={ canvas }
        { ...paintHandlers }
      >
        <Filters />
      </svg>

      <DesktopCamera
        cameraEnabled={ cameraEnabled }
        enableCamera={ enableCamera }
        video={ video }
        photoCanvas={ photoCanvas }
      />

      { /* Imported image */ }
      { imageLoaded && <span className="photo-canvas-remove icon-cross" onClick={ removeDesktopImage }></span> }
      <section ref={ imageContainer }></section>

      <Tools
        isDrawing={ isDrawing }
        { ...config }
        onColor={ setColor }
        onBrush={ setBrush }
        onSize={ setSize }
        isCameraEnabled={ cameraEnabled }
        onStartCamera={ handleStartCamera }
        onTakeThePhoto={ handleTakeThePhoto }
        imageContainer={ imageContainer }
        { ...historyHandlers }
      />
    </main>
  )
}


export default Painter
