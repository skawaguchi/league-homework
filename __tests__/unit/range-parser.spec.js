import { parseRange } from '../../src/range-parser';

describe('Range Parser', () => {
    describe('Given a single range', () => {
        it('should transform a range string to a workable range object', () => {
            const rangeString = '(9:35-18:00)';
            const expectedRange = [
                {
                    start: {
                        hour: 9,
                        minute: 35
                    },
                    end: {
                        hour: 18,
                        minute: 0
                    }
                }
            ];

            expect(parseRange(rangeString)).toEqual(expectedRange);
        });

        it('should transform a multiple range string to a workable range object', () => {
            const rangeString = '(9:35-18:00, 10:45-12:00)';
            const expectedRange = [
                {
                    start: {
                        hour: 9,
                        minute: 35
                    },
                    end: {
                        hour: 18,
                        minute: 0
                    }
                },
                {
                    start: {
                        hour: 10,
                        minute: 45
                    },
                    end: {
                        hour: 12,
                        minute: 0
                    }
                }
            ];

            expect(parseRange(rangeString)).toEqual(expectedRange);
        });
    });
});
