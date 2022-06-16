import { useState, useEffect } from 'react'
import './BrushTool.scss'

const brushes = [
  'pencil',
  'pen',
  'quill',
  'paint-format',
  '🍬',
  '✨'
]

const BrushTool = ({ onBrush }) => {
  const [currentBrush, setCurrentBrush] = useState(brushes[0])

  useEffect(() => {
    onBrush(currentBrush)
  }, [currentBrush, onBrush])

  return (
    <ul className="brush-tool">
      { brushes.slice(0, 4).map((brush, index) =>
        <li
          key={ `brush-${index}` }
          className={ `icon-${brush}` }
          onClick={ () => { setCurrentBrush(brush) }}
        />
      )}
      { brushes.slice(4, 7).map((brush, index) =>
        <li
          key={ `brush-${index}` }
          onClick={ () => { setCurrentBrush(brush) }}
        >{ brush }</li>
      )}
    </ul>
  )
}

export default BrushTool
