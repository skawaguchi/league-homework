import { parseTimeRangeInput } from '../../src/commands/parse-time-range-input';

const testOutput = (input, expectedOutput) => {
    it('should subtract the expected value', () => {
        const actualOutput = parseTimeRangeInput(input);

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

    describe('Scenario 4: Multiple Base Ranges with a Subtractive Range that Overlaps Both', () => {
        testOutput(
            '(9:00-9:30, 10:00-10:30) "minus" (9:15-10:15)',
            '(9:00-9:15, 10:15-10:30)'
        );
    });

    describe('Scenario 5: Multiple Base Ranges with Multiple Subtractive Ranges', () => {
        testOutput(
            '(9:00-11:00, 13:00-15:00) "minus" (9:00-9:15, 10:00-10:15, 12:30-16:00)',
            '(9:15-10:00, 10:15-11:00)'
        );
    });

    describe('Error Case: Throw and Error with Invalid Input', () => {
        it('should subtract the expected value', () => {
            const input = '(9:00-11:00, 13:00-15:00,13:05-) "minus" (9:15-10:15)';

            expect(() => parseTimeRangeInput(input)).toThrowError();
        });
    });
});
