const getUnitWithLeadingZero = (unit) => `0${unit}`.slice(-2);

const getTimeString = (range) => {
    const {
        hours,
        minutes
    } = range;
    const minutesWithLeadingZero = getUnitWithLeadingZero(minutes);

    return `${hours}:${minutesWithLeadingZero}`;
};

export function adaptOutput(rangeList) {
    const convertedRange = rangeList.map((range) => {
        const startOutput = getTimeString(range.start);
        const endOutput = getTimeString(range.end);
        const rangeOutput = `${startOutput}-${endOutput}`;

        return `${rangeOutput}`;
    });

    return `(${convertedRange.join(', ')})`;
}
