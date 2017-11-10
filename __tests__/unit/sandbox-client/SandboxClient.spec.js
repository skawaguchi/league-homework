import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SandboxClient from '../../../src/sandbox-client/SandboxClient';

import Inputs from '../../../src/sandbox-client/Inputs';

import * as command from '../../../src/commands/parse-time-range-input';

const sandbox = sinon.sandbox.create();

describe('<SandboxClient/>', () => {
    let component;
    let commandStub;
    let event;
    let inputs;
    let inputMock;
    let props;

    const renderComponent = (propOverrides) => {
        props = Object.freeze({
            defaultBaseRangeText: 'base range',
            defaultSubtractiveRangeText: 'subtractive range',
            ...propOverrides
        });

        component = shallow(<SandboxClient {...props}/>);
    };

    beforeEach(() => {
        commandStub = sandbox.stub(command, 'parseTimeRangeInput');

        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render the component with an identifying class name', () => {
        expect(component).toHaveLength(1);
        expect(component.hasClass('sandbox-client')).toBe(true);
    });

    describe('when the component mounts', () => {
        it('should calculate the output', () => {
            const expectedInput = `(${props.defaultBaseRangeText}) "minus" (${props.defaultSubtractiveRangeText})`;

            sinon.assert.calledWithExactly(commandStub, expectedInput);
        });
    });

    it('should render the range calculation elements', () => {
        inputs = component.find(Inputs);

        expect(inputs).toHaveLength(1);
        expect(inputs.props().baseRangeText).toEqual(component.state().baseRangeText);
        expect(inputs.props().hasErrors).toEqual(component.state().hasErrors);
        expect(inputs.props().subtractiveRangeText).toEqual(component.state().subtractiveRangeText);
        expect(inputs.props().outputText).toEqual(component.state().outputText);
    });

    describe('when the base range input is changed', () => {
        beforeEach(() => {
            inputs = component.find(Inputs);
            inputMock = 'some input';
            event = {
                target: {
                    value: inputMock
                }
            };
        });

        it('should update the base range text', () => {
            inputs.props().onBaseChanged(event);

            expect(component.state().baseRangeText).toBe(inputMock);
        });

        it('should run the calculation', () => {
            const expectedInput = `(${props.defaultBaseRangeText}) "minus" (${props.defaultSubtractiveRangeText})`;

            inputs.props().onBaseChanged(event);

            sinon.assert.calledWithExactly(commandStub, expectedInput);
        });

        describe('and the calculation is successful', () => {
            it('should display the output text', () => {
                const outputMock = 'some output';

                commandStub.returns(outputMock);

                inputs.props().onBaseChanged(event);

                expect(component.state().outputText).toBe(outputMock);
            });
        });

        describe('and the calculation has an error', () => {
            it('should display an error message in the output text', () => {
                commandStub.throws();

                inputs.props().onBaseChanged(event);

                expect(component.state().outputText).toEqual(expect.any(String));
            });
        });
    });

    describe('when the subtractive range input is changed', () => {
        beforeEach(() => {
            inputs = component.find(Inputs);
            inputMock = 'some input';
            event = {
                target: {
                    value: inputMock
                }
            };
        });

        it('should update the subtractive range text', () => {
            inputs.props().onSubtractiveChanged(event);

            expect(component.state().subtractiveRangeText).toBe(inputMock);
        });

        it('should run the calculation', () => {
            const expectedInput = `(${props.defaultBaseRangeText}) "minus" (${props.defaultSubtractiveRangeText})`;

            inputs.props().onSubtractiveChanged(event);

            sinon.assert.calledWithExactly(commandStub, expectedInput);
        });

        describe('and the calculation is successful', () => {
            it('should display the output text', () => {
                const outputMock = 'some output';

                commandStub.returns(outputMock);

                inputs.props().onSubtractiveChanged(event);

                expect(component.state().outputText).toBe(outputMock);
            });
        });

        describe('and the calculation has an error', () => {
            it('should display an error message in the output text', () => {
                commandStub.throws();

                inputs.props().onSubtractiveChanged(event);

                expect(component.state().outputText).toEqual(expect.any(String));
            });
        });
    });
});
