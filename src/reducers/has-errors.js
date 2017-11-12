import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../actions/list';

const hideError = () => false;
const showError = () => true;

export default function (state = false, action) {
    const actionHandlers = {
        [APPLY_TEST_EXAMPLE]: hideError,
        [UPDATE_TEXT]: hideError,
        [UPDATE_TEXT_ERROR]: showError
    };

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}
