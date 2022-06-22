import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import DesktopCameraTool from '../tool/DesktopCameraTool'
import './DesktopCameraCanvas.scss'

const WIDTH = 1280
const HEIGHT = 960

const DesktopCameraCanvas = ({ toolsRef }) => {
  const imageContainerRef = useRef(null)
  const videoRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [cameraEnabled, enableCamera] = useState(false)

  const removeDesktopImage = () => {
    imageContainerRef.current.getContext('2d').clearRect(0, 0, imageContainerRef.current.width, imageContainerRef.current.height)
    setImageLoaded(false)
  }

  return (<>
    <section className="photo-video" style={{ display: cameraEnabled ? 'block': 'none' }}>
      <span className="icon-cross" onClick={ () => { enableCamera(false) }} />
      <video
        ref={ videoRef }
        width={ WIDTH }
        height={ HEIGHT }
        autoPlay
      ></video>
    </section>

    <section className="photo-canvas">
      <canvas
        ref={ imageContainerRef }
        width={ WIDTH }
        height={ HEIGHT }
      ></canvas>
    </section>

    { /* Imported image */ }
    { imageLoaded && <span className="photo-canvas-remove icon-cross" onClick={ removeDesktopImage }></span> }

    { toolsRef.current && ReactDOM.createPortal(
        <DesktopCameraTool
          imageContainerRef={ imageContainerRef }
          videoRef={ videoRef }
          isEnabled={ cameraEnabled }
          enableCamera={ enableCamera }
          setImageLoaded={ setImageLoaded }
        />,
        toolsRef.current
    )}
  </>)
}

export default DesktopCameraCanvas
