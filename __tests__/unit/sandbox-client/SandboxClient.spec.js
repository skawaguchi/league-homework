import React from 'react';
import Chance from 'chance';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SandboxClient from '../../../src/sandbox-client/SandboxClient';

import Inputs from '../../../src/sandbox-client/Inputs';

const sandbox = sinon.sandbox.create();
const chance = new Chance();

describe('<SandboxClient/>', () => {
    let component;
    let event;
    let inputs;
    let inputMock;
    let props;

    const renderComponent = (propOverrides) => {
        props = Object.freeze({
            baseRangeText: 'base range',
            hasErrors: chance.bool(),
            onBaseChanged: sandbox.stub(),
            onSubtractiveChanged: sandbox.stub(),
            subtractiveRangeText: 'subtractive range',
            outputText: 'output text',
            ...propOverrides
        });

        component = shallow(<SandboxClient {...props}/>);
    };

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render the component with an identifying class name', () => {
        expect(component).toHaveLength(1);
        expect(component.hasClass('sandbox-client')).toBe(true);
    });

    it('should render the range calculation elements', () => {
        inputs = component.find(Inputs);

        expect(inputs).toHaveLength(1);
        expect(inputs.props().baseRangeText).toEqual(props.baseRangeText);
        expect(inputs.props().hasErrors).toEqual(props.hasErrors);
        expect(inputs.props().subtractiveRangeText).toEqual(props.subtractiveRangeText);
        expect(inputs.props().outputText).toEqual(props.outputText);
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

            sinon.assert.calledWithExactly(props.onBaseChanged, event);
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
    });
});
