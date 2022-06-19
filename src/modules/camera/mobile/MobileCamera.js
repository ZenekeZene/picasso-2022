import { useRef } from 'react'
import './MobileCamera.scss'

const MobileCamera = () => {
  const imageSrc = useRef(null)

  const handleChange = () => {
    imageSrc.current = window.URL.createObjectURL(this.files[0])
  }

  return (
    <section className="mobile-camera">
      <label for="cameraFileInput"><span class="icon-camera"></span>

        <input
          id="cameraFileInput"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={ handleChange }
          style={{ display: 'none' }}
        />
      </label>

      { imageSrc && (
        <img
          alt="Espacio disponible para albergar retratos del usuario"
          src={ imageSrc }
          className="mobile-camera__image"
        />
      )}
    </section>
  )
}

export default MobileCamera
// The hidden file `input` for opening the native camera.
