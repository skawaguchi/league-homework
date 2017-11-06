import React from 'react';
import PropTypes from 'prop-types';

const Inputs = (props) => (
    <p className='input-container'>
        <span className='base'>
            <input
                onChange={props.onBaseChanged}
                placeholder='Enter time range(s)'
                type='text'
                value={props.baseRangeText}
            />
        </span>
        <span className='minus-text'>
            {'"minus"'}
        </span>
        <span className='subtractive'>
            <input
                onChange={props.onSubtractiveChanged}
                placeholder='Enter subtractive range(s)'
                type='text'
                value={props.subtractiveRangeText}
            />
        </span>
        <span className='equals-text'>
            {'='}
        </span>
        <span className='output'>
            <input
                readOnly='readOnly'
                type='text'
                value={props.outputText}
            />
        </span>
    </p>
);

Inputs.propTypes = {
    baseRangeText: PropTypes.string,
    onBaseChanged: PropTypes.func.isRequired,
    onSubtractiveChanged: PropTypes.func.isRequired,
    outputText: PropTypes.string,
    subtractiveRangeText: PropTypes.string
};

export default Inputs;
