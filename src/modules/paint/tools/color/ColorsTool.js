import { useEffect, useState } from 'react'
import ColorsSlide from './ColorsSlide'
import colors from './colors'

import './ColorsTool.scss'
import ColorsSwiper from './ColorsSwiper'

const ColorsTool = ({ onColor, setSectionsVisibled, areSectionsVisibled }) => {
  const [currentColor, setCurrentColor] = useState(colors[0][0])

  useEffect(() => {
    onColor(currentColor)
  }, [currentColor, onColor])

  const items = colors.map((color) => (
    <ColorsSlide
      colors={ color }
      currentColor={ currentColor }
      setCurrentColor={ setCurrentColor }
    />
  ))

  return (
    <article className="color-tool not-hover">

      { !areSectionsVisibled && (
        <span className="color-tool__selected"
          style={{ backgroundColor: currentColor }}
          onClick={ () => { setSectionsVisibled(true) }}
        ></span>
      )}

      <ColorsSwiper
        items={ items }
        areSectionsVisibled={ areSectionsVisibled }
      />
    </article>
  )
}


export default ColorsTool
