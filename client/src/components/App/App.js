import { Component } from 'react';
import { getHostpitalUnits } from '../../services/HospitalUnitService';
import HospitalUnit from '../hospital-unit/HospitalUnit';

// styles
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getHostpitalUnits()
            .then(units => {
                this.props.saveUnits(units);
                this.startFetching();
            })
            .catch(error => console.log(error));
    }

    startFetching() {
        setInterval(() => {
            getHostpitalUnits()
                .then(units => {
                    this.props.saveUnits(units);
                })
                .catch(error => console.log(error));
        }, 5000);
    }

    render() {
        return (
            <div className="container app">
                <h1 className="app-title">Hospital Units</h1>
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
