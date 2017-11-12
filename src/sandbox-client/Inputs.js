import React from 'react';
import PropTypes from 'prop-types';

const getInput = (onChange, placeholder, value) => (
    <input
        onChange={onChange}
        placeholder={placeholder}
        type='text'
        value={value}
    />
);
const Inputs = (props) => {
    const errorClass = props.hasErrors ? 'errors' : '';
    const basePlaceholder = 'Enter base time range(s)';
    const subtractivePlaceholder = 'Enter time range(s) to subtract from your base range(s)';

    return (
        <p className='input-container'>
            <span className='base'>
                {
                    getInput(props.onBaseChanged, basePlaceholder, props.baseRangeText)
                }
            </span>
            <span className='subtractive'>
                {
                    getInput(props.onSubtractiveChanged, subtractivePlaceholder, props.subtractiveRangeText)
                }
            </span>
            <span className={`output ${errorClass}`}>
                <input
                    readOnly='readOnly'
                    type='text'
                    value={props.outputText}
                />
            </span>
        </p>
    );
};

Inputs.propTypes = {
    baseRangeText: PropTypes.string,
    hasErrors: PropTypes.bool.isRequired,
    onBaseChanged: PropTypes.func.isRequired,
    onSubtractiveChanged: PropTypes.func.isRequired,
    outputText: PropTypes.string,
    subtractiveRangeText: PropTypes.string
};

export default Inputs;
