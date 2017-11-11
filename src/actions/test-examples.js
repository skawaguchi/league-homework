import { APPLY_TEST_EXAMPLE } from './list';

export function applyTestExample(baseRangeText, subtractiveRangeText) {
    return {
        payload: {
            baseRangeText,
            subtractiveRangeText
        },
        type: APPLY_TEST_EXAMPLE
    };
}
