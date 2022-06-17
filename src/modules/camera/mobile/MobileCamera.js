import { useRef } from 'react'
import './MobileCamera.scss'

const MobileCamera = () => {
  const imageSrc = useRef(null)

  const handleChange = () => {
    imageSrc.current = window.URL.createObjectURL(this.files[0])
  }

  return (
    <section className="mobile-camera">
      { /* The `label` is attached to the hidden file input */ }
      <label for="cameraFileInput">

        { /* The hidden file `input` for opening the native camera */ }
        <input
          id="cameraFileInput"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={ handleChange }
          style={{ display: 'none' }}
        />
      </label>

      { /* displays the picture uploaded from the native camera */ }
      <img
        alt="Espacio disponible para albergar retratos del usuario"
        src={ imageSrc }
      />
    </section>
  )
}

export default MobileCamera
