import sinon from 'sinon';
import moment from 'moment';

import { combineTimeRanges } from '../../../src/services/combine-time-ranges';

const dateFormat = 'H:mm';

describe('Combine Time Ranges Service', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('Given a single range', () => {
        it('should not adjust the ranges', () => {
            const firstRange = {
                start: moment('9:00', dateFormat),
                end: moment('10:00', dateFormat)
            };
            const range = [
                firstRange
            ];
            const expectedOutput = [
                firstRange
            ];

            const actualOutput = combineTimeRanges(range);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe('Given ranges that do not intersect', () => {
        it('should not adjust the ranges', () => {
            const firstRange = {
                start: moment('9:00', dateFormat),
                end: moment('10:00', dateFormat)
            };
            const secondRange = {
                start: moment('11:00', dateFormat),
                end: moment('12:00', dateFormat)
            };
            const thirdRange = {
                start: moment('13:00', dateFormat),
                end: moment('14:00', dateFormat)
            };
            const range = [
                firstRange,
                secondRange,
                thirdRange
            ];
            const expectedOutput = [
                firstRange,
                secondRange,
                thirdRange
            ];

            const actualOutput = combineTimeRanges(range);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe('Given ranges where the first range overlaps the second', () => {
        it('should combine the overlapping ranges', () => {
            const firstRange = {
                start: moment('9:00', dateFormat),
                end: moment('11:00', dateFormat)
            };
            const secondRange = {
                start: moment('11:00', dateFormat),
                end: moment('12:00', dateFormat)
            };
            const thirdRange = {
                start: moment('13:00', dateFormat),
                end: moment('14:00', dateFormat)
            };
            const range = [
                firstRange,
                secondRange,
                thirdRange
            ];
            const expectedOutput = [
                {
                    start: moment('9:00', dateFormat),
                    end: moment('12:00', dateFormat)
                },
                thirdRange
            ];

            const actualOutput = combineTimeRanges(range);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe('Given ranges where the second range overlaps the first', () => {
        it('should combine the overlapping ranges', () => {
            const firstRange = {
                start: moment('0:00', dateFormat),
                end: moment('9:00', dateFormat)
            };
            const secondRange = {
                start: moment('10:00', dateFormat),
                end: moment('12:00', dateFormat)
            };
            const thirdRange = {
                start: moment('11:30', dateFormat),
                end: moment('14:00', dateFormat)
            };
            const range = [
                firstRange,
                secondRange,
                thirdRange
            ];
            const expectedOutput = [
                firstRange,
                {
                    start: moment('10:00', dateFormat),
                    end: moment('14:00', dateFormat)
                }
            ];

            const actualOutput = combineTimeRanges(range);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    describe('Given ranges where there are out of order ranges', () => {
        it('should combine the overlapping ranges', () => {
            const firstRange = {
                start: moment('10:00', dateFormat),
                end: moment('11:00', dateFormat)
            };
            const secondRange = {
                start: moment('8:00', dateFormat),
                end: moment('10:00', dateFormat)
            };
            const range = [
                firstRange,
                secondRange
            ];
            const expectedOutput = [
                {
                    start: moment('8:00', dateFormat),
                    end: moment('11:00', dateFormat)
                }
            ];

            const actualOutput = combineTimeRanges(range);

            expect(actualOutput).toEqual(expectedOutput);
        });
    });
});
