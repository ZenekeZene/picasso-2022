import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const swiperConfig = {
  pagination: { clickable: false },
  spaceBetween: 5,
  slidesPerView: 1,
  allowTouchMove: true
}

const ColorsSwiper = ({ items, areSectionsVisibled }) => (
  <Swiper
    modules={[ Pagination ]}
    { ...swiperConfig }
    className={ !areSectionsVisibled ? '--invisible' : '' }
  >
    { items.map((item, index) => <SwiperSlide key={ index }>{ item }</SwiperSlide>) }
  </Swiper>
)

export default ColorsSwiper
