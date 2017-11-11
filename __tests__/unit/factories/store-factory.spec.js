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
        const extensionsMock = {};
        /* eslint-disable no-underscore-dangle */
        global.__REDUX_DEVTOOLS_EXTENSION__ = sandbox.stub();
        global.__REDUX_DEVTOOLS_EXTENSION__.returns(extensionsMock);

        let createStoreStub;
        let combineReducersStub;

        beforeEach(() => {
            createStoreStub = sandbox.stub(reduxMethods, 'createStore');
            createStoreStub.returns(storeMock);

            combineReducersStub = sandbox.stub(reduxMethods, 'combineReducers');
            combineReducersStub.returns(reducersMock);
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
