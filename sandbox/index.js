import { parseTimeRangeInput } from '../dist/time-range-parser';

const input = '(9:00-11:00, 13:00-15:00) "minus" (9:00-9:15, 10:00-10:15, 12:30-16:00)';

console.log(
    'This allows you to output the following input. Simply change it and run `yarn sandbox` again.\n',
    `input: ${input}\n`,
    `output: ${parseTimeRangeInput(input)}`
);
