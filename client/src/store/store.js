import { units } from './reducers/units_reducer';

import {
    createStore,
    combineReducers,
} from 'redux';

const initialState = {
    units: [],
};

let store = createStore(
    combineReducers({
        units,
    }),
    initialState,
);

export default store;
