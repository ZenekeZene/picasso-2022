import { useState } from "react"
import Spinner from 'ui/components/spinner/Spinner'
import './ImageViewer.scss'

const ImageViewer = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onLoad = () => {
    setIsLoading(false)
    setImageLoaded(true)
  }

  const removeImage = () => {
    setIsLoading(false)
    setImageLoaded(false)
  }

  return (
    <section className="image-viewer">
      { imageLoaded && <span className="image-viewer__remove icon-cross" onClick={ removeImage }></span> }
      <img
        alt="Espacio disponible para albergar fotos del usuario"
        src={ src }
        style={{ opacity: imageLoaded ? 1 : 0 }}
        className="image-viewer__image"
        onLoad={ onLoad }
      />
      { isLoading && <Spinner className="image-viewer__spinner" />}
    </section>
  )
}

export default ImageViewer
