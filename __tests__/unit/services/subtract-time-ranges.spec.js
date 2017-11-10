import sinon from 'sinon';
import moment from 'moment';

import { subtractTimeRanges } from '../../../src/services/subtract-time-ranges';

const dateFormat = 'H:mm';

describe('Subtract Time Ranges Service', () => {
    let clock;

    const getTime = (hours, minutes) => moment(`${hours}:${minutes}`, dateFormat);
    const getRange = (start, end) => ({
        start: getTime(start[0], start[1]),
        end: getTime(end[0], end[1])
    })
    const testRange = (baseRanges, subtractiveRanges, expectedOutput) => {
        const actualOutput = subtractTimeRanges(baseRanges, subtractiveRanges);

        expect(actualOutput).toEqual(expectedOutput);
    };

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('Fully subtractive', () => {
        describe('Given a base range', () => {
            describe('and a subtractive range with the same range', () => {
                it('should return an empty range', () => {
                    const range = getRange(['00', '00'], ['00', '00']);
                    const baseRanges = [
                        range
                    ];
                    const subtractiveRanges = [
                        range
                    ];
                    const expectedOutput = [];

                    testRange(baseRanges, subtractiveRanges, expectedOutput);
                });
            });

            describe('and a subtractive range with an earlier start and an end that equals the base range', () => {
                it('should subtract the subtractive range from the base range', () => {
                    const baseRange = getRange(['9', '00'], ['10', '00']);
                    const subtractiveRange = getRange(['8', '00'], ['11', '00']);
                    const baseRanges = [baseRange];
                    const subtractiveRanges = [subtractiveRange];
                    const expectedOutput = [];

                    testRange(baseRanges, subtractiveRanges, expectedOutput);
                });
            });

            describe('and a subtractive range with an equal start and an end that is later than the base range', () => {
                it('should subtract the subtractive range from the base range', () => {
                    const baseRange = getRange(['9', '00'], ['10', '00']);
                    const subtractiveRange = getRange(['9', '00'], ['10', '30']);
                    const baseRanges = [baseRange];
                    const subtractiveRanges = [subtractiveRange];
                    const expectedOutput = [];

                    testRange(baseRanges, subtractiveRanges, expectedOutput);
                });
            });
        });
    });

    describe('Partially subtractive', () => {
        describe('Given a base range', () => {
            describe('and a subtractive range with an earlier start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRanges = [getRange(['9', '00'], ['10', '00'])];
                        const subtractiveRanges = [getRange(['8', '00'], ['9', '30'])];
                        const expectedOutput = [getRange(['9', '30'], ['10', '00'])];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });
            });

            describe('and a subtractive range with an equal start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRanges = [getRange(['9', '00'], ['10', '00'])];
                        const subtractiveRanges = [getRange(['9', '00'], ['9', '30'])];
                        const expectedOutput = [getRange(['9', '30'], ['10', '00'])];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });
            });

            describe('and a subtractive range with a later start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should result in multiple outputs with the subtractive range removed from the base range', () => {
                        const baseRanges = [getRange(['9', '00'], ['10', '00'])];
                        const subtractiveRanges = [getRange(['9', '30'], ['9', '45'])];
                        const expectedOutput = [
                            getRange(['9', '00'], ['9', '30']),
                            getRange(['9', '45'], ['10', '00'])
                        ];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });

                describe('and an end that is later than the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRanges = [getRange(['9', '00'], ['10', '00'])];
                        const subtractiveRanges = [getRange(['9', '30'], ['10', '45'])];
                        const expectedOutput = [getRange(['9', '00'], ['9', '30'])];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });
            });
        });

        describe('Given multiple base ranges', () => {
            describe('and a subtractive range with an earlier start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRanges = [
                            getRange(['9', '00'], ['10', '00']),
                            getRange(['11', '00'], ['14', '00'])
                        ];
                        const subtractiveRanges = [
                            getRange(['8', '00'], ['9', '15']),
                            getRange(['11', '00'], ['18', '00'])
                        ];

                        const expectedOutput = [
                            getRange(['9', '15'], ['10', '00'])
                        ];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });

                describe('and an end that is after the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRanges = [
                            getRange(['9', '00'], ['10', '00']),
                            getRange(['11', '00'], ['14', '00'])
                        ];

                        const subtractiveRanges = [
                            getRange(['9', '30'], ['9', '45']),
                            getRange(['10', '15'], ['18', '00'])
                        ];

                        const expectedOutput = [
                            getRange(['9', '00'], ['9', '30']),
                            getRange(['9', '45'], ['10', '00'])
                        ];

                        testRange(baseRanges, subtractiveRanges, expectedOutput);
                    });
                });
            });
        });
    });
});
