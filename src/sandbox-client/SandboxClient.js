import React from 'react';
import PropTypes from 'prop-types';

import Inputs from './Inputs';

function SandboxClient(props) {
    return (
        <section className='sandbox-client'>
            <h2>{'Input Ranges'}</h2>
            <Inputs
                baseRangeText={props.baseRangeText}
                hasErrors={props.hasErrors}
                onBaseChanged={props.onBaseChanged}
                onSubtractiveChanged={props.onSubtractiveChanged}
                outputText={props.outputText}
                subtractiveRangeText={props.subtractiveRangeText}
            />
        </section>
    );
}

SandboxClient.propTypes = {
    baseRangeText: PropTypes.string.isRequired,
    hasErrors: PropTypes.bool.isRequired,
    onBaseChanged: PropTypes.func.isRequired,
    onSubtractiveChanged: PropTypes.func.isRequired,
    subtractiveRangeText: PropTypes.string.isRequired,
    outputText: PropTypes.string.isRequired
};

export default SandboxClient;
