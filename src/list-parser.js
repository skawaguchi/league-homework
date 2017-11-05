import { parseRange } from './range-parser';

export function parseList(input) {
    const lists = input.split(' "minus" ');

    return {
        baseList: parseRange(lists[0]),
        subtractiveList: parseRange(lists[1])
    };
}
