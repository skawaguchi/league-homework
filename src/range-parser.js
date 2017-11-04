const targetMap = {
    0: 'start',
    1: 'end'
};

function parseTimeList(list) {
    return list.reduce((accumulator, time, index) => {
        const hoursMinutes = time.split(':');
        const attr = targetMap[index];

        accumulator[attr] = {
            hour: parseInt(hoursMinutes[0], 10),
            minute: parseInt(hoursMinutes[1], 10)
        };

        return accumulator;
    }, {});
}

export function parseRange(range) {
    const rangeList = range
        .substring(1, range.length - 1)
        .split('-');

    return parseTimeList(rangeList);
}
