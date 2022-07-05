const HistoryTools = ({ onUndo, onRedo, onDelete }) => (
  <>
    <span className="icon-reply"
      data-testid="reply-tool"
      onClick={ () => { onUndo() }}
    />
    <span className="icon-forward"
      data-testid="forward-tool"
      onClick={ () => { onRedo() }}
    />
    <span className="icon-trash"
      data-testid="delete-tool"
      onClick={ () => { onDelete() }}
    />
  </>
)

export default HistoryTools
