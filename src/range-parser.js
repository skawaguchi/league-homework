const getTime = (hour, minutes) => ({
    hour: parseInt(hour, 10),
    minute: parseInt(minutes, 10)
});

const parseTimeList = (time) => {
    const hoursMinutes = time.split(':');

    return getTime(hoursMinutes[0], hoursMinutes[1]);
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
