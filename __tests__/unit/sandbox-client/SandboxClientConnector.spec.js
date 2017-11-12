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
    let baseRangeTextMock;
    let outputTextMock;
    let subtractiveRangeTextMock;

    beforeEach(() => {
        baseRangeTextMock = 'some base test';
        outputTextMock = 'some output test';
        subtractiveRangeTextMock = 'some subtractive test';

        dispatchStub = sandbox.stub();

        textInputStub = sandbox.stub(textActions, 'updateText');
    });

    afterEach(() => {
        sandbox.restore();
    });

    function renderComponent() {
        stateMock = Object.freeze({
            calculatedText: {
                baseRangeText: baseRangeTextMock,
                outputText: outputTextMock,
                subtractiveRangeText: subtractiveRangeTextMock
            },
            hasErrors: chance.bool()
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
            expect(component.props().baseRangeText).toEqual(baseRangeTextMock);
            expect(component.props().hasErrors).toEqual(stateMock.hasErrors);
            expect(component.props().subtractiveRangeText).toEqual(subtractiveRangeTextMock);
            expect(component.props().outputText).toEqual(outputTextMock);
        });

        assertTextInputAction('base', 'onBaseChanged');
        assertTextInputAction('subtractive', 'onSubtractiveChanged');
    });
});
