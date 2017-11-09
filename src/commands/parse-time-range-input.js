import { adaptInput } from '../adapters/input-adapter';
import { subtractTimeRanges } from '../services/subtract-time-ranges';
import { combineTimeRanges } from '../services/combine-time-ranges';
import { adaptOutput } from '../adapters/output-adapter';

export function parseTimeRangeInput(input) {
    const {
        baseList,
        subtractiveList
    } = adaptInput(input);

    const subtractedRanges = subtractTimeRanges(
        baseList,
        subtractiveList
    );

    const combinedRanges = combineTimeRanges(subtractedRanges);

    return adaptOutput(combinedRanges);
}
