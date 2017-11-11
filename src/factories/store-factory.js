import {
    combineReducers,
    createStore
} from 'redux';
import * as reducers from '../reducers/index';

export function makeStore() {
    const combinedReducers = combineReducers(reducers);

    return createStore(
        combinedReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
