import { parseRange } from './range-parser';

export function parseList(input) {
    const lists = input.split(' "minus" ');

    return {
        aList: parseRange(lists[0]),
        bList: parseRange(lists[1])
    };
}
