import React from 'react';
import Chance from 'chance';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import * as textActions from '../../../src/actions/text-input';

import SandboxClient from '../../../src/sandbox-client/SandboxClient';

import { mockStore } from '../../utils/mock-utils';
import SandboxClientConnector from '../../../src/sandbox-client/SandboxClientConnector';

const sandbox = sinon.sandbox.create();
const chance = new Chance();

describe('SandboxClientConnector', () => {
    let component;
    let dispatchStub;
    let stateMock;
    let storeMock;
    let textInputStub;

    beforeEach(() => {
        dispatchStub = sandbox.stub();

        textInputStub = sandbox.stub(textActions, 'updateText');
    });

    afterEach(() => {
        sandbox.restore();
    });

    function renderComponent() {
        stateMock = Object.freeze({
            baseRangeText: 'some base test',
            hasErrors: chance.bool(),
            subtractiveRangeText: 'some subtractive test',
            outputText: 'some output test'
        });

        storeMock = mockStore(stateMock, dispatchStub);

        component = shallow(
            <SandboxClientConnector
                store={storeMock}
            />);
    }

    describe('Given a store', () => {
        const assertTextInputAction = (targetAttr, methodName) => {
            describe(`when the ${targetAttr} range text input is changed`, () => {
                it('should call the action with the modified text', () => {
                    const target = `${targetAttr}RangeText`;
                    const textMock = 'some text';
                    const event = {
                        target: {
                            value: textMock
                        }
                    };

                    component.props()[methodName](event);

                    sinon.assert.calledOnce(dispatchStub);
                    sinon.assert.calledWithExactly(textInputStub, target, textMock);
                });
            });
        };

        beforeEach(() => {
            renderComponent();
        });

        it('should be a sandbox client component', () => {
            expect(component.type()).toEqual(SandboxClient);
        });

        it('should have a component with the mapped store attributes', () => {
            expect(component.props().baseRangeText).toEqual(stateMock.baseRangeText);
            expect(component.props().hasErrors).toEqual(stateMock.hasErrors);
            expect(component.props().subtractiveRangeText).toEqual(stateMock.subtractiveRangeText);
            expect(component.props().outputText).toEqual(stateMock.outputText);
        });

        assertTextInputAction('base', 'onBaseChanged');
        assertTextInputAction('subtractive', 'onSubtractiveChanged');
    });
});
