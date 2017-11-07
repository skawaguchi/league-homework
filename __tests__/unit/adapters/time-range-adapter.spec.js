import { adaptTimeRange } from '../../../src/adapters/time-range-adapter';

describe('Time Range Adapter', () => {
    describe('Given a range string', () => {
        it('should transform a range string to a workable range object', () => {
            const rangeString = '(9:35-18:00)';
            const expectedRange = [
                {
                    start: {
                        hours: 9,
                        minutes: 35
                    },
                    end: {
                        hours: 18,
                        minutes: 0
                    }
                }
            ];

            expect(adaptTimeRange(rangeString)).toEqual(expectedRange);
        });

        it('should transform a multiple range string to a workable range object', () => {
            const rangeString = '(9:35-18:00, 10:45-12:00)';
            const expectedRange = [
                {
                    start: {
                        hours: 9,
                        minutes: 35
                    },
                    end: {
                        hours: 18,
                        minutes: 0
                    }
                },
                {
                    start: {
                        hours: 10,
                        minutes: 45
                    },
                    end: {
                        hours: 12,
                        minutes: 0
                    }
                }
            ];

            expect(adaptTimeRange(rangeString)).toEqual(expectedRange);
        });
    });
});
