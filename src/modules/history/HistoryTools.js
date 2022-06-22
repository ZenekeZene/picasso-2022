import ReactDOM from 'react-dom'

const HistoryTools = ({ toolsRef, onUndo, onRedo, onDelete }) => {
  return (<>
    { toolsRef.current && ReactDOM.createPortal(
      <>
        <span className="icon-reply"
          onClick={ () => { onUndo() }}
        />
        <span className="icon-forward"
          onClick={ () => { onRedo() }}
        />
        <span className="icon-trash"
          onClick={ () => { onDelete() }}
        />
      </>,
      toolsRef.current
    )}
  </>)
}

export default HistoryTools
