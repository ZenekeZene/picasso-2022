import './DesktopCameraTool.scss'

const CameraTool = ({ videoRef, isEnabled, enableCamera, onLoad }) => {

  const handleStartCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    videoRef.current.srcObject = stream
    enableCamera(true)
  }

  const handleTakeThePhoto = () => {
    onLoad({ type: 'canvas', url: videoRef.current })
    enableCamera(false)
  }

  return (<>
    { !isEnabled && (
      <span className="icon-camera"
        onClick={ handleStartCamera }
      />
    )}
    { isEnabled && (
      <span className="camera icon-camera"
        onClick={ handleTakeThePhoto }
      ><span className="camera__label">Sacar foto</span></span>
    )}
  </>)
}

export default CameraTool
