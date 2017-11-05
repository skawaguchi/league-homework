const getTime = (hours, minutess) => ({
    hours: parseInt(hours, 10),
    minutes: parseInt(minutess, 10)
});

const parseTimeList = (time) => {
    const hoursminutess = time.split(':');

    return getTime(hoursminutess[0], hoursminutess[1]);
};

const parseRangeList = (rangeList) => {
    const parsedList = rangeList.split('-')
        .map(parseTimeList);

    return {
        start: parsedList[0],
        end: parsedList[1]
    };
};

export function parseRange(input) {
    return input
        .substring(1, input.length - 1)
        .split(', ')
        .map(parseRangeList);
}
