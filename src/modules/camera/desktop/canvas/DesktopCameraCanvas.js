import { useState, useRef } from 'react'
import DesktopCameraTool from '../tool/DesktopCameraTool'
import './DesktopCameraCanvas.scss'

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

    <article className="photo-video" style={{ display: cameraEnabled ? 'block': 'none' }}>
      <span className="icon-cross" onClick={ () => { enableCamera(false) }} />
      <video
        ref={ videoRef }
        autoPlay
      ></video>
    </article>
  </>)
}

export default DesktopCameraCanvas
