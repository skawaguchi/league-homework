import { adaptTimeRange } from './time-range-adapter';

export function adaptInput(input) {
    const lists = input.split(' "minus" ');

    return {
        baseList: adaptTimeRange(lists[0]),
        subtractiveList: adaptTimeRange(lists[1])
    };
}
