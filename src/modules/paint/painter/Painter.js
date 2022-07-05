import { useRef, useState } from 'react'
import brushesConfig from 'modules/paint/brushes'
import Tools from 'modules/paint/tools/Tools'
import CameraTool from 'modules/camera/CameraTool'
import ImageTool from 'modules/image/ImageTool'
import ImageViewer from 'modules/image/ImageViewer'
import Filters from 'modules/paint/filters'
import useHistory from 'modules/history/useHistory'
import HistoryTools from 'modules/history/HistoryTools'
import usePaint from './usePaint'
import './Painter.scss'

const Painter = () => {
  const canvasRef = useRef(null)
  const toolsRef = useRef(null)
  const [src, setSrc] = useState(null)

  const brushState = useState(null)
  const colorState = useState(null)
  const sizeState = useState(10)
  const paintState = { sizeState, colorState, brushState }

  const {
    handlers: historyHandlers,
    pointer,
    registerPath,
    adjustHistory
  } = useHistory({ canvasRef, brushesConfig })

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
        role="application"
        { ...paintHandlers }
      >
        <Filters />
      </svg>

      <Tools
        ref={ toolsRef }
        isDrawing={ isDrawing }
        { ...paintState }
        { ...historyHandlers }
      >
        <CameraTool onLoad={ setSrc } />
        <ImageTool onLoad={ setSrc } />
        <HistoryTools { ...historyHandlers } />
      </Tools>

      <ImageViewer src={ src } />
    </main>
  )
}


export default Painter
