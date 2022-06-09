import { useRef } from 'react'
import usePainter from 'modules/paint/painter/usePainter'

const Canvas = () => {
  const canvasRef = useRef(null)
  const {
    handlePointerDown,
    handlePointerMove
  } = usePainter({ target: canvasRef })

  return (<>
    <canvas
      ref={ canvasRef }
      width="600"
      height="600"
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
    ></canvas>
  </>)
}

export default Canvas
