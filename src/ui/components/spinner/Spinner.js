import './Spinner.scss'

const Spinner = ({ className }) => (<div className={ `lds-ripple ${className}`}><div></div><div></div></div>)

export default Spinner
