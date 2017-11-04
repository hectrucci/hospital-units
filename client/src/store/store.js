import {
    createStore,
    combineReducers,
} from 'redux';

const initialState = {};

let store = createStore(
    combineReducers({
        test: f => 1,
    }),
    initialState,
);

export default store;
