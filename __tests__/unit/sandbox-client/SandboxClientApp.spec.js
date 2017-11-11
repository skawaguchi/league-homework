import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SandboxClientApp from '../../../src/sandbox-client/SandboxClientApp';

import SandboxClientConnector from '../../../src/sandbox-client/SandboxClientConnector';
import TestExamplesConnector from '../../../src/sandbox-client/TestExamplesConnector';

import * as storeFactory from '../../../src/factories/store-factory';
import { mockStore } from '../../utils/mock-utils';

const sandbox = sinon.sandbox.create();

describe('<SandboxClientApp/>', () => {
    let component;
    let makeStoreStub;
    let storeMock;

    const renderComponent = () => {
        component = shallow(<SandboxClientApp/>);
    };

    beforeEach(() => {
        storeMock = mockStore();

        makeStoreStub = sandbox.stub(storeFactory, 'makeStore');
        makeStoreStub.returns(storeMock);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should provide the store', () => {
            sinon.assert.calledOnce(makeStoreStub);

            expect(component.is(StoreProvider)).toEqual(true);
        });

        it('should have a main app container', () => {
            const mainContainer = component.find('main');

            expect(mainContainer.type()).toEqual('main');
            expect(mainContainer.hasClass('sandbox-client-app')).toEqual(true);
        });

        it('should have a page title', () => {
            const pageTitle = component.find('h1');

            expect(pageTitle.length).toBe(1);
        });

        it('should have a section for instructions', () => {
            const instructionsContainer = component.find('section.instructions');

            expect(instructionsContainer.length).toBe(1);
        });

        it('should have a sandbox client', () => {
            const sandboxClient = component.find(SandboxClientConnector);

            expect(sandboxClient.length).toBe(1);
            expect(sandboxClient.props().defaultBaseRangeText).toEqual(expect.any(String));
            expect(sandboxClient.props().defaultSubtractiveRangeText).toEqual(expect.any(String));
        });

        it('should have a test examples component', () => {
            const testExamples = component.find(TestExamplesConnector);

            expect(testExamples.length).toBe(1);
        });
    });
});
