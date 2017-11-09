import React from 'react';
import PropTypes from 'prop-types';

const keyPressHandler = (onEnterKeyPress, event) => {
    const enterKeyCode = 13;

    if (event.keyCode === enterKeyCode) {
        onEnterKeyPress();
    }
};

const Inputs = (props) => (
    <p className='input-container'>
        <span className='base'>
            <input
                onChange={props.onBaseChanged}
                onKeyDown={keyPressHandler.bind(null, props.onEnterKeyPress)}
                placeholder='Enter time range(s)'
                type='text'
                value={props.baseRangeText}
            />
        </span>
        <span className='subtractive'>
            <input
                onChange={props.onSubtractiveChanged}
                onKeyDown={keyPressHandler.bind(null, props.onEnterKeyPress)}
                placeholder='Enter subtractive range(s)'
                type='text'
                value={props.subtractiveRangeText}
            />
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
    onEnterKeyPress: PropTypes.func.isRequired,
    onSubtractiveChanged: PropTypes.func.isRequired,
    outputText: PropTypes.string,
    subtractiveRangeText: PropTypes.string
};

export default Inputs;
