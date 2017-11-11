import { connect } from 'react-redux';
import SandboxClient from './SandboxClient';
import { updateText } from '../actions/text-input';

const baseChangeHandler = (text) => updateText('baseRangeText', text);

const subtractiveChangeHandler = (text) => updateText('subtractiveRangeText', text);

const mapStateToProps = (state) => ({
    baseRangeText: state.baseRangeText,
    hasErrors: state.hasErrors,
    subtractiveRangeText: state.subtractiveRangeText,
    outputText: state.outputText
});

const mapDispatchToProps = (dispatch) => ({
    onBaseChanged: (event) => dispatch(baseChangeHandler(event.target.value)),
    onSubtractiveChanged: (event) => dispatch(subtractiveChangeHandler(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SandboxClient);
