const getUnitWithLeadingZero = (unit) => `0${unit}`.slice(-2);

const getTimeString = (range) => {
    const {
        hour,
        minute
    } = range;
    const minuteWithLeadingZero = getUnitWithLeadingZero(minute);

    return `${hour}:${minuteWithLeadingZero}`;
};

export function parseRange(rangeList) {
    const convertedRange = rangeList.map((range) => {
        const startOutput = getTimeString(range.start);
        const endOutput = getTimeString(range.end);
        const rangeOutput = `${startOutput}-${endOutput}`;

        return `${rangeOutput}`;
    });

    return `(${convertedRange.join(', ')})`;
}
