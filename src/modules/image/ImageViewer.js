import { useState, useRef, useEffect } from "react"
import Spinner from 'ui/components/spinner/Spinner'
import './ImageViewer.scss'

const WIDTH = 1280
const HEIGHT = 960

const ImageViewer = ({ src }) => {
  const desktopPhotoCanvas = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onLoad = () => {
    setIsLoading(false)
    setImageLoaded(true)
  }

  const removeImage = () => {
    if (src?.type === 'canvas') { removeDesktopImage() }
    setIsLoading(false)
    setImageLoaded(false)
  }

  const removeDesktopImage = () => {
    const { width, height } = desktopPhotoCanvas.current
    desktopPhotoCanvas.current.getContext('2d').clearRect(0, 0, width, height)
    setImageLoaded(false)
  }

  const createPhotoFromVideo = (videoRef) => {
    const { width, height } = desktopPhotoCanvas.current
    const context = desktopPhotoCanvas.current.getContext('2d')
    context.drawImage(videoRef, 0, 0, width, height)
    setImageLoaded(true)
  }

  useEffect(() => {
    if (src?.type !== 'canvas') return
    createPhotoFromVideo(src.url)
  }, [src])

  return (
    <section className="image-viewer">
      { imageLoaded && <span className="image-viewer__remove icon-cross" onClick={ removeImage }></span> }

      { src?.type === 'image' && (
        <img
          alt="Espacio disponible para albergar fotos del usuario"
          src={ src.url }
          style={{ opacity: imageLoaded ? 1 : 0 }}
          className="image-viewer__image"
          onLoad={ onLoad }
        />
      )}

      { src?.type === 'canvas' && (
        <section className="image-viewer__canvas">
          <canvas
            ref={ desktopPhotoCanvas }
            width={ WIDTH }
            height={ HEIGHT }
          ></canvas>
        </section>
      )}

      { isLoading && <Spinner className="image-viewer__spinner" />}
    </section>
  )
}

export default ImageViewer
