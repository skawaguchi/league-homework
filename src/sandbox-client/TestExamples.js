import React from 'react';
import PropTypes from 'prop-types';
import { testRanges } from '../state/constants';

const getItem = (index, item, onExampleSelected) => (
    <li key={index}>
        <button
            onClick={
                onExampleSelected.bind(
                    null,
                    item.baseRangeText,
                    item.subtractiveRangeText
                )
            }
        >
            {'Apply'}
        </button>
        <code>
            {`(${item.baseRangeText}) "minus" (${item.subtractiveRangeText}) =  (${item.outputText})`}
        </code>
    </li>
);

function TestExamples(props) {
    return (
        <section className='test-examples'>
            <p>{'These were the ranges provided with the challenge to test against. Click Apply to test them out ' +
            'above.'}</p>
            <ul className='examples'>
                {
                    testRanges.map((item, index) => getItem(index, item, props.onExampleSelected))
                }
            </ul>
        </section>
    );
}

TestExamples.propTypes = {
    onExampleSelected: PropTypes.func.isRequired
};

export default TestExamples;
