import { parseRange } from '../../src/string-parser';

describe('String Parser', () => {
    it('should transform a range string to a workable range object', () => {
        const rangeString = '(9:35-18:00)';
        const expectedRange = {
            start: {
                hour: 9,
                minute: 35
            },
            end: {
                hour: 18,
                minute: 0
            }
        };

        expect(parseRange(rangeString)).toEqual(expectedRange);
    });
});
