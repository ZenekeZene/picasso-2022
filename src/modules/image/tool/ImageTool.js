const ImageTool = ({ onLoad }) => {

  const handleChange = (event) => {
    const selectedFile = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      onLoad(event.target.result)
    }

    reader.readAsDataURL(selectedFile)
  }

  return (
    <section>
      <label htmlFor="image-file">
        <span className="icon-image"></span>
        <input
          type="file"
          id="image-file"
          onChange={ handleChange }
          style={{ display: 'none' }}
        />
      </label>
    </section>
  )
}

export default ImageTool
