import { useRef, useState, useEffect} from 'react'
import { getStroke } from 'perfect-freehand'
import options from 'modules/paint/config'
import { getSvgPathFromStroke } from 'modules/paint/render'

const calculateRelativeCoordinates = (event) => {
  const x = event.pageX - event.target.getBoundingClientRect().x
  const y = event.pageY - event.target.getBoundingClientRect().y
  return { x, y }
}

const usePainter = ({ target }) => {
  const ctx = useRef(null)

  const [points, setPoints] = useState([])

  useEffect(() => {
    ctx.current = target.current.getContext('2d')
  }, [target])

  const handlePointerDown = (event) => {
    event.target.setPointerCapture(event.pointerId)
    const { x, y } = calculateRelativeCoordinates(event)
    setPoints([[x, y, event.pressure]])
  }

  const handlePointerMove = (event) => {
    if (event.buttons !== 1) return
    const { x, y } = calculateRelativeCoordinates(event)
    setPoints([...points, [x, y, event.pressure]])
  }

  const stroke = getStroke(points, options)
  const pathData = getSvgPathFromStroke(stroke)
  const myPath = new Path2D(pathData)

  ctx?.current?.fill(myPath)

  return {
    handlePointerDown,
    handlePointerMove,
  }
}

export default usePainter
