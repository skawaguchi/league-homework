import {
    UPDATE_ERROR
} from '../actions/list';

const updateError = (state, action) => {
    return action.payload;
};

export default function (state = false, action) {
    const actionHandlers = {
        [UPDATE_ERROR]: updateError
    };

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}
