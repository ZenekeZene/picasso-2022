import { useState, useRef } from 'react'
import CameraTool from 'modules/paint/tools/camera/CameraTool'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import MobileCamera from 'modules/camera/mobile/MobileCamera'
import ImageTool from 'modules/paint/tools/image/ImageTool'
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
  const [areSectionsVisibled, setSectionsVisibled] = useState(false)
  const isMobile = checkIsMobile()

  useOnClickOutside(ref, () => {
    if (!areSectionsVisibled) return
    setSectionsVisibled(false)
  })

  return (
    <section className="tools-wrapper" ref={ ref } style={{ opacity: isDrawing ? 0.2 : 1 }}>
      <article className="tools">

        <ColorsTool
          onColor={ onColor }
          setSectionsVisibled={ setSectionsVisibled }
          areSectionsVisibled={ areSectionsVisibled }
        />

        <SizeTool
          size={ size }
          color={ color }
          onSize={ onSize }
          setSectionsVisibled={ setSectionsVisibled }
          areSectionsVisibled={ areSectionsVisibled }
        />
        <BrushTool
          onBrush={ onBrush }
          setSectionsVisibled={ setSectionsVisibled }
          areSectionsVisibled={ areSectionsVisibled }
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
        <span className="icon-reply"
          onClick={ () => {
            setSectionsVisibled(false)
            onUndo()
          }}
        />
        <span className="icon-forward"
          onClick={ () => {
            setSectionsVisibled(false)
            onRedo()
          }}
        />
        <span className="icon-trash"
          onClick={ () => {
            setSectionsVisibled(false)
            onDelete()
          }}
        />
      </article>

    </section>
  )
}

export default Tools
