import { adaptOutput } from '../../../src/adapters/output-adapter';

const getTime = (hours, minutes) => ({
    hours,
    minutes
});

describe('Output Adapter', () => {
    describe('Given an empty', () => {
        it('should return an empty range', () => {
            const rangeList = [];
            const expectedOutput = '()';

            expect(adaptOutput(rangeList)).toEqual(expectedOutput);
        });
    });

    describe('Given a range', () => {
        it('should transform a list of ranges to the expected string format', () => {
            const rangeList = [
                {
                    start: getTime(9, 15),
                    end: getTime(10, 0)
                }
            ];
            const expectedOutput = '(9:15-10:00)';

            expect(adaptOutput(rangeList)).toEqual(expectedOutput);
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
            const expectedOutput = '(9:15-10:00, 11:00-18:45)';

            expect(adaptOutput(rangeList)).toEqual(expectedOutput);
        });
    });
});
