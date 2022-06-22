const HistoryTools = ({ onUndo, onRedo, onDelete }) => (
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
  </>
)

export default HistoryTools
