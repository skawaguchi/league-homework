import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../actions/list';
import { testRanges } from '../state/constants';
import { parseTimeRangeInput } from '../commands/parse-time-range-input';

const getInputText = (baseRangeText, subtractiveRangeText) => `(${baseRangeText}) "minus" (${subtractiveRangeText})`;
const getOutputText = (baseRangeText, subtractiveRangeText) => {
    const input = getInputText(baseRangeText, subtractiveRangeText);

    try {
        return parseTimeRangeInput(input);
    } catch (error) {
        return error.message;
    }
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
    const {
        baseRangeText,
        outputText,
        subtractiveRangeText
    } = action.payload;

    return {
        baseRangeText,
        outputText,
        subtractiveRangeText
    };
};

function getInitialState() {
    const firstIndex = 0;
    const {
        baseRangeText,
        subtractiveRangeText
    } = testRanges[firstIndex];

    const firstInput = `(${baseRangeText}) "minus" (${subtractiveRangeText})`;
    const outputText = parseTimeRangeInput(firstInput);

    return {
        baseRangeText,
        subtractiveRangeText,
        outputText
    };
}

export default function (state, action) {
    const actionHandlers = {
        [APPLY_TEST_EXAMPLE]: applyTestExample,
        [UPDATE_TEXT]: updateText,
        [UPDATE_TEXT_ERROR]: updateText
    };

    const initialState = getInitialState();

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(initialState, action) : initialState;
}
