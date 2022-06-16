import { useEffect, useState } from 'react'
import './ColorsTool.scss'

export const colors = [
  '#008f7a',
  '#845ec2',
  '#d65db1',
  '#ff6f91',
  '#ffc75f',
  'rgb(252, 222, 192)',
  'rgb(27, 37, 52)',
]

const ColorsTool = ({ onColor }) => {
  const [currentColor, setCurrentColor] = useState(colors[0])

  useEffect(() => {
    onColor(currentColor)
  }, [currentColor, onColor])

  return (
    <div className="color-tool">
      <ol className="color-tool__swatches">
        { colors.map((color, index) => (
          <li
            key={ `color-${index}` }
            className={ currentColor === color ? '--selected': '' }
            onClick={ () => { setCurrentColor(color) }}
            style={{ backgroundColor: color }}
          ></li>
        ))}
      </ol>
	</div>
)}


export default ColorsTool
