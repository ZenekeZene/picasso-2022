import { useState, useRef, forwardRef } from 'react'
import DesktopCameraTool from '../tool/DesktopCameraTool'
import './DesktopCameraCanvas.scss'

const DesktopVideo = forwardRef(({ cameraEnabled, onClose }, ref) => (
  <article className="photo-video" style={{ display: cameraEnabled ? 'block': 'none' }}>
    <span className="icon-cross" onClick={ onClose } />
    <video
      ref={ ref }
      autoPlay
    ></video>
  </article>
))

const DesktopCameraCanvas = ({ onLoad }) => {
  const imageContainerRef = useRef(null)
  const videoRef = useRef(null)
  const [cameraEnabled, enableCamera] = useState(false)

  return (<>
    <DesktopCameraTool
      imageContainerRef={ imageContainerRef }
      videoRef={ videoRef }
      isEnabled={ cameraEnabled }
      enableCamera={ enableCamera }
      onLoad={ onLoad }
    />
    <DesktopVideo
      ref={ videoRef }
      cameraEnabled={ cameraEnabled }
      onClose={ () => { enableCamera(false) } }
    />
  </>)
}

export default DesktopCameraCanvas
