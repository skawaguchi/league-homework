import React from 'react';
import PropTypes from 'prop-types';

const Inputs = (props) => {
    const errorClass = props.hasErrors ? 'errors' : '';

    return (
        <p className='input-container'>
            <span className='base'>
                <input
                    onChange={props.onBaseChanged}
                    placeholder='Enter base time range(s)'
                    type='text'
                    value={props.baseRangeText}
                />
            </span>
            <span className='subtractive'>
                <input
                    onChange={props.onSubtractiveChanged}
                    placeholder='Enter time range(s) to subtract from your base range(s)'
                    type='text'
                    value={props.subtractiveRangeText}
                />
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
