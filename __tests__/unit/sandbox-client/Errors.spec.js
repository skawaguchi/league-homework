import React from 'react';
import { shallow } from 'enzyme';

import Errors from '../../../src/sandbox-client/Errors';

describe('<Errors/>', () => {
    let component;
    let props;

    const renderComponent = (propOverrides) => {
        props = Object.freeze({
            ...propOverrides
        });

        component = shallow(<Errors {...props}/>);
    };

    describe('Given no errors', () => {
        it('should render the errors by default', () => {
            renderComponent({
                errors: null
            });

            const errors = component.find('.errors');

            expect(errors).toHaveLength(0);
        });
    });

    describe('Given errors', () => {
        it('should render the errors as children of the container', () => {
            renderComponent({
                errors: 'some error message'
            });

            const errors = component.find('.errors');

            expect(errors).toHaveLength(1);
            expect(errors.text()).toEqual(props.errors);
        });
    });
});