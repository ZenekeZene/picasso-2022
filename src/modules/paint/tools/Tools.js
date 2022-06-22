import { useState, forwardRef } from 'react'
import ColorsTool from 'modules/paint/tools/color/tool/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import useOnClickOutside from 'hooks/useOnClickOutside'

import './Tools.scss'

const Tools = forwardRef(({
  isDrawing,
  sizeState,
  colorState: [color, setColor],
  brushState: [, setBrush],
  children,
}, ref) => {
  const sectionsState = useState(false)
  const [areSectionsVisibled, setSectionsVisibled] = sectionsState

  useOnClickOutside(ref, () => {
    if (!areSectionsVisibled) return
    setSectionsVisibled(false)
  })

  return (
    <article className="tools-wrapper"
      style={{ opacity: isDrawing ? 0.2 : 1 }}
    >
      <section className="tools" ref={ ref }>

        <ColorsTool
          setColor={ setColor }
          sectionsState={ sectionsState }
        />

        <SizeTool
          color={ color }
          sizeState={ sizeState }
          sectionsState={ sectionsState }
        />

        <BrushTool
          setBrush={ setBrush }
          sectionsState={ sectionsState }
        />

        { children }

      </section>
    </article>
  )
})

export default Tools
