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

export function parseRange(input) {
    const rangeList = input
        .substring(1, input.length - 1)
        .split('-');

    return parseTimeList(rangeList);
}
