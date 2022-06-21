import { useState, useRef } from 'react'
import CameraTool from 'modules/paint/tools/camera/CameraTool'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import MobileCamera from 'modules/camera/mobile/MobileCamera'
import ImageTool from 'modules/paint/tools/image/ImageTool'
import HistoryTools from 'modules/paint/tools/history/HistoryTools'
import checkIsMobile from 'adapter/Mobile.Checker'
import useOnClickOutside from 'hooks/useOnClickOutside'

import './Tools.scss'

const Tools = ({
  isDrawing,
  color, onColor,
  onBrush,
  size, onSize,
  isCameraEnabled,
  onUndo, onRedo, onDelete,
  onStartCamera, onTakeThePhoto,
  imageContainer,
}) => {
  const ref = useRef(null)
  const sectionsState = useState(false)
  const [areSectionsVisibled, setSectionsVisibled] = sectionsState
  const isMobile = checkIsMobile()

  useOnClickOutside(ref, () => {
    if (!areSectionsVisibled) return
    setSectionsVisibled(false)
  })

  return (
    <section className="tools-wrapper"
      ref={ ref }
      style={{ opacity: isDrawing ? 0.2 : 1 }}
    >
      <article className="tools">

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
        <ImageTool imageContainer={ imageContainer } />
        { isMobile && (<MobileCamera imageContainer={ imageContainer } /> )}
        { !isMobile && (
          <CameraTool
            isEnabled={ isCameraEnabled }
            onStartCamera={ () => {
              setSectionsVisibled(false)
              onStartCamera()
            }}
            onTakeThePhoto={ onTakeThePhoto }
          />
        )}
        <HistoryTools
          onUndo={ onUndo }
          onRedo={ onRedo }
          onDelete={ onDelete }
          setSectionsVisibled={ setSectionsVisibled }
        />
      </article>
    </section>
  )
}

export default Tools
