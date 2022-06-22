import { useRef, useState } from 'react'
import brushesConfig from 'modules/paint/brushes'
import Tools from 'modules/paint/tools/Tools'
import DesktopCameraCanvas from 'modules/camera/desktop/DesktopCameraCanvas'
import ImageCanvas from 'modules/image/ImageCanvas'
import Filters from 'modules/paint/filters'
import usePaint from './usePaint'
import useHistory from './useHistory'
import './Painter.scss'

const Painter = () => {
  const toolsRef = useRef(null)
  const canvas = useRef(null)

  const [brush, setBrush] = useState(null)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(10)

  const config = { size, color, brush }

  const {
    handlers: historyHandlers,
    pointer,
    registerPath,
    adjustHistory
  } = useHistory({ canvas, options: brushesConfig })

  const {
    handlers: paintHandlers,
    isDrawing,
  } = usePaint({
    canvas,
    pointer,
    config,
    options: brushesConfig,
    registerPath,
    adjustHistory
  })

  return (
    <main className="height-100">

      <svg
        className="canvas-svg"
        ref={ canvas }
        { ...paintHandlers }
      >
        <Filters />
      </svg>

      <Tools
        ref={ toolsRef }
        isDrawing={ isDrawing }
        { ...config }
        onColor={ setColor }
        onBrush={ setBrush }
        onSize={ setSize }
        { ...historyHandlers }
      />

      <DesktopCameraCanvas toolsRef={ toolsRef } />
      <ImageCanvas toolsRef={ toolsRef } />

    </main>
  )
}


export default Painter
