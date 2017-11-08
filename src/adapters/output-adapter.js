const dateFormat = 'H:mm';

export function adaptOutput(rangeList) {
    const convertedRange = rangeList.map((range) => {
        const startOutput = range.start.format(dateFormat);
        const endOutput = range.end.format(dateFormat);
        const rangeOutput = `${startOutput}-${endOutput}`;

        return `${rangeOutput}`;
    });

    return `(${convertedRange.join(', ')})`;
}
