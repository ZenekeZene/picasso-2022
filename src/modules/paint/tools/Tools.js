import { useState } from 'react'
import CameraTool from 'modules/paint/tools/camera/CameraTool'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import MobileCamera from 'modules/camera/mobile/MobileCamera'

import './Tools.scss'

const Tools = ({ color, onColor, onBrush, size, isCameraEnabled, onSize, onUndo, onRedo, onDelete, onStartCamera, onTakeThePhoto }) => {
  const [isToolsVisibled, setIsToolsVisibled] = useState(false)
  return (
    <section className="tools">
      <span className={ isToolsVisibled ? 'icon-cross' : 'icon-pencil2' }
        onClick={ () => setIsToolsVisibled(!isToolsVisibled) }
      ></span>
      { isToolsVisibled && (<>
        <ColorsTool onColor={ onColor } />
        <SizeTool
          size={ size }
          color={ color }
          onSize={ onSize }
        />
        <BrushTool
          onBrush={ onBrush }
        />
        <MobileCamera />
        <CameraTool
          isEnabled={ isCameraEnabled }
          onStartCamera={ onStartCamera }
          onTakeThePhoto={ onTakeThePhoto }
        />
        <span className="icon-reply" onClick={ onUndo } />
        <span className="icon-forward" onClick={ onRedo } />
        <span className="icon-trash" onClick={ onDelete } />
      </>
      )}
    </section>
  )
}

export default Tools
