import { useState, useEffect } from 'react'
import './SizeTool.scss'

const SizeTool = ({ color, onSize }) => {
  const [currentSize, setCurrentSize] = useState(16)

  useEffect(() => {
    onSize(currentSize)
  }, [currentSize])

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
