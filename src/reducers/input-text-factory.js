import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT
} from '../actions/list';

const applyTestExample = (target, state, action) => action.payload[target];

const updateText = (target, state, action) => {
    if (action.payload.target === target) {
        return action.payload.text;
    }
    return state;
};

function buildReducer(target, state = '', action) {
    const actionHandlers = {
        [APPLY_TEST_EXAMPLE]: applyTestExample,
        [UPDATE_TEXT]: updateText
    };

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(target, state, action) : state;
}

export function makeReducer(target) {
    return buildReducer.bind(null, target);
}
