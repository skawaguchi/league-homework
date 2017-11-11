import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TestExamples from '../../../src/sandbox-client/TestExamples';

import { mockStore } from '../../utils/mock-utils';
import TestExamplesConnector from '../../../src/sandbox-client/TestExamplesConnector';
import * as testExampleActions from '../../../src/actions/test-examples';

const sandbox = sinon.sandbox.create();

jest.mock('../../../src/actions/test-examples');

describe('TestExamplesConnector', () => {
    let component;
    let dispatchStub;
    let storeMock;
    let props;

    beforeEach(() => {
        dispatchStub = sandbox.stub();

        testExampleActions.applyTestExample.mockImplementation(() => sandbox.stub());
    });

    afterEach(() => {
        sandbox.restore();
    });

    function renderComponent() {
        storeMock = mockStore({}, dispatchStub);

        component = shallow(
            <TestExamplesConnector
                store={storeMock}
                {...props}
            />
        );
    }

    describe('Given a connection to the store', () => {
        it('should connect the child component', () => {
            renderComponent();

            expect(component.type()).toEqual(TestExamples);
        });

        it('should bind an action to apply the test example', () => {
            renderComponent();

            const baseRangeText = 'base text';
            const subtractiveRangeText = 'subtractive text';

            component.props().onExampleSelected(baseRangeText, subtractiveRangeText);

            expect(testExampleActions.applyTestExample).toBeCalledWith(baseRangeText, subtractiveRangeText);
        });
    });
});
