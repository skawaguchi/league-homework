import { parseInput } from '../../src/time-range-parser';

describe('Scenario 1: Basic Subtraction', () => {
    it('should subtract the expected value', () => {
        const input = '(9:00-10:00) "minus" (9:00-9:30)';
        const expectedOutput = '(9:30-10:00)';

        const actualOutput = parseInput(input);

        expect(actualOutput).toEqual(expectedOutput);
    });
});

describe('Scenario 2: Empty Output', () => {
    it('should subtract the expected value', () => {
        const input = '(9:00-10:00) "minus" (9:00-10:00)';
        const expectedOutput = '()';

        const actualOutput = parseInput(input);

        expect(actualOutput).toEqual(expectedOutput);
    });
});
