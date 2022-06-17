import { useRef } from 'react'

const MobileCamera = () => {
  const imageSrc = useRef(null)

  const handleChange = () => {
    imageSrc.current = window.URL.createObjectURL(this.files[0])
  }

  return (<>
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
      alt="Selfi photo"
      src={ imageSrc }
    />
  </>)
}

export default MobileCamera
