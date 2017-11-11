import React from 'react';
import PropTypes from 'prop-types';

const ranges = [
    {
        baseText: '9:00-10:00',
        subtractiveText: '9:00-9:30',
        outputText: '9:30-10:00'
    },
    {
        baseText: '9:00-10:00',
        subtractiveText: '9:00-10:00',
        outputText: ''
    },
    {
        baseText: '9:00-9:30',
        subtractiveText: '9:30-15:00',
        outputText: '9:00-9:30'
    },
    {
        baseText: '9:00-9:30, 10:00-10:30',
        subtractiveText: '9:15-10:15',
        outputText: '9:00-9:15, 10:15-10:30'
    },
    {
        baseText: '9:00-11:00, 13:00-15:00',
        subtractiveText: '9:00-9:15, 10:00-10:15, 12:30-16:00',
        outputText: '9:15-10:00, 10:15-11:00'
    }
];

function TestExamples(props) {
    return (
        <section className='test-examples'>
            <p>{'These were the ranges provided with the challenge to test against.'}</p>
            <ul className='examples'>
                {
                    ranges.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={
                                    props.onExampleSelected.bind(
                                        null,
                                        item.baseText,
                                        item.subtractiveText
                                    )
                                }
                            >
                                {'Apply'}
                            </button>
                            <code>
                                {`${item.baseText} "minus" ${item.subtractiveText} = ${item.outputText}`}
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
