const subStartsBeforeBase = (base, sub) => base.start.hour > sub.start.hour;

const baseEndsBeforeSub = (base, sub) => base.end.hour > sub.end.hour;

const getTime = (hour, minute) => ({
    hour, minute
});

export function subtractRanges(baseRanges, subtractiveRanges) {
    return baseRanges.reduce((accumulator, base) => {
        for (let i = 0, n = subtractiveRanges.length; i < n; i++) {
            const sub = subtractiveRanges[i];

            if (subStartsBeforeBase(base, sub)) {
                if (baseEndsBeforeSub(base, sub)) {
                    accumulator.push({
                        start: getTime(sub.end.hour, sub.end.minute),
                        end: getTime(base.end.hour, base.end.minute)
                    });
                }
            }
        }

        return accumulator;
    }, []);
}
