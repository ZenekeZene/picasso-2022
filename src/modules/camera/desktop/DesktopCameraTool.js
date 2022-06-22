import './DesktopCameraTool.scss'

const CameraTool = ({ imageContainerRef, videoRef, isEnabled, enableCamera, setImageLoaded }) => {

  const handleStartCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    videoRef.current.srcObject = stream
    enableCamera(true)
  }

  const handleTakeThePhoto = () => {
    imageContainerRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, imageContainerRef.current.width, imageContainerRef.current.height)
   	imageContainerRef.current.toDataURL('image/jpeg')
    setImageLoaded(true)
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
