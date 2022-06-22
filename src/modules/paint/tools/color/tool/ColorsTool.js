import { useEffect, useState } from 'react'
import ColorsSlide from '../swiper/ColorsSlide'
import ColorsSwiper from '../swiper/ColorsSwiper'
import colors from '../colors'
import './ColorsTool.scss'

const ColorsTool = ({
  setColor,
  sectionsState: [areSectionsVisibled, setSectionsVisibled]
}) => {
  const [currentColor, setCurrentColor] = useState(colors[0][0])

  useEffect(() => {
    setColor(currentColor)
  }, [currentColor, setColor])

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
