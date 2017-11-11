import thunk from 'redux-thunk';
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from 'redux';
import * as reducers from '../reducers';

/* eslint-disable no-underscore-dangle */
export function makeStore() {
    const combinedReducers = combineReducers(reducers);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        combinedReducers,
        composeEnhancers(
            applyMiddleware(
                thunk
            )
        )
    );
}
