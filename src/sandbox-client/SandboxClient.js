import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Inputs from './Inputs';

import { parseTimeRangeInput } from '../commands/parse-time-range-input';

let onBaseChanged;
let onSubtractiveChanged;
let onCalculate;

function rangeChangeHandler(type, event) {
    const rangeText = event.target.value;
    const newState = {
        [type]: rangeText
    };

    this.setState(newState);

    onCalculate(newState);
}

function calculationHandler(newState = {}) {
    const baseRangeText = newState.baseRangeText ?
        newState.baseRangeText :
        this.state.baseRangeText;
    const subtractiveRangeText = newState.subtractiveRangeText ?
        newState.subtractiveRangeText :
        this.state.subtractiveRangeText;

    const calculationText = `(${baseRangeText}) "minus" (${subtractiveRangeText})`;

    try {
        const outputText = parseTimeRangeInput(calculationText);

        this.setState({
            hasErrors: false,
            outputText
        });
    } catch (error) {
        this.setState({
            hasErrors: true,
            outputText: 'Please check the formatting of your input.'
        });
    }
}

class SandboxClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseRangeText: props.defaultBaseRangeText,
            hasErrors: false,
            outputText: '',
            subtractiveRangeText: props.defaultSubtractiveRangeText
        };

        onBaseChanged = rangeChangeHandler.bind(this, 'baseRangeText');
        onSubtractiveChanged = rangeChangeHandler.bind(this, 'subtractiveRangeText');
        onCalculate = calculationHandler.bind(this);
    }

    componentDidMount() {
        onCalculate();
    }

    render() {
        return (
            <section className='sandbox-client'>
                <h2>{'Input Ranges'}</h2>
                <Inputs
                    baseRangeText={this.state.baseRangeText}
                    hasErrors={this.state.hasErrors}
                    onBaseChanged={onBaseChanged}
                    onSubtractiveChanged={onSubtractiveChanged}
                    outputText={this.state.outputText}
                    subtractiveRangeText={this.state.subtractiveRangeText}
                />
            </section>
        );
    }
}

SandboxClient.propTypes = {
    defaultBaseRangeText: PropTypes.string.isRequired,
    defaultSubtractiveRangeText: PropTypes.string.isRequired
};

export default SandboxClient;
