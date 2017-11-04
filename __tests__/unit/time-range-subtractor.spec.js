import { subtractRanges } from '../../src/time-range-subtractor';

describe('Time Range Subtractor', () => {
    const getTime = (hour, minute) => ({
        hour,
        minute
    });

    describe('Fully subtractive', () => {
        describe('Given a base range', () => {
            describe('and a range with the same range', () => {
                it('should return an empty range', () => {
                    const time = getTime(0, 0);
                    const range = {
                        start: time,
                        end: time
                    };
                    const aRange = [
                        range
                    ];
                    const bRange = [
                        range
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });

            describe('and a range with a lower start and an end that equals the base range', () => {
                it('should subtract the ', () => {
                    const baseRange = {
                        start: getTime(9, 0),
                        end: getTime(10, 0)
                    };
                    const subtractiveRange = {
                        start: getTime(8, 0),
                        end: getTime(10, 0)
                    };
                    const aRange = [
                        baseRange
                    ];
                    const bRange = [
                        subtractiveRange
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });

            describe('and a range with an equal start and an end that is greater than the base range', () => {
                it('should subtract the ', () => {
                    const baseRange = {
                        start: getTime(9, 0),
                        end: getTime(10, 0)
                    };
                    const subtractiveRange = {
                        start: getTime(9, 0),
                        end: getTime(10, 30)
                    };
                    const aRange = [
                        baseRange
                    ];
                    const bRange = [
                        subtractiveRange
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });
        });
    });

    describe('Partially subtractive', () => {
        describe('Given a base range', () => {
            describe('and a range with a lower start and an end that falls within the base range', () => {
                it('should subtract the subtractive range from the base range', () => {
                    const baseRange = {
                        start: getTime(9, 0),
                        end: getTime(10, 0)
                    };
                    const subtractiveRange = {
                        start: getTime(8, 0),
                        end: getTime(9, 30)
                    };
                    const aRange = [
                        baseRange
                    ];
                    const bRange = [
                        subtractiveRange
                    ];
                    const expectedOutput = [
                        {
                            start: getTime(9, 30),
                            end: getTime(10, 0)
                        }
                    ];

                    const actualOutput = subtractRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });
        });
    });
});