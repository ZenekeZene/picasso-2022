import { useRef, useState } from 'react'
import brushesConfig from 'modules/paint/brushes'
import Tools from 'modules/paint/tools/Tools'
import DesktopCameraCanvas from 'modules/camera/desktop/canvas/DesktopCameraCanvas'
import ImageCanvas from 'modules/image/ImageCanvas'
import Filters from 'modules/paint/filters'
import useHistory from 'modules/history/useHistory'
import HistoryTools from 'modules/history/HistoryTools'
import usePaint from './usePaint'
import './Painter.scss'

const Painter = () => {
  const canvasRef = useRef(null)
  const toolsRef = useRef(null)

  const brushState = useState(null)
  const colorState = useState(null)
  const sizeState = useState(10)

  const paintState = { sizeState, colorState, brushState }

  const {
    handlers: historyHandlers,
    pointer,
    registerPath,
    adjustHistory
  } = useHistory({ canvasRef, options: brushesConfig })

  const {
    handlers: paintHandlers,
    isDrawing,
  } = usePaint({
    canvasRef,
    pointer,
    paintState,
    brushesConfig,
    registerPath,
    adjustHistory
  })

  return (
    <main className="height-100">

      <svg
        className="canvas-svg"
        ref={ canvasRef }
        { ...paintHandlers }
      >
        <Filters />
      </svg>

      <Tools
        ref={ toolsRef }
        isDrawing={ isDrawing }
        { ...paintState }
        { ...historyHandlers }
      />

      <DesktopCameraCanvas toolsRef={ toolsRef } />
      <ImageCanvas toolsRef={ toolsRef } />
      <HistoryTools toolsRef={ toolsRef }
        { ...historyHandlers }
      />

    </main>
  )
}


export default Painter
