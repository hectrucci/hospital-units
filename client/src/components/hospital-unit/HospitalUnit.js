import { Component } from 'react';

//styles
import './HospitalUnit.scss';

class HospitalUnit extends Component {
    constructor(props) {
        super(props);
        this.toggleActive = this.toggleActive.bind(this);
        this.state = {
            isActive: false,
        };
    }

    toggleActive() {
        this.setState({
            isActive: !this.state.isActive,
        });
    }

    getUnitStatus() {
        const unit = this.props.unit;

        if (unit.highAlarm && unit.census >= unit.highAlarm) {
            return 'danger';
        }

        if (unit.lowAlarm && unit.census <= unit.lowAlarm) {
            return 'info';
        }

        return 'primary';
    }

    getCapacity() {
        const unit = this.props.unit;
        return Math.round((unit.census * 100) / unit.capacity);
    }

    render() {
        return (
            <div className={`hospital-unit ${this.state.isActive ? 'flip' : ''}`}>
                <div className={`panel panel-${this.getUnitStatus()} frontface`}>
                    <div className="panel-heading">
                        {this.props.unit.name}
                        <button type="button"
                                className={`btn btn-${this.getUnitStatus()} btn-xs info-button`}
                                onClick={this.toggleActive}>
                            <span className="glyphicon glyphicon-info-sign"></span>
                        </button>
                    </div>
                    <div className="panel-body">
                        <div className="capacity-percentage">Capacity: {this.getCapacity()}%</div>
                    </div>
                </div>
                <div className={`panel panel-${this.getUnitStatus()} backface`}>
                    <div className="panel-heading">
                        {this.props.unit.name}
                        <button type="button"
                                className={`btn btn-${this.getUnitStatus()} btn-xs info-button`}
                                onClick={this.toggleActive}>
                            <span className="glyphicon glyphicon glyphicon-arrow-left"></span>
                        </button>
                    </div>
                    <div className="panel-body">
                        <div><strong>Capacity:</strong> {this.props.unit.capacity}</div>
                        <div><strong>Census:</strong> {this.props.unit.census}</div>
                        {this.props.unit.highAlarm ?
                            <div><strong>High Alarm:</strong> {this.props.unit.highAlarm}</div> : ""}
                        {this.props.unit.lowAlarm ?
                            <div><strong>Low Alarm:</strong> {this.props.unit.lowAlarm}</div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default HospitalUnit;
