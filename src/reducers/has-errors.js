import {
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../actions/list';

const updateText = () => false;
const updateTextError = () => true;

export default function (state = false, action) {
    const actionHandlers = {
        [UPDATE_TEXT]: updateText,
        [UPDATE_TEXT_ERROR]: updateTextError
    };

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}
