import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Chance from 'chance';

import Inputs from '../../../src/sandbox-client/Inputs';

const chance = new Chance();

const sandbox = sinon.sandbox.create();

describe('<Inputs/>', () => {
    let component;
    let props;

    const enterKeyCode = 13;

    const getNonEnterKeyCode = () => {
        const keyCode = chance.natural();

        if (keyCode === enterKeyCode) {
            return getNonEnterKeyCode();
        }
        return keyCode;
    };

    const renderComponent = (propOverrides) => {
        props = Object.freeze({
            baseRangeText: 'some base range text',
            onBaseChanged: sandbox.stub(),
            onEnterKeyPress: sandbox.stub(),
            onSubtractiveChanged: sandbox.stub(),
            outputText: 'some output text',
            subtractiveRangeText: 'some subtractive text',
            ...propOverrides
        });

        component = shallow(<Inputs {...props}/>);
    };

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        it('should render the component with an identifying class name', () => {
            expect(component.hasClass('input-container')).toBe(true);
        });

        it('should have containers for the base range, subtractive range, and output elements', () => {
            const baseRange = component.find('span.base');
            const subtractiveRange = component.find('span.subtractive');
            const output = component.find('span.output');

            const inputs = [
                baseRange,
                subtractiveRange,
                output
            ];

            inputs.forEach((input) => {
                expect(input).toHaveLength(1);
                expect(input.childAt(0).type()).toEqual('input');
            });
        });

        it('should have a base input element', () => {
            const base = component.find('.base input');

            expect(base.props().placeholder).toBeTruthy();
            expect(base.props().type).toEqual('text');
            expect(base.props().value).toEqual(props.baseRangeText);
        });

        it('should have a subtractive input element', () => {
            const subtractive = component.find('.subtractive input');

            expect(subtractive.props().placeholder).toBeTruthy();
            expect(subtractive.props().type).toEqual('text');
            expect(subtractive.props().value).toEqual(props.subtractiveRangeText);
        });

        it('should have a read-only ouput element', () => {
            const output = component.find('.output input');

            expect(output.props().readOnly).toEqual('readOnly');
            expect(output.props().type).toEqual('text');
            expect(output.props().value).toEqual(props.outputText);
        });

        describe('when the base range is changed', () => {
            it('should call the base changed callback', () => {
                const base = component.find('.base input');
                const inputMock = 'some input';
                const event = {
                    target: {
                        value: inputMock
                    }
                };

                base.simulate('change', event);

                sinon.assert.calledWithExactly(props.onBaseChanged, event);
            });
        });

        describe('when the base range gets a key press', () => {
            describe('and it is the enter key', () => {
                it('should call the on key pressed callback', () => {
                    const base = component.find('.base input');
                    const event = {
                        keyCode: enterKeyCode
                    };

                    base.simulate('keyDown', event);

                    sinon.assert.calledWithExactly(props.onEnterKeyPress);
                });
            });

            describe('and it is not the enter key', () => {
                it('should not call the on key pressed callback', () => {
                    const nonEnterKeyCode = getNonEnterKeyCode();
                    const base = component.find('.base input');
                    const event = {
                        keyCode: nonEnterKeyCode
                    };

                    base.simulate('keyDown', event);

                    sinon.assert.notCalled(props.onEnterKeyPress);
                });
            });
        });

        describe('when the subtractive range is changed', () => {
            it('should call the base changed callback', () => {
                const subtractive = component.find('.subtractive input');
                const inputMock = 'some input';
                const event = {
                    target: {
                        value: inputMock
                    }
                };

                subtractive.simulate('change', event);

                sinon.assert.calledWithExactly(props.onSubtractiveChanged, event);
            });
        });

        describe('when the subtractive range gets a key press', () => {
            describe('and it is the enter key', () => {
                it('should call the on key pressed callback', () => {
                    const subtractive = component.find('.subtractive input');
                    const event = {
                        keyCode: enterKeyCode
                    };

                    subtractive.simulate('keyDown', event);

                    sinon.assert.calledWithExactly(props.onEnterKeyPress);
                });
            });

            describe('and it is not the enter key', () => {
                it('should not call the on key pressed callback', () => {
                    const nonEnterKeyCode = getNonEnterKeyCode();
                    const subtractive = component.find('.subtractive input');
                    const event = {
                        keyCode: nonEnterKeyCode
                    };

                    subtractive.simulate('keyDown', event);

                    sinon.assert.notCalled(props.onEnterKeyPress);
                });
            });
        });
    });
});
