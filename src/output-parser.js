const getUnitWithLeadingZero = (unit) => `0${unit}`.slice(-2);

const getTimeString = (range) => {
    const hour = getUnitWithLeadingZero(range.hour);
    const minute = getUnitWithLeadingZero(range.minute);

    return `${hour}:${minute}`;
};

export function parseRange(rangeList) {
    const convertedRange = rangeList.map((range) => {
        const startOutput = getTimeString(range.start);
        const endOutput = getTimeString(range.end);
        const rangeOutput = `${startOutput}-${endOutput}`;

        return `(${rangeOutput})`;
    });

    return convertedRange.join(',');
}
