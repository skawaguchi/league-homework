import moment from 'moment';

const getTime = (hours, minutes) => ({
    hours,
    minutes
});

const dateFormat = 'HH:mm';
const getMomentTime = (time) => {
    const timeString = `${time.hours}:${time.minutes}`;

    return moment(timeString, dateFormat);
};

const getMomentRange = (range) => ({
    start: getMomentTime(range.start),
    end: getMomentTime(range.end)
});

const subStartsBeforeOrEqualsBase = (base, sub) => base.start >= sub.start;

const subEndsAfterOrEqualsBase = (base, sub) => base.end <= sub.end;

const subStartsBeforeBaseEnds = (base, sub) => base.end > sub.start;

const subEndsBeforeBase = (base, sub) => base.end > sub.end;

const subEndsWithinBase = (base, sub) => base.end > sub.end && base.start < sub.end;

const processSubStartsBeforeEqualsBase = (candidatesForInsertion, candidate, sub, subTime, i) => {
    if (subEndsWithinBase(candidate.baseTime, subTime)) {
        candidate.base.start = getTime(sub.end.hours, sub.end.minutes);
        candidate.baseTime.start = getMomentTime({
            hours: sub.end.hours,
            minutes: sub.end.minutes
        });
    } else if (subEndsAfterOrEqualsBase(candidate.baseTime, subTime)) {
        candidatesForInsertion.splice(i, 1);
    }
};

const processSubStartAfterBase = (candidatesForInsertion, candidate, sub, subTime) => {
    if (subEndsBeforeBase(candidate.baseTime, subTime)) {
        const newCandidateBase = {
            start: getTime(sub.end.hours, sub.end.minutes),
            end: getTime(candidate.base.end.hours, candidate.base.end.minutes)
        };
        const newCandidateBaseTime = getMomentRange(newCandidateBase);

        candidatesForInsertion.push({
            base: newCandidateBase,
            baseTime: newCandidateBaseTime
        });
    }

    if (subStartsBeforeBaseEnds(candidate.baseTime, subTime)) {
        candidate.base.end = getTime(sub.start.hours, sub.start.minutes);
        candidate.baseTime.end = getMomentTime({
            hours: sub.start.hours,
            minutes: sub.start.minutes
        });
    }
};

const sortRange = (range) =>
    range.sort((a, b) => {
        const aStart = getMomentTime(a.start);
        const bStart = getMomentTime(b.start);

        return aStart > bStart;
    });

export function subtractTimeRanges(baseRanges, subtractiveRanges) {
    const candidatesForInsertion = baseRanges.map((base) => {
        const baseTime = getMomentRange(base);

        return {
            base,
            baseTime
        };
    });

    for (let i = 0; i < candidatesForInsertion.length; i++) {
        const candidate = candidatesForInsertion[i];

        subtractiveRanges.forEach((sub) => {
            const subTime = getMomentRange(sub);

            if (subStartsBeforeOrEqualsBase(candidate.baseTime, subTime)) {
                processSubStartsBeforeEqualsBase(
                    candidatesForInsertion,
                    candidate,
                    sub,
                    subTime,
                    i
                );
            } else {
                processSubStartAfterBase(
                    candidatesForInsertion,
                    candidate,
                    sub,
                    subTime
                );
            }
        });
    }

    const mappedCandidates = candidatesForInsertion.map((candidate) => candidate.base);

    return sortRange(mappedCandidates);
}
