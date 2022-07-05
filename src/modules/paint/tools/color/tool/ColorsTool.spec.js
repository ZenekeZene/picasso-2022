import { render } from '@testing-library/react'
import ColorsTool from './ColorsTool'

jest.mock('swiper', () => ({
  Pagination: null
}))

jest.mock('modules/paint/tools/color/swiper/ColorsSwiper.js', () => ({ items, areSectionsVisibled }) => (<div {...items } areSectionsVisibled={ areSectionsVisibled }></div>))

jest.mock('swiper/react/swiper-react.js', () => ({
  Swiper: ({ children }) => (<div>{ children }</div>),
  SwiperSlide: ({ children }) => <section>Slide:{ children }</section>
}))

describe('ColorsTool', () => {
  it.skip(`shows tree groups of swatches`, () => {
    const sectionsState = [true, () => {}]
    const { debug, getAllByText } = render(<ColorsTool
      setColor={ () => {} }
      sectionsState={ sectionsState }
    />)
    expect(getAllByText('Slide:')).toHaveLength(3)
  })
})
