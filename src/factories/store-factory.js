import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import * as reducers from '../reducers/index';

export function makeStore() {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const combinedReducers = combineReducers(reducers);

    return createStore(combinedReducers, applyMiddleware(devtools));
}
