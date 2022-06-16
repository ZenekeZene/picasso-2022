import { useState } from 'react'
import ColorsTool from 'modules/paint/tools/color/ColorsTool'
import SizeTool from 'modules/paint/tools/size/SizeTool'
import BrushTool from 'modules/paint/tools/brush/BrushTool'
import './Tools.scss'

const Tools = ({ color, onColor, onBrush, onSize, onUndo, onRedo, onDelete }) => {
  const [isToolsVisibled, setIsToolsVisibled] = useState(false)
  return (
    <section className="tools">
      <span className={ isToolsVisibled ? 'icon-cross' : 'icon-pencil2' }
        onClick={ () => setIsToolsVisibled(!isToolsVisibled) }
      ></span>
      { isToolsVisibled && (<>
        <ColorsTool onColor={ onColor } />
        <SizeTool
          color={ color }
          onSize={ onSize }
        />
        <BrushTool
          onBrush={ onBrush }
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
