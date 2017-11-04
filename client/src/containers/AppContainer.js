import App from '../components/app/App';
import { sortHospitalUnits } from '../services/HospitalUnitService';
import { saveUnits } from '../actions/unit_actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        units: state.units,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUnits: units => dispatch(saveUnits(units)),
        sortUnits: (sortBy, units) => {
            const sortedUnits = sortHospitalUnits(sortBy, units);
            dispatch(saveUnits(sortedUnits));
        },
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
