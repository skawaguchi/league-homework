import sinon from 'sinon';
import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../../../src/actions/list';
import reducer from '../../../src/reducers/calculated-text';

import { testRanges } from '../../../src/state/constants';
import * as commands from '../../../src/commands/parse-time-range-input';

const sandbox = sinon.sandbox.create();

describe('Calculated Text Reducer', () => {
    let actionMock;
    let initialState;
    let firstInput;
    let commandStub;
    let commandResultMock;

    const firstIndex = 0;
    const firstRange = testRanges[firstIndex];

    beforeEach(() => {
        firstInput = `(${firstRange.baseRangeText}) "minus" (${firstRange.subtractiveRangeText})`;

        commandResultMock = '(some base range text)';

        initialState = {
            baseRangeText: firstRange.baseRangeText,
            subtractiveRangeText: firstRange.subtractiveRangeText,
            outputText: commandResultMock
        };

        commandStub = sandbox.stub(commands, 'parseTimeRangeInput');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given valid example text to apply', () => {
        beforeEach(() => {
            commandStub.returns(commandResultMock);
        });

        it('should return the default state if the provided state is undefined', () => {
            const reducedState = reducer(undefined, {});

            expect(reducedState).toEqual(initialState);

            sinon.assert.calledWithExactly(commandStub, firstInput);
        });

        it('should return the provided state if action type is not handled', () => {
            const reducedState = reducer(initialState, {
                type: 'SOME_FAKE_ACTION'
            });

            expect(reducedState).toEqual(initialState);

            sinon.assert.calledWithExactly(commandStub, firstInput);
        });

        describe('Given valid text', () => {
            it('should update the text', () => {
                const baseRangeText = 'some base text';
                const outputText = 'some output text';
                const subtractiveRangeText = 'some subtractive text';

                actionMock = {
                    payload: {
                        baseRangeText,
                        outputText,
                        subtractiveRangeText
                    },
                    type: UPDATE_TEXT
                };

                const reducedState = reducer(initialState, actionMock);

                const expectedState = {
                    baseRangeText,
                    outputText,
                    subtractiveRangeText
                };

                expect(reducedState).toEqual(expectedState);
            });
        });

        describe('Given invalid text', () => {
            it('should update the text', () => {
                const baseRangeText = 'some base text';
                const outputText = 'some error text';
                const subtractiveRangeText = 'some subtractive text';

                actionMock = {
                    payload: {
                        baseRangeText,
                        outputText,
                        subtractiveRangeText
                    },
                    type: UPDATE_TEXT_ERROR
                };

                const reducedState = reducer(initialState, actionMock);

                const expectedState = {
                    baseRangeText,
                    outputText,
                    subtractiveRangeText
                };

                expect(reducedState).toEqual(expectedState);
            });
        });

        it('should apply the example text', () => {
            const baseRangeText = 'some good base text';
            const subtractiveRangeText = 'some good subtractive text';
            actionMock = {
                payload: {
                    baseRangeText,
                    subtractiveRangeText
                },
                type: APPLY_TEST_EXAMPLE
            };

            const reducedState = reducer(initialState, actionMock);

            const expectedInput = `(${baseRangeText}) "minus" (${subtractiveRangeText})`;

            sinon.assert.calledWithExactly(commandStub, expectedInput);

            const expectedState = {
                baseRangeText,
                subtractiveRangeText,
                outputText: commandResultMock
            };

            expect(reducedState).toEqual(expectedState);
        });
    });

    describe('Given invalid example text to apply', () => {
        it('should output the error message', () => {
            const baseRangeText = 'some base text';
            const subtractiveRangeText = 'some subtractive text';
            const errorMock = 'some error';

            actionMock = {
                payload: {
                    baseRangeText,
                    subtractiveRangeText
                },
                type: APPLY_TEST_EXAMPLE
            };

            commandStub.throws(errorMock);

            const reducerFn = () => reducer(initialState, actionMock);

            expect(reducerFn).toThrow();
        });

        it('should set the input text', () => {
            const baseRangeText = 'some base text';
            const subtractiveRangeText = 'some subtractive text';
            const errorMock = 'some error';

            actionMock = {
                payload: {
                    baseRangeText,
                    subtractiveRangeText
                },
                type: APPLY_TEST_EXAMPLE
            };

            commandStub.onCall(0).returns(commandResultMock);
            commandStub.onCall(1).throws(new Error(errorMock));

            const reducedState = reducer(initialState, actionMock);

            const expectedState = {
                baseRangeText,
                outputText: errorMock,
                subtractiveRangeText
            };

            expect(reducedState).toEqual(expectedState);
        });
    });
});
