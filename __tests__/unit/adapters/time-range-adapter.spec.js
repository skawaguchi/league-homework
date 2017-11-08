import sinon from 'sinon';
import moment from 'moment';
import { adaptTimeRange } from '../../../src/adapters/time-range-adapter';

describe('Time Range Adapter', () => {
    let clock;

    const dateFormat = 'H:mm';

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('Given a range string', () => {
        it('should transform a range string to a workable range object', () => {
            const start = '9:35';
            const end = '18:00';
            const rangeString = `(${start}-${end})`;
            const expectedResult = [
                {
                    start: moment(start, dateFormat),
                    end: moment(end, dateFormat)
                }
            ];

            expect(adaptTimeRange(rangeString)).toEqual(expectedResult);
        });

        it('should transform a multiple range string to a workable range object', () => {
            const rangeString = '(9:35-18:00,10:45-12:00)';
            const expectedRange = [
                {
                    start: moment('9:35', dateFormat),
                    end: moment('18:00', dateFormat)
                },
                {
                    start: moment('10:45', dateFormat),
                    end: moment('12:00', dateFormat)
                }
            ];

            expect(adaptTimeRange(rangeString)).toEqual(expectedRange);
        });
    });
});
