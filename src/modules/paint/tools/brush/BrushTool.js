import { useState, useEffect } from 'react'
import './BrushTool.scss'

const brushes = [
  'pencil',
  'quill',
  'paint-format',
  '🍬',
  '🥶',
  '✨'
]

const BrushTool = ({ onBrush }) => {
  const [currentBrush, setCurrentBrush] = useState(brushes[0])

  useEffect(() => {
    onBrush(currentBrush)
  }, [currentBrush])

  return (
    <ul className="brush-tool">
      { brushes.slice(0, 3).map((brush, index) =>
        <li
          key={ `brush-${index}` }
          className={ `icon-${brush}` }
          onClick={ () => { setCurrentBrush(brush) }}
        />
      )}
      { brushes.slice(3, 6).map((brush, index) =>
        <li
          key={ `brush-${index}` }
          onClick={ () => { setCurrentBrush(brush) }}
        >{ brush }</li>
      )}
    </ul>
  )
}

export default BrushTool
