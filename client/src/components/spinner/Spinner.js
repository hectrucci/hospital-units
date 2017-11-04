// styles
import './Spinner.scss';

const Spinner = ({ isLoading = false }) =>
    isLoading ?
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div> : ''

export default Spinner;
