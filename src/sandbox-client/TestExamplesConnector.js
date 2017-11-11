import { connect } from 'react-redux';
import TestExamples from './TestExamples';

import { applyTestExample } from '../actions/test-examples';

function mapDispatchToProps(dispatch) {
    return {
        onExampleSelected: (baseRangeText, subtractiveRangeText) => {
            dispatch(applyTestExample(baseRangeText, subtractiveRangeText));
        }
    };
}

export default connect(null, mapDispatchToProps)(TestExamples);
