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
        const reducersMock = {};
        const middlewareMock = {};
        const extensionsMock = {};
        /* eslint-disable no-underscore-dangle */
        let applyMiddlewareStub;
        let createStoreStub;
        let combineReducersStub;

        beforeEach(() => {
            createStoreStub = sandbox.stub(reduxMethods, 'createStore');
            createStoreStub.returns(storeMock);

            combineReducersStub = sandbox.stub(reduxMethods, 'combineReducers');
            combineReducersStub.returns(reducersMock);

            applyMiddlewareStub = sandbox.stub(reduxMethods, 'applyMiddleware');
            applyMiddlewareStub.returns(middlewareMock);
        });

        it('should combine the reducers', () => {
            makeStore();

            sinon.assert.calledWithExactly(combineReducersStub, reducers);
        });

        it('should create the store with redux dev tools extensions', () => {
            const store = makeStore();

            sinon.assert.calledWithExactly(createStoreStub, reducersMock, extensionsMock);

            expect(store).toBe(storeMock);
        });
    });
});
