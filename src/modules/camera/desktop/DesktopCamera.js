import './DesktopCamera.scss'

const WIDTH = 1280
const HEIGHT = 960

const DesktopCamera = ({ video, photoCanvas, cameraEnabled, enableCamera }) => {
  return (<>
    <section className="photo-video" style={{ display: cameraEnabled ? 'block': 'none' }}>
      <span className="icon-cross" onClick={ () => { enableCamera(false) }} />
      <video
        ref={ video }
        width={ WIDTH }
        height={ HEIGHT }
        autoPlay
      ></video>
    </section>

    <section className="photo-canvas">
      <canvas
        ref={ photoCanvas }
        width={ WIDTH }
        height={ HEIGHT }
      ></canvas>
    </section>
  </>)
}

export default DesktopCamera
