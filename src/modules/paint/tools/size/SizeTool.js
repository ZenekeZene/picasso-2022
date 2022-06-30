import { useState, useEffect } from 'react'
import './SizeTool.scss'

const SizeTool = ({
  color,
  sizeState: [size, setSize],
  sectionsState: [areSectionsVisibled, setSectionsVisibled]
}) => {
  const [currentSize, setCurrentSize] = useState(size)

  useEffect(() => {
    setSize(currentSize)
  }, [currentSize, setSize])

  const style = {
    width: currentSize + 'px',
    height: currentSize + 'px',
    backgroundColor: color
  }

  return (
    <section className={ `size-tool ${!areSectionsVisibled ? '--mini': '' }` }>
      <label htmlFor="size" className="size-tool__value" onClick={ () => { setSectionsVisibled(true) }}>{ currentSize }</label>
      { areSectionsVisibled && (<>
        <input
          id="size"
          className="size-tool__range"
          type="range"
          min="1"
          max="70"
          value={ currentSize }
          onChange={ (event) => {
            setCurrentSize(event.target.value)
          }}
        />
        <span
          role="figure"
          style={ style }
          className="size-tool__preview"
        />
      </>)}
    </section>
  )
}

export default SizeTool
