import moment from 'moment';

const subStartsBeforeOrEqualsBase = (base, sub) => base.start >= sub.start;

const subEndsAfterOrEqualsBase = (base, sub) => base.end <= sub.end;

const subStartsBeforeBaseEnds = (base, sub) => base.end > sub.start;

const subEndsBeforeBase = (base, sub) => base.end > sub.end;

const subEndsWithinBase = (base, sub) => base.end > sub.end && base.start < sub.end;

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
    const candidatesForInsertion = baseRanges.map((base) => {
        const baseTime = getMomentRange(base);

        return {
            base,
            baseTime
        };
    });

    for (let i = 0; i < candidatesForInsertion.length; i++) {
        const candidate = candidatesForInsertion[i];

        for (let j = 0; j < subtractiveRanges.length; j++) {
            const sub = subtractiveRanges[j];
            const subTime = getMomentRange(sub);

            if (subStartsBeforeOrEqualsBase(candidate.baseTime, subTime)) {
                if (subEndsWithinBase(candidate.baseTime, subTime)) {
                    candidate.base.start = getTime(sub.end.hour, sub.end.minute);
                    candidate.baseTime.start = getMomentTime({
                        hour: sub.end.hour,
                        minute: sub.end.minute
                    });
                } else if (subEndsAfterOrEqualsBase(candidate.baseTime, subTime)) {
                    candidatesForInsertion.splice(i, 1);
                }
            } else {
                if (subEndsBeforeBase(candidate.baseTime, subTime)) {
                    const newCandidateBase = {
                        start: getTime(sub.end.hour, sub.end.minute),
                        end: getTime(candidate.base.end.hour, candidate.base.end.minute)
                    };
                    const newCandidateBaseTime = getMomentRange(newCandidateBase);

                    candidatesForInsertion.push({
                        base: newCandidateBase,
                        baseTime: newCandidateBaseTime
                    });
                }

                if (subStartsBeforeBaseEnds(candidate.baseTime, subTime)) {
                    candidate.base.end = getTime(sub.start.hour, sub.start.minute);
                    candidate.baseTime.end = getMomentTime({
                        hour: sub.start.hour,
                        minute: sub.start.minute
                    });
                }
            }
        }
    }

    return candidatesForInsertion.map((candidate) => candidate.base);
}
