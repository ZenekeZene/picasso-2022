import './DesktopCameraTool.scss'

const getMedia = async () => await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

const CameraTool = ({ videoRef, isEnabled, enableCamera, onLoad }) => {

  const handleStartCamera = async () => {
    const stream = await getMedia()
    videoRef.current.srcObject = stream
    enableCamera(true)
  }

  const handleTakeThePhoto = () => {
    enableCamera(false)
    onLoad({ type: 'canvas', url: videoRef.current })
  }

  return (
    <span className="icon-camera"
      onClick={ isEnabled ? handleTakeThePhoto : handleStartCamera }
      data-testid="camera-tool"
    >{ isEnabled && <span className="desktop-camera-label">Sacar foto</span> }</span>
  )
}

export default CameraTool
