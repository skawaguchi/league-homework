import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorContainer from './ErrorContainer';
import Inputs from './Inputs';

import { parseTimeRangeInput } from '../commands/parse-time-range-input';

class SandboxClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseRangeText: props.defaultBaseRangeText,
            errors: null,
            outputText: '',
            subtractiveRangeText: props.defaultSubtractiveRangeText
        };

        this.onBaseChanged = this.baseRangeHandler.bind(this);
        this.onSubtractiveChanged = this.subtractiveRangeHandler.bind(this);
        this.onCalculate = this.calculationHandler.bind(this);
    }

    componentDidMount() {
        this.onCalculate();
    }

    baseRangeHandler(event) {
        const baseRangeText = event.target.value;

        this.setState({
            baseRangeText
        });
    }

    subtractiveRangeHandler(event) {
        const subtractiveRangeText = event.target.value;

        this.setState({
            subtractiveRangeText
        });
    }

    calculationHandler() {
        const calculationText = `(${this.state.baseRangeText}) "minus" (${this.state.subtractiveRangeText})`;

        try {
            const outputText = parseTimeRangeInput(calculationText);

            this.setState({
                errors: null,
                outputText
            });
        } catch (error) {
            this.setState({
                errors: 'There is a problem with your input. Please double-check your formatting.',
                outputText: 'ERROR'
            });

            throw new Error(error);
        }
    }

    render() {
        return (
            <section className='sandbox-client'>
                <h2>{'Input Ranges'}</h2>
                <Inputs
                    baseRangeText={this.state.baseRangeText}
                    onBaseChanged={this.onBaseChanged}
                    onSubtractiveChanged={this.onSubtractiveChanged}
                    outputText={this.state.outputText}
                    subtractiveRangeText={this.state.subtractiveRangeText}
                />
                <p className='calculate'>
                    <button
                        onClick={this.onCalculate}
                    >
                        {'Calculate'}
                    </button>
                </p>
                <ErrorContainer errors={this.state.errors}/>
            </section>
        );
    }
}

SandboxClient.propTypes = {
    defaultBaseRangeText: PropTypes.string.isRequired,
    defaultSubtractiveRangeText: PropTypes.string.isRequired
};

export default SandboxClient;
