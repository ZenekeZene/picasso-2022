import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'ui/components/spinner/Spinner'
import './MobileCamera.scss'

const MobileCamera = ({ imageContainer, isClear }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const imageSrc = useRef(null)

  const handleChange = (event) => {
    setIsLoading(true)
    const file = event.target.files[0]
    const url = window.URL.createObjectURL(file)
    imageSrc.current = url
  }

  const handleLoad = () => {
    setIsLoading(false)
    setImageLoaded(true)
  }

  const removeMobileImage = () => {
    imageSrc.current = null
    setIsLoading(false)
    setImageLoaded(false)
  }

  return (
    <section className="mobile-camera">
      <label htmlFor="cameraFileInput">
        <span className="icon-camera"></span>

        <input
          id="cameraFileInput"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={ handleChange }
          style={{ display: 'none' }}
        />
      </label>

      { imageLoaded && <span className="mobile-camera__remove icon-cross" onClick={ removeMobileImage }></span> }
      { imageContainer.current && (
        ReactDOM.createPortal(
          <img
            alt="Espacio disponible para albergar retratos del usuario"
            src={ imageSrc.current }
            className="mobile-camera__image"
            onLoad={ handleLoad }
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />, imageContainer.current)
        )}

      { isLoading && <Spinner className="mobile-camera__spinner" />}

    </section>
  )
}

export default MobileCamera
// The hidden file `input` for opening the native camera.
