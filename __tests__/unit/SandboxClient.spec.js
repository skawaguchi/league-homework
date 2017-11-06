import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SandboxClient from '../../src/sandbox-client/SandboxClient';
import * as command from '../../src/commands/parse-time-range-input';

const sandbox = sinon.sandbox.create();

describe('<SandboxClient/>', () => {
    let component;
    let commandStub;
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
        const base = component.find('.base');
        const minus = component.find('.minus-text');
        const subtractive = component.find('.subtractive');
        const equals = component.find('.equals-text');

        expect(base).toHaveLength(1);
        expect(minus).toHaveLength(1);
        expect(subtractive).toHaveLength(1);
        expect(equals).toHaveLength(1);
    });

    it('should render the output element', () => {
        const output = component.find('.output');
        const outputTextInput = component.find('.output input');

        expect(output).toHaveLength(1);
        expect(outputTextInput).toHaveLength(1);

        expect(outputTextInput.props().readOnly).toBe('readOnly');
        expect(outputTextInput.props().value).toEqual(component.state.outputText);
    });

    it('should render the calculate button container', () => {
        const calculate = component.find('.calculate');

        expect(calculate).toHaveLength(1);
    });

    it('should not render the error container', () => {
        const errors = component.find('.errors');

        expect(errors).toHaveLength(0);
    });

    describe('when the base range input is changed', () => {
        it('should update the base range text', () => {
            const baseInput = component.find('.base input');
            const inputMock = 'some input';
            const event = {
                target: {
                    value: inputMock
                }
            };

            baseInput.simulate('change', event);

            expect(component.state().baseRangeText).toBe(inputMock);
        });
    });

    describe('when the subtractive range input is changed', () => {
        it('should update the subtractive range text', () => {
            const subtractiveInput = component.find('.subtractive input');
            const inputMock = 'some input';
            const event = {
                target: {
                    value: inputMock
                }
            };

            subtractiveInput.simulate('change', event);

            expect(component.state().subtractiveRangeText).toBe(inputMock);
        });
    });

    describe('when the calculate button is clicked', () => {
        let button;

        beforeEach(() => {
            button = component.find('.calculate button');
        });

        it('should run the calculation', () => {
            const expectedInput = `(${props.defaultBaseRangeText}) "minus" (${props.defaultSubtractiveRangeText})`;

            button.simulate('click');

            sinon.assert.calledWithExactly(commandStub, expectedInput);
        });

        describe('and the calculation is successful', () => {
            it('should display the output text', () => {
                const outputMock = 'some output';

                commandStub.returns(outputMock);

                button.simulate('click');

                expect(component.state().outputText).toBe(outputMock);
            });
        });

        describe('and the calculation has an error', () => {
            it('should display an error message in the output text', () => {
                const expectedOutput = 'ERROR';

                commandStub.throws();

                const click = () => button.simulate('click');

                expect(click).toThrow();
                expect(component.state().outputText).toBe(expectedOutput);
            });
        });
    });
});
