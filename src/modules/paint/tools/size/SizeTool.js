import { useState, useEffect } from 'react'
import './SizeTool.scss'

const SizeTool = ({ size, color, onSize }) => {
  const [currentSize, setCurrentSize] = useState(size)

  useEffect(() => {
    onSize(currentSize)
  }, [currentSize, onSize])

  const style = {
    width: currentSize + 'px',
    height: currentSize + 'px',
    backgroundColor: color
  }

  return (
    <section className="size-tool">
      <span className="size-tool__value">{ currentSize }</span>
      <input
        className="size-tool__range"
        type="range"
        min="1"
        max="70"
        value={ currentSize }
        onChange={ (event) => { setCurrentSize(event.target.value) }}
      ></input>
      <span style={ style } className="size-tool__preview" />
    </section>
  )
}

export default SizeTool
