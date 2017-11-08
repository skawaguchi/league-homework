import moment from 'moment';

const dateFormat = 'H:mm';

const parseRangeList = (rangeList) => {
    const parsedList = rangeList
        .split('-')
        .map((time) => moment(time, dateFormat));

    return {
        start: parsedList[0],
        end: parsedList[1]
    };
};

export function adaptTimeRange(input) {
    return input
        .substring(1, input.length - 1)
        .split(',')
        .map(parseRangeList);
}
