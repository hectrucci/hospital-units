import { Component } from 'react';
import { getHostpitalUnits } from '../services/HospitalIQService';
import HospitalUnit from './hospital-unit/HospitalUnit';

// styles
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
                <h1 className="app-title">Hospital Units</h1>
                <div className="row">
                    <section className="col-sm-12">
                        <div className="panel-group units-container">
                            {this.state.units.map(unit =>
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
