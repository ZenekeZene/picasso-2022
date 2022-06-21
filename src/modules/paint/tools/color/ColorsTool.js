import { useEffect, useState } from 'react'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import colors from './colors'
import 'swiper/css'
import 'swiper/css/pagination'
import './ColorsTool.scss'

const swiperConfig = {
  pagination: { clickable: false },
  spaceBetween: 5,
  slidesPerView: 1,
  allowTouchMove: true
}

const ColorsSlide = ({ colors, currentColor, setCurrentColor }) => (
  <ol className="color-tool__swatches">
    { colors.map((color, index) => (
      <li
        key={ `color-${index}` }
        className={ currentColor === color ? '--selected': '' }
        onClick={ () => { setCurrentColor(color) }}
      ><span className="circle" style={{ backgroundColor: color }}></span></li>
    ))}
  </ol>
)

const ColorsTool = ({ onColor, setSectionsVisibled, areSectionsVisibled }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
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
      <Swiper
        modules={[ Pagination ]}
        { ...swiperConfig }
        className={ !areSectionsVisibled ? '--invisible' : '' }
      >
        { items.map((item, index) => <SwiperSlide key={ index }>{ item }</SwiperSlide>) }
      </Swiper>
    </article>
  )
}


export default ColorsTool
