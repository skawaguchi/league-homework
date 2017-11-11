import sinon from 'sinon';
import * as reduxMethods from 'redux';

import { makeStore } from '../../../src/factories/store-factory';
import * as reducers from '../../../src/reducers/index';

const sandbox = sinon.sandbox.create();

describe('Store Factory', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('createStore', () => {
        const storeMock = {};
        const enhancerMock = {};
        const reducersMock = {};
        /* eslint-disable no-underscore-dangle */
        global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = {};

        let applyMiddlewareStub;
        let createStoreStub;
        let combineReducersStub;

        beforeEach(() => {
            applyMiddlewareStub = sandbox.stub(reduxMethods, 'applyMiddleware');
            applyMiddlewareStub.returns(enhancerMock);

            createStoreStub = sandbox.stub(reduxMethods, 'createStore');
            createStoreStub.returns(storeMock);

            combineReducersStub = sandbox.stub(reduxMethods, 'combineReducers');
            combineReducersStub.returns(reducersMock);
        });

        it('should combine the reducers', () => {
            makeStore();

            sinon.assert.calledWithExactly(combineReducersStub, reducers);
        });

        it('should create the store', () => {
            const store = makeStore();

            sinon.assert.calledWithExactly(createStoreStub, reducersMock, enhancerMock);

            expect(store).toBe(storeMock);
        });

        it('should apply the redux dev tools middleware', () => {
            makeStore();

            sinon.assert.calledWithExactly(
                applyMiddlewareStub,
                global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            );
        });
    });
});
