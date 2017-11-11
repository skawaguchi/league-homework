import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TestExamples from '../../../src/sandbox-client/TestExamples';

const sandbox = sinon.sandbox.create();

describe('<TestExamples/>', () => {
    let component;
    let props;

    const renderComponent = (propOverrides) => {
        props = Object.freeze({
            onExampleSelected: sandbox.stub(),
            ...propOverrides
        });

        component = shallow(<TestExamples {...props}/>);
    };

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should have a section container with an identifying class name', () => {
            expect(component.type()).toBe('section');
            expect(component.hasClass('test-examples')).toBe(true);
        });

        it('should have a list container', () => {
            const list = component.find('ul.examples');

            expect(list.length).toBe(1);
        });

        it('should have list items of the test examples', () => {
            const list = component.find('ul.examples li');
            const expectedListItems = 5;

            expect(list.length).toBe(expectedListItems);

            list.forEach((item) => {
                expect(item.type()).toBe('li');
                expect(item.childAt(0).type()).toBe('button');
                expect(item.childAt(1).type()).toBe('code');
            });
        });

        it('should have apply the text ', () => {
            const list = component.find('ul.examples li');
            const expectedListItems = 5;

            expect(list.length).toBe(expectedListItems);

            list.forEach((item) => {
                sandbox.reset();

                const button = item.find('button');

                button.simulate('click');

                sinon.assert.calledOnce(props.onExampleSelected);

                const callArgs = props.onExampleSelected.getCall(0).args;

                expect(callArgs[0]).toEqual(expect.any(String));
                expect(callArgs[1]).toEqual(expect.any(String));
            });
        });
    });
});
