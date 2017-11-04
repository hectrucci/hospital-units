import { units } from './reducers/units';

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
