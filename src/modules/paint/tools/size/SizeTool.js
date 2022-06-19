import { useState, useEffect } from 'react'
import './SizeTool.scss'

const SizeTool = ({ size, color, onSize, setSectionsVisibled, areSectionsVisibled }) => {
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
    <section className={ `size-tool ${!areSectionsVisibled ? '--mini': '' }` }>
      <span className="size-tool__value" onClick={ () => { setSectionsVisibled(true) }}>{ currentSize }</span>
      { areSectionsVisibled && (<>
        <input
          className="size-tool__range"
          type="range"
          min="1"
          max="70"
          value={ currentSize }
          onChange={ (event) => {
            setCurrentSize(event.target.value)
          }}
        />
        <span style={ style } className="size-tool__preview" />
      </>)}
    </section>
  )
}

export default SizeTool
