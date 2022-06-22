const ColorsSlide = ({ colors, currentColor, setCurrentColor }) => (
  <ol className="color-tool__swatches">
    { colors.map((color, index) => (
      <li
        key={ `color-${index}` }
        className={ currentColor === color ? '--selected': '' }
        onClick={ () => { setCurrentColor(color) }}
      ><span className="circle" style={{ backgroundColor: color }}></span></li>
    ))}
  </ol>
)

export default ColorsSlide
