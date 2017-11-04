import { parseInput } from '../../src/time-range-parser';

const testOutput = (input, expectedOutput) => {
    it('should subtract the expected value', () => {
        const actualOutput = parseInput(input);

        expect(actualOutput).toEqual(expectedOutput);
    });
};

describe('Acceptance Test Scenarios', () => {
    describe('Scenario 1: Subtraction with Matching Starts', () => {
        testOutput(
            '(9:00-10:00) "minus" (9:00-9:30)',
            '(9:30-10:00)'
        );
    });

    describe('Scenario 2: Empty Output', () => {
        testOutput(
            '(9:00-10:00) "minus" (9:00-10:00)',
            '()'
        );
    });

    describe('Scenario 3: Subtraction with Non-Overlapping Ranges', () => {
        testOutput(
            '(9:00-9:30) "minus" (9:30-15:00)',
            '(9:00-9:30)'
        );
    });
});
