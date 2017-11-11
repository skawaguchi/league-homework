import React from 'react';
import PropTypes from 'prop-types';
import { testRanges } from '../state/constants';

function TestExamples(props) {
    return (
        <section className='test-examples'>
            <p>{'These were the ranges provided with the challenge to test against.'}</p>
            <ul className='examples'>
                {
                    testRanges.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={
                                    props.onExampleSelected.bind(
                                        null,
                                        item.baseRangeText,
                                        item.subtractiveRangeText
                                    )
                                }
                            >
                                {'Apply'}
                            </button>
                            <code>
                                {`${item.baseRangeText} "minus" ${item.subtractiveRangeText} = ${item.outputText}`}
                            </code>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

TestExamples.propTypes = {
    onExampleSelected: PropTypes.func.isRequired
};

export default TestExamples;
