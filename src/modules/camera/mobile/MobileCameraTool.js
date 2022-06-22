const MobileCameraTool = ({ onLoad }) => {

  const handleChange = (event) => {
    const file = event.target.files[0]
    const url = window.URL.createObjectURL(file)
    onLoad(url)
  }

  return (
    <section>
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
    </section>
  )
}

export default MobileCameraTool
// The hidden file `input` for opening the native camera.
