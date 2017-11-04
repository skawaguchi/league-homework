import { parseList } from './list-parser';
import { subtractRanges } from './time-range-subtractor';
import { parseRange } from './output-parser';

export function parseInput(input) {
    const parsedList = parseList(input);

    const subtractedRanges = subtractRanges(parsedList.aList, parsedList.bList);

    return parseRange(subtractedRanges);
}
