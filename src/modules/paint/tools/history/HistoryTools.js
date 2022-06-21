const HistoryTools = ({ onUndo, onRedo, onDelete, setSectionsVisibled }) => (<>
  <span className="icon-reply"
    onClick={ () => {
      setSectionsVisibled(false)
      onUndo()
    }}
  />
  <span className="icon-forward"
    onClick={ () => {
      setSectionsVisibled(false)
      onRedo()
    }}
  />
  <span className="icon-trash"
    onClick={ () => {
      setSectionsVisibled(false)
      onDelete()
    }}
  />
</>)

export default HistoryTools
