import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'ui/components/spinner/Spinner'

const ImageTool = ({ imageContainer }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const imageSrc = useRef(null)

  const handleChange = (event) => {
    setIsLoading(true)
    const selectedFile = event.target.files[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      imageSrc.current = event.target.result
      setIsLoading(false)
      setImageLoaded(true)
    }

    reader.readAsDataURL(selectedFile)
  }

  const removeMobileImage = () => {
    imageSrc.current = null
    setIsLoading(false)
    setImageLoaded(false)
  }

  return (
    <section className="image-tool">
      <label htmlFor="image-file">
        <span className="icon-image"></span>
        <input type="file" id="image-file" onChange={ handleChange } style={{ display: 'none' }} />
      </label>

      { imageLoaded && <span className="mobile-camera__remove icon-cross" onClick={ removeMobileImage }></span> }
      { imageContainer.current && (
        ReactDOM.createPortal(
          <img
            alt="Espacio disponible para albergar retratos del usuario"
            src={ imageSrc.current }
            className="mobile-camera__image"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />, imageContainer.current)
        )}

      { isLoading && <Spinner className="mobile-camera__spinner" />}
    </section>
  )
}

export default ImageTool
