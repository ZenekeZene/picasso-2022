import { useState, useEffect } from 'react'
import { BRUSHES, BRUSHES_ITERABLES } from 'modules/paint/brushes'
import './BrushTool.scss'

const BrushTool = ({ onBrush, sectionsState }) => {
  const [areSectionsVisibled, setSectionsVisibled] = sectionsState
  const [currentBrush, setCurrentBrush] = useState(BRUSHES.PENCIL)

  useEffect(() => {
    onBrush(currentBrush)
  }, [currentBrush, onBrush])

  return (
    <section className="brush-tool not-hover">
      { !areSectionsVisibled && (
        <span className={ `brush-tool__selected icon-${currentBrush}` }
          onClick={ () => { setSectionsVisibled(true) }}
        ></span>
      )}
      { areSectionsVisibled && (<ul className="brush-tool__list">
        { BRUSHES_ITERABLES.slice(0, 4).map((brush, index) =>
          <li
            key={ `brush-${index}` }
            className={ `icon-${brush}` }
            onClick={ () => {
              setCurrentBrush(brush)
              setSectionsVisibled(false)
            }}
          />
        )}
        </ul>
      )}
    </section>
  )
}

export default BrushTool
