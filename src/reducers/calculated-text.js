import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT
} from '../actions/list';
import {
    testRanges
} from '../state/constants';
import { parseTimeRangeInput } from '../commands/parse-time-range-input';

const getInputText = (baseRangeText, subtractiveRangeText) => `(${baseRangeText}) "minus" (${subtractiveRangeText})`;
const getOutputText = (baseRangeText, subtractiveRangeText) => {
    const input = getInputText(baseRangeText, subtractiveRangeText);

    return parseTimeRangeInput(input);
};
const testTextFromPayload = (state, targetAttr, payload) => {
    const {
        target,
        text
    } = payload;
    return targetAttr === target ? text : state[targetAttr];
};

const applyTestExample = (state, action) => {
    const {
        baseRangeText,
        subtractiveRangeText
    } = action.payload;
    const outputText = getOutputText(baseRangeText, subtractiveRangeText);

    return {
        baseRangeText,
        subtractiveRangeText,
        outputText
    };
};

const updateText = (state, action) => {
    const baseRangeText = testTextFromPayload(
        state,
        'baseRangeText',
        action.payload
    );
    const subtractiveRangeText = testTextFromPayload(
        state,
        'subtractiveRangeText',
        action.payload
    );

    const outputText = getOutputText(baseRangeText, subtractiveRangeText);

    return {
        baseRangeText,
        outputText,
        subtractiveRangeText
    };
};

function getInitialState() {
    const firstIndex = 0;
    const initialRange = testRanges[firstIndex];

    const firstInput = `(${initialRange.baseRangeText}) "minus" (${initialRange.subtractiveRangeText})`;
    const firstOutput = parseTimeRangeInput(firstInput);

    return {
        baseRangeText: initialRange.baseRangeText,
        subtractiveRangeText: initialRange.subtractiveRangeText,
        outputText: firstOutput
    };
}

export default function (state = '', action) {
    const actionHandlers = {
        [APPLY_TEST_EXAMPLE]: applyTestExample,
        [UPDATE_TEXT]: updateText
    };

    const initialState = getInitialState();

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : initialState;
}
