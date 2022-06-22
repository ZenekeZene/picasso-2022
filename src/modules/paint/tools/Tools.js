import { useState, forwardRef } from 'react'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import MobileCamera from 'modules/camera/mobile/MobileCamera'
import HistoryTools from 'modules/paint/tools/history/HistoryTools'
import checkIsMobile from 'adapter/Mobile.Checker'
import useOnClickOutside from 'hooks/useOnClickOutside'

import './Tools.scss'

const Tools = forwardRef(({
  isDrawing,
  color, onColor,
  onBrush,
  size, onSize,
  onUndo, onRedo, onDelete,
  imageContainer,
}, ref) => {
  const sectionsState = useState(false)
  const [areSectionsVisibled, setSectionsVisibled] = sectionsState
  const isMobile = checkIsMobile()

  useOnClickOutside(ref, () => {
    if (!areSectionsVisibled) return
    setSectionsVisibled(false)
  })

  return (
    <section className="tools-wrapper"
      style={{ opacity: isDrawing ? 0.2 : 1 }}
    >
      <article className="tools" ref={ ref }>

        <ColorsTool
          onColor={ onColor }
          sectionsState={ sectionsState }
        />

        <SizeTool
          size={ size }
          color={ color }
          onSize={ onSize }
          sectionsState={ sectionsState }
        />
        <BrushTool
          onBrush={ onBrush }
          sectionsState={ sectionsState }
        />

        { isMobile && (<MobileCamera imageContainer={ imageContainer } /> )}
        <HistoryTools
          onUndo={ onUndo }
          onRedo={ onRedo }
          onDelete={ onDelete }
          setSectionsVisibled={ setSectionsVisibled }
        />
      </article>
    </section>
  )
})

export default Tools
