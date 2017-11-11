import { connect } from 'react-redux';
import SandboxClient from './SandboxClient';

const mapStateToProps = (state) => ({
    baseRangeText: state.baseRangeText,
    subtractiveRangeText: state.subtractiveRangeText
});

export default connect(mapStateToProps)(SandboxClient);
