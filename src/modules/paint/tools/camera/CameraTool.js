import './CameraTool.scss'

const CameraTool = ({ isEnabled, onStartCamera, onTakeThePhoto }) => {

  const handleStartCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    onStartCamera(stream)
  }

  const handleTakeThePhoto = () => {
   	onTakeThePhoto()
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
