import { Component } from 'react';
import { getHostpitalUnits, sortHospitalUnits } from '../../services/HospitalUnitService';
import HospitalUnit from '../hospital-unit/HospitalUnit';
import Spinner from '../spinner/Spinner';

// styles
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        getHostpitalUnits()
            .then(units => {
                this.sortAndSaveUnits(units);
                this.startFetching();
                this.setState({
                    isLoading: false,
                });
            })
            .catch(error => console.log(error));
    }

    componentWillUnmount() {
        const fetchUnits = this.fetchUnits;

        if (fetchUnits) {
            clearInterval(fetchUnits);
        }
    }

    sortAndSaveUnits(units) {
        const { _sortingSelect } = this.refs
        const sortedUnits = sortHospitalUnits(_sortingSelect.value, units);
        this.props.saveUnits(sortedUnits);
    }

    startFetching() {
        this.fetchUnits = setInterval(() => {
            getHostpitalUnits()
                .then(units => {
                    this.sortAndSaveUnits(units);
                })
                .catch(error => console.log(error));
        }, 5000);
    }

    onSortingChange() {
        const { _sortingSelect } = this.refs;
        this.props.sortUnits(_sortingSelect.value, this.props.units);
    }

    render() {
        return (
            <div className="container app">
                <Spinner isLoading={this.state.isLoading} />
                <h1 className="app-title">Hospital Units</h1>
                <div className="row">
                    <section className="col-sm-6 unit-sorting-container">
                        <div className={`form-inline ${this.state.isLoading ? 'hide' : ''}`}>
                            <div className="form-group">
                                <label className="" htmlFor="unitSort">Sort by:</label>
                                <select ref="_sortingSelect"
                                        id="unitSort"
                                        className="form-control unit-sorting-select"
                                        onChange={this.onSortingChange.bind(this)}>
                                    <option value="ALARMS_FIRST">Alarms First</option>
                                    <option value="NORMAL_FIRST">Normal First</option>
                                    <option value="NAME">Name</option>
                                    <option value="CAPACITY">Capacity</option>
                                    <option value="CENSUS">Census (#)</option>
                                    <option value="CENSUS_PERCENTAGE">Census (%)</option>
                                    <option value="HIGH_ALARM">High Alarm</option>
                                    <option value="LOW_ALARM">Low Alarm</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="row">
                    <section className="col-sm-12">
                        <div className="panel-group units-container">
                            {this.props.units.map(unit =>
                                <HospitalUnit key={unit.id} unit={unit}/>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default App;
