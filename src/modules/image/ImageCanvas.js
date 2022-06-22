import { useRef } from 'react'
import ReactDOM from 'react-dom'
import ImageTool from 'modules/image/tool/ImageTool'

const ImageCanvas = ({ toolsRef }) => {
  const imageContainer = useRef(null)

  return (<>
    <section ref={ imageContainer }></section>

    { toolsRef.current && ReactDOM.createPortal(
        <ImageTool imageContainer={ imageContainer } />,
        toolsRef.current
    )}
    </>
  )
}

export default ImageCanvas
