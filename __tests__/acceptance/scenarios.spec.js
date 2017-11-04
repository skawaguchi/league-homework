import { parseInput } from '../../src/time-range-parser';

describe('Scenario 1: Basic Subtraction', () => {
    it('should subtract the expected value', () => {
        const input = '(09:00-10:00) "minus" (09:00-09:30)';
        const expectedOutput = '(09:30-10:00)';

        const actualOutput = parseInput(input);

        expect(actualOutput).toEqual(expectedOutput);
    });
});
