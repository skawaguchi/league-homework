import {
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from './list';
import { parseTimeRangeInput } from '../commands/parse-time-range-input';

const getInputText = (baseRangeText, subtractiveRangeText) =>
    `(${baseRangeText}) "minus" (${subtractiveRangeText})`;
const getOutputText = (baseRangeText, subtractiveRangeText) => {
    const input = getInputText(baseRangeText, subtractiveRangeText);

    return parseTimeRangeInput(input);
};

const testTextFromPayload = (state, targetAttr, target, text) => {
    const targetText = targetAttr === target ? text : state.calculatedText[targetAttr];

    return targetText;
};

const dispatchAction = (dispatch, type, payload) => {
    const {
        baseRangeText,
        subtractiveRangeText,
        outputText
    } = payload;

    dispatch({
        payload: {
            baseRangeText,
            subtractiveRangeText,
            outputText
        },
        type
    });
};

export function updateText(target, text) {
    return (dispatch, getState) => {
        const state = getState();

        const baseRangeText = testTextFromPayload(state, 'baseRangeText', target, text);
        const subtractiveRangeText = testTextFromPayload(state, 'subtractiveRangeText', target, text);

        try {
            const outputText = getOutputText(baseRangeText, subtractiveRangeText);

            dispatchAction(dispatch, UPDATE_TEXT, {
                baseRangeText,
                subtractiveRangeText,
                outputText
            });
        } catch (error) {
            dispatchAction(dispatch, UPDATE_TEXT_ERROR, {
                baseRangeText,
                subtractiveRangeText,
                outputText: error.message
            });
        }
    };
}
