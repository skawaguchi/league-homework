import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseTimeRangeInput } from '../commands/parse-time-range-input';

class SandboxClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseRangeText: props.defaultBaseRangeText,
            error: null,
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
                error: null,
                outputText
            });
        } catch (error) {
            this.setState({
                error: 'There is a problem with your input. Please double-check your formatting.',
                outputText: 'ERROR'
            });

            throw new Error(error);
        }
    }

    render() {
        return (
            <section className='sandbox-client'>
                <h2>{'Input Ranges'}</h2>
                <p className='input-container'>
                    <span className='base'>
                        <input
                            onChange={this.onBaseChanged}
                            placeholder='Enter time range(s)'
                            type='text'
                            value={this.state.baseRangeText}
                        />
                    </span>
                    <span className='minus-text'>
                        {'"minus"'}
                    </span>
                    <span className='subtractive'>
                        <input
                            onChange={this.onSubtractiveChanged}
                            placeholder='Enter subtractive range(s)'
                            type='text'
                            value={this.state.subtractiveRangeText}
                        />
                    </span>
                    <span className='equals-text'>
                        {'='}
                    </span>
                    <span className='output'>
                        <input
                            readOnly='readOnly'
                            type='text'
                            value={this.state.outputText}
                        />
                    </span>
                </p>
                <p className='calculate'>
                    <button
                        onClick={this.onCalculate}
                    >
                        {'Calculate'}
                    </button>
                </p>
                {
                    this.state.error ?
                        <p className='errors'>
                            {this.state.error}
                        </p> :
                        null
                }
            </section>
        );
    }
}

SandboxClient.propTypes = {
    defaultBaseRangeText: PropTypes.string.isRequired,
    defaultSubtractiveRangeText: PropTypes.string.isRequired
};

export default SandboxClient;
