import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SandboxClient from '../../../src/sandbox-client/SandboxClient';

import { mockStore } from '../../utils/mock-utils';
import SandboxClientConnector from '../../../src/sandbox-client/SandboxClientConnector';

const sandbox = sinon.sandbox.create();

describe('SandboxClientConnector', () => {
    let component;
    let dispatchStub;
    let storeMock;
    let props;

    beforeEach(() => {
        dispatchStub = sandbox.stub();
    });

    afterEach(() => {
        sandbox.restore();
    });

    function renderComponent(propOverrides) {
        storeMock = mockStore({
            baseRangeText: 'some base test',
            subtractiveRangeText: 'some subtractive test',
        }, dispatchStub);

        props = {
            defaultBaseRangeText: 'base text',
            defaultSubtractiveRangeText: 'subtractive test',
            ...propOverrides
        };

        component = shallow(
            <SandboxClientConnector
                store={storeMock}
                {...props}
            />);
    }

    describe('Given a store', () => {
        it('should have a component with the mapped store', () => {
            renderComponent();

            expect(component.type()).toEqual(SandboxClient);
            expect(component.props().baseRangeText).toEqual(expect.any(String));
            expect(component.props().subtractiveRangeText).toEqual(expect.any(String));
        });
    });
});
