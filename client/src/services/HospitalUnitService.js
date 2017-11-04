import fetch from 'isomorphic-fetch';

const _getAlarmValue = (unit) => {
    if (unit.highAlarm && unit.census >= unit.highAlarm) {
        return 3;
    }

    if (unit.lowAlarm && unit.census <= unit.lowAlarm) {
        return 2;
    }

    return 1;
}

const _sortBy = (sortBy, units) => {
    if (sortBy === 'name') {
         return [...units].sort(_compareUnitNames);
    }

    return [...units].sort((a, b) => {
        const diff = a[sortBy] - b[sortBy];

        if (diff === 0) {
            return _compareUnitNames(a, b);
        }

        return diff;
    });
}

const _compareUnitNames = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }

    if (a.name > b.name) {
        return 1;
    }

    return 0;
}

const _alarmsFirstSorting = (units) => {
    return [...units].sort((a, b) => {
        const aValue = _getAlarmValue(a);
        const bValue = _getAlarmValue(b);

        if (aValue === 1 && bValue === 1) {
            return _compareUnitNames(a, b);
        }

        return bValue - aValue;
    });
};

const _normalFirstSorting = (units) => {
    return [...units].sort((a, b) => {
        const aValue = _getAlarmValue(a);
        const bValue = _getAlarmValue(b);

        if (aValue === 1 && bValue === 1) {
            return _compareUnitNames(a, b);
        }

        return aValue - bValue;
    });
};

const getHostpitalUnits = () => {
    return fetch(`/api/units`)
        .then((response) => response.json());
};

const sortHospitalUnits = (sortBy, units) => {
    switch(sortBy) {
        case 'ALARMS_FIRST':
            return _alarmsFirstSorting(units);
        case 'NORMAL_FIRST':
            return _normalFirstSorting(units);
        case 'NAME':
            return _sortBy('name', units);
        case 'CAPACITY':
            return _sortBy('capacity', units);
        case 'CENSUS':
            return _sortBy('census', units);
        case 'HIGH_ALARM':
            return _sortBy('highAlarm', units);
        case 'LOW_ALARM':
            return _sortBy('lowAlarm', units);
        default:
            return [...units];
    }

    return orderedUnits;
};

export { getHostpitalUnits, sortHospitalUnits };
