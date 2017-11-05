import { adaptInput } from '../adapters/input-adapter';
import { subtractRanges } from '../states/time-range-subtraction-state-machine';
import { adaptOutput } from '../adapters/output-adapter';

export function parseTimeRangeInput(input) {
    const {
        baseList,
        subtractiveList
    } = adaptInput(input);

    const subtractedRanges = subtractRanges(
        baseList,
        subtractiveList
    );

    return adaptOutput(subtractedRanges);
}
