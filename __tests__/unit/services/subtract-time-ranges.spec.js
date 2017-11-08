import sinon from 'sinon';
import moment from 'moment';

import { subtractTimeRanges } from '../../../src/services/subtract-time-ranges';

const dateFormat = 'H:mm';

describe('Subtract Time Ranges Service', () => {
    let clock;

    const getTime = (hours, minutes) => moment(`${hours}:${minutes}`, dateFormat);

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
                    const time = getTime('00', '00');
                    const range = {
                        start: time,
                        end: time
                    };
                    const baseRange = [
                        range
                    ];
                    const subtractiveRange = [
                        range
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractTimeRanges(baseRange, subtractiveRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });

            describe('and a subtractive range with an earlier start and an end that equals the base range', () => {
                it('should subtract the subtractive range from the base range', () => {
                    const baseRange = {
                        start: getTime('9', '00'),
                        end: getTime('10', '00')
                    };
                    const subtractiveRange = {
                        start: getTime('8', '00'),
                        end: getTime('11', '00')
                    };
                    const aRange = [
                        baseRange
                    ];
                    const bRange = [
                        subtractiveRange
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractTimeRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });

            describe('and a subtractive range with an equal start and an end that is later than the base range', () => {
                it('should subtract the subtractive range from the base range', () => {
                    const baseRange = {
                        start: getTime('9', '00'),
                        end: getTime('10', '00')
                    };
                    const subtractiveRange = {
                        start: getTime('9', '00'),
                        end: getTime('10', '30')
                    };
                    const aRange = [
                        baseRange
                    ];
                    const bRange = [
                        subtractiveRange
                    ];
                    const expectedOutput = [];

                    const actualOutput = subtractTimeRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });
        });
    });

    describe('Partially subtractive', () => {
        describe('Given a base range', () => {
            describe('and a subtractive range with an earlier start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const subtractiveRange = {
                            start: getTime('8', '00'),
                            end: getTime('9', '30')
                        };
                        const aRange = [
                            baseRange
                        ];
                        const bRange = [
                            subtractiveRange
                        ];
                        const expectedOutput = [
                            {
                                start: getTime('9', '30'),
                                end: getTime('10', '00')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });
            });

            describe('and a subtractive range with an equal start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const subtractiveRange = {
                            start: getTime('9', '00'),
                            end: getTime('9', '30')
                        };
                        const aRange = [
                            baseRange
                        ];
                        const bRange = [
                            subtractiveRange
                        ];
                        const expectedOutput = [
                            {
                                start: getTime('9', '30'),
                                end: getTime('10', '00')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });
            });

            describe('and a subtractive range with a later start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should result in multiple outputs with the subtractive range removed from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const subtractiveRange = {
                            start: getTime('9', '30'),
                            end: getTime('9', '45')
                        };
                        const aRange = [
                            baseRange
                        ];
                        const bRange = [
                            subtractiveRange
                        ];
                        const expectedOutput = [
                            {
                                start: getTime('9', '00'),
                                end: getTime('9', '30')
                            },
                            {
                                start: getTime('9', '45'),
                                end: getTime('10', '00')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });

                describe('and an end that is later than the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const subtractiveRange = {
                            start: getTime('9', '30'),
                            end: getTime('10', '45')
                        };
                        const aRange = [
                            baseRange
                        ];
                        const bRange = [
                            subtractiveRange
                        ];
                        const expectedOutput = [
                            {
                                start: getTime('9', '00'),
                                end: getTime('9', '30')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });
            });
        });

        describe('Given multiple base ranges', () => {
            describe('and a subtractive range with an earlier start', () => {
                describe('and an end that falls within the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const anotherBaseRange = {
                            start: getTime('11', '00'),
                            end: getTime('14', '00')
                        };
                        const aRange = [
                            baseRange,
                            anotherBaseRange
                        ];

                        const subtractiveRange = {
                            start: getTime('8', '00'),
                            end: getTime('9', '15')
                        };
                        const anotherSubtractiveRange = {
                            start: getTime('11', '00'),
                            end: getTime('18', '00')
                        };
                        const bRange = [
                            subtractiveRange,
                            anotherSubtractiveRange
                        ];

                        const expectedOutput = [
                            {
                                start: getTime('9', '15'),
                                end: getTime('10', '00')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });

                describe('and an end that is after the base range', () => {
                    it('should subtract the subtractive range from the base range', () => {
                        const baseRange = {
                            start: getTime('9', '00'),
                            end: getTime('10', '00')
                        };
                        const anotherBaseRange = {
                            start: getTime('11', '00'),
                            end: getTime('14', '00')
                        };
                        const aRange = [
                            baseRange,
                            anotherBaseRange
                        ];

                        const subtractiveRange = {
                            start: getTime('9', '30'),
                            end: getTime('9', '45')
                        };
                        const anotherSubtractiveRange = {
                            start: getTime('10', '15'),
                            end: getTime('18', '00')
                        };
                        const bRange = [
                            subtractiveRange,
                            anotherSubtractiveRange
                        ];

                        const expectedOutput = [
                            {
                                start: getTime('9', '00'),
                                end: getTime('9', '30')
                            },
                            {
                                start: getTime('9', '45'),
                                end: getTime('10', '00')
                            }
                        ];

                        const actualOutput = subtractTimeRanges(aRange, bRange);

                        expect(actualOutput).toEqual(expectedOutput);
                    });
                });

                it('should sort the results', () => {
                    const baseRange = {
                        start: getTime(21, 0),
                        end: getTime(22, 0)
                    };
                    const anotherBaseRange = {
                        start: getTime(7, 0),
                        end: getTime(8, 0)
                    };
                    const yetAnotherBaseRange = {
                        start: getTime(23, 0),
                        end: getTime(23, 30)
                    };
                    const aRange = [
                        baseRange,
                        anotherBaseRange,
                        yetAnotherBaseRange
                    ];

                    const subtractiveRange = {
                        start: getTime(7, 45),
                        end: getTime(21, 30)
                    };
                    const bRange = [
                        subtractiveRange
                    ];

                    const expectedOutput = [
                        {
                            start: getTime(7, 0),
                            end: getTime(7, 45)
                        },
                        {
                            start: getTime(21, 30),
                            end: getTime(22, 0)
                        },
                        {
                            start: getTime(23, 0),
                            end: getTime(23, 30)
                        }
                    ];

                    const actualOutput = subtractTimeRanges(aRange, bRange);

                    expect(actualOutput).toEqual(expectedOutput);
                });
            });
        });
    });
});
