import DesktopCameraCanvas from 'modules/camera/desktop/canvas/DesktopCameraCanvas'
import MobileCameraTool from 'modules/camera/mobile/MobileCameraTool'
import checkIsMobile from 'adapter/Mobile.Checker'

const CameraTool = ({ onLoad }) => {
  const isMobile = checkIsMobile()

  return (<>
    { !isMobile && <DesktopCameraCanvas onLoad={ onLoad } /> }
    { isMobile && <MobileCameraTool onLoad={ onLoad } /> }
  </>)
}

export default CameraTool
