import { Component } from 'react';
import { getHostpitalUnits } from '../services/HospitalIQService';
import HospitalUnit from './hospital-unit/HospitalUnit';

//styles
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
        };
    }

    componentDidMount() {
        getHostpitalUnits()
            .then(units => {
                this.setState({
                    units,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container app">
                <h1 className="app-title">Hospital IQ</h1>
                <div className="row">
                    <section className="col-sm-9">
                        <h3>Units</h3>
                        <div className="panel-group units-container">
                            {this.state.units.map(unit =>
                                <HospitalUnit key={unit.id} unit={unit}/>
                            )}
                        </div>
                    </section>
                    <aside className="col-sm-3">
                        <h3>Alarms</h3>
                        <section className="row unit-high-alarms">
                            <h4>High</h4>
                            <div className="col-sm-12"></div>
                        </section>
                        <section className="row unit-low-alarms">
                            <h4>Low</h4>
                            <div className="col-sm-12"></div>
                        </section>
                    </aside>
                </div>
            </div>
        )
    }
}

export default App;
