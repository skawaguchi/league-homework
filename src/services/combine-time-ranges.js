const sortRange = (range) =>
    range.sort((a, b) => a.start > b.start);

const doesRangeStartAfterPrevious = (range, previous) => range.start > previous.end;
const isRangeEmpty = (range) => range.length === 0;

export function combineTimeRanges(rangeList) {
    const sortedList = sortRange(rangeList);

    const combinedList = sortedList.reduce((acc, range) => {
        const previous = acc[acc.length - 1];
        if (isRangeEmpty(acc) || doesRangeStartAfterPrevious(range, previous)) {
            acc.push(range);
        } else {
            acc[acc.length - 1].end = range.end;
        }

        return acc;
    }, []);

    return sortRange(combinedList);
}
