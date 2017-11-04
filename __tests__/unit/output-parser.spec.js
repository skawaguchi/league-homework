import { parseRange } from '../../src/output-parser';

const getTime = (hour, minute) => ({
    hour,
    minute
});

describe('Output Parser', () => {
    describe('Given range', () => {
        it('should transform a list of ranges to the expected string format', () => {
            const rangeList = [
                {
                    start: getTime(9, 15),
                    end: getTime(10, 0)
                }
            ];
            const expectedOutput = '(09:15-10:00)';

            expect(parseRange(rangeList)).toEqual(expectedOutput);
        });
    });

    describe('Given multiple ranges', () => {
        it('should transform a list of ranges to the expected string format', () => {
            const rangeList = [
                {
                    start: getTime(9, 15),
                    end: getTime(10, 0)
                },
                {
                    start: getTime(11, 0),
                    end: getTime(18, 45)
                }
            ];
            const expectedOutput = '(09:15-10:00),(11:00-18:45)';

            expect(parseRange(rangeList)).toEqual(expectedOutput);
        });
    });
});
