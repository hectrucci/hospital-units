import App from '../components/app/App';
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
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
