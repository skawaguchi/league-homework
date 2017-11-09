const subStartsBeforeOrEqualsBase = (base, sub) => base.start >= sub.start;

const subEndsAfterOrEqualsBase = (base, sub) => base.end <= sub.end;

const subStartsBeforeBaseEnds = (base, sub) => base.end > sub.start;

const subEndsBeforeBase = (base, sub) => base.end > sub.end;

const subEndsWithinBase = (base, sub) => base.end > sub.end && base.start < sub.end;

const sortRange = (range) =>
    range.sort((a, b) => a.start > b.start);

const processSubStartsBeforeEqualsBase = (candidateRanges, candidate, sub, i) => {
    if (subEndsWithinBase(candidate, sub)) {
        candidate.start = sub.end;
    } else if (subEndsAfterOrEqualsBase(candidate, sub)) {
        candidateRanges.splice(i, 1);
    }
};

const processSubStartAfterBase = (candidateRanges, candidate, sub) => {
    if (subEndsBeforeBase(candidate, sub)) {
        const newCandidateBase = {
            start: sub.end,
            end: candidate.end
        };

        candidateRanges.push(newCandidateBase);
    }

    if (subStartsBeforeBaseEnds(candidate, sub)) {
        candidate.end = sub.start;
    }
};

export function subtractTimeRanges(baseRanges, subtractiveRanges) {
    const candidateRanges = sortRange(baseRanges.slice(0));

    for (let i = 0; i < candidateRanges.length; i++) {
        const candidate = candidateRanges[i];

        subtractiveRanges.forEach((sub) => {
            if (subStartsBeforeOrEqualsBase(candidate, sub)) {
                processSubStartsBeforeEqualsBase(
                    candidateRanges,
                    candidate,
                    sub,
                    i
                );
            } else {
                processSubStartAfterBase(
                    candidateRanges,
                    candidate,
                    sub
                );
            }
        });
    }

    return candidateRanges;
}
