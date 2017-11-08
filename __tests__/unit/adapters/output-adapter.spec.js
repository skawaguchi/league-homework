import moment from 'moment';
import sinon from 'sinon';
import { adaptOutput } from '../../../src/adapters/output-adapter';

const dateFormat = 'H:mm';

describe.only('Output Adapter', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

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
                    start: moment('9:15', dateFormat),
                    end: moment('10:00', dateFormat)
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
                    start: moment('9:15', dateFormat),
                    end: moment('10:00', dateFormat)
                },
                {
                    start: moment('11:00', dateFormat),
                    end: moment('18:45', dateFormat)
                }
            ];
            const expectedOutput = '(9:15-10:00, 11:00-18:45)';

            expect(adaptOutput(rangeList)).toEqual(expectedOutput);
        });
    });
});
