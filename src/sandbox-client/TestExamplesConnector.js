import { connect } from 'react-redux';
import TestExamples from './TestExamples';

import { applyTestExample } from '../actions/test-examples';

function mapDispatchToProps(dispatch) {
    return {
        onExampleSelected: (baseText, subtractiveText) => {
            dispatch(applyTestExample(baseText, subtractiveText));
        }
    };
}

export default connect(null, mapDispatchToProps)(TestExamples);
