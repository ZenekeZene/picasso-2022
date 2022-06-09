import { useState } from 'react'
import { getStroke } from 'perfect-freehand'
import options from 'modules/paint/config'
import { getSvgPathFromStroke } from 'modules/paint/render'

const Painter = () => {
  const [points, setPoints] = useState([])

  const handlePointerDown = (event) => {
    event.target.setPointerCapture(event.pointerId)
    setPoints([[event.pageX, event.pageY, event.pressure]])
  }

  const handlePointerMove = (event) => {
    if (event.buttons !== 1) return
    setPoints([...points, [event.pageX, event.pageY, event.pressure]])
  }

  const stroke = getStroke(points, options)
  const pathData = getSvgPathFromStroke(stroke)

  return (
    <svg
      onPointerDown={ handlePointerDown }
      onPointerMove={ handlePointerMove }
      style={{ touchAction: "none" }}
    >
      { points && <path d={ pathData } /> }
    </svg>
  )
}


export default Painter
