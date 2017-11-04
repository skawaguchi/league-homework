import moment from 'moment';

const subStartsBeforeOrEqualsBase = (base, sub) => base.start >= sub.start;

const baseEndsBeforeSub = (base, sub) => base.end > sub.end;

const getTime = (hour, minute) => ({
    hour, minute
});

const getMomentTime = (time) => {
    const timeString = `${time.hour}:${time.minute}`;

    return moment(timeString, 'HH:mm');
};

const getMomentRange = (range) => ({
    start: getMomentTime(range.start),
    end: getMomentTime(range.end)
});

export function subtractRanges(baseRanges, subtractiveRanges) {
    return baseRanges.reduce((accumulator, base) => {
        const baseTime = getMomentRange(base);

        for (let i = 0, n = subtractiveRanges.length; i < n; i++) {
            const sub = subtractiveRanges[i];
            const subTime = getMomentRange(sub);

            if (subStartsBeforeOrEqualsBase(baseTime, subTime)) {
                if (baseEndsBeforeSub(baseTime, subTime)) {
                    accumulator.push({
                        start: getTime(sub.end.hour, sub.end.minute),
                        end: getTime(base.end.hour, base.end.minute)
                    });
                }
            } else if (baseEndsBeforeSub(baseTime, subTime)) {
                accumulator.push({
                    start: getTime(base.start.hour, base.start.minute),
                    end: getTime(sub.start.hour, sub.start.minute)
                });
                accumulator.push({
                    start: getTime(sub.end.hour, sub.end.minute),
                    end: getTime(base.end.hour, base.end.minute)
                });
            } else {
                accumulator.push({
                    start: getTime(base.start.hour, base.start.minute),
                    end: getTime(sub.start.hour, sub.start.minute)
                });
            }
        }

        return accumulator;
    }, []);
}
