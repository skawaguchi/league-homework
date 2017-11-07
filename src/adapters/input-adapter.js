import { adaptTimeRange } from './time-range-adapter';

const isValidInput = (input) => {
    /* Pars should be extracted to make it easier to read */
    const validationRegEx = /^\(((?:([01]?\d|2[0-3]):)?([0-5]?\d)?-(?:([01]?\d|2[0-3]):)?([0-5]?\d))+((,)*(?:(([01]?\d|2[0-3]):)?([0-5]?\d)?-(?:([01]?\d|2[0-3]):)?([0-5]?\d)))*\)$/g;

    return input.match(validationRegEx) !== null;
};

export function adaptInput(input) {
    const whiteSpaceRegex = /\s/g;

    const lists = input
        .split(' "minus" ')
        .map((list) => list.replace(whiteSpaceRegex, ''));

    const areAllInputsValid = lists.every((inputString) => isValidInput(inputString));

    if (!areAllInputsValid) {
        throw new Error('Invalid Input. Please check your formatting.');
    }

    return {
        baseList: adaptTimeRange(lists[0]),
        subtractiveList: adaptTimeRange(lists[1])
    };
}
