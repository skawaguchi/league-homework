import Chance from 'chance';
import sinon from 'sinon';
import {
    APPLY_TEST_EXAMPLE,
    CALCULATE,
    UPDATE_TEXT
} from '../../../src/actions/list';
import reducer from '../../../src/reducers/calculated-text';

import { testRanges } from '../../../src/state/constants';
import * as commands from '../../../src/commands/parse-time-range-input';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('Calculated Text Reducer', () => {
    let actionMock;
    let initialState;
    let firstInput;
    let reducedState;
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
        commandStub.returns(commandResultMock);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the default state if the provided state is undefined', () => {
        reducedState = reducer(undefined, {});

        expect(reducedState).toEqual(initialState);

        sinon.assert.calledWithExactly(commandStub, firstInput);
    });

    it('should return the provided state if action type is not handled', () => {
        reducedState = reducer(initialState, {
            type: 'SOME_FAKE_ACTION'
        });

        expect(reducedState).toEqual(initialState);

        sinon.assert.calledWithExactly(commandStub, firstInput);
    });

    it('should update the base range text text', () => {
        const target = 'baseRangeText';
        const textMock = 'some text';

        actionMock = {
            payload: {
                target,
                text: textMock
            },
            type: UPDATE_TEXT
        };

        reducedState = reducer(initialState, actionMock);

        const expectedInput = `(${textMock}) "minus" (${initialState.subtractiveRangeText})`;

        sinon.assert.calledWithExactly(commandStub, expectedInput);

        const expectedState = {
            baseRangeText: textMock,
            subtractiveRangeText: initialState.subtractiveRangeText,
            outputText: commandResultMock
        };

        expect(reducedState).toEqual(expectedState);
    });

    it('should update the subtractive range text text', () => {
        const target = 'subtractiveRangeText';
        const textMock = 'some text';

        actionMock = {
            payload: {
                target,
                text: textMock
            },
            type: UPDATE_TEXT
        };

        reducedState = reducer(initialState, actionMock);

        const expectedInput = `(${initialState.baseRangeText}) "minus" (${textMock})`;

        sinon.assert.calledWithExactly(commandStub, expectedInput);

        const expectedState = {
            baseRangeText: initialState.baseRangeText,
            subtractiveRangeText: textMock,
            outputText: commandResultMock
        };

        expect(reducedState).toEqual(expectedState);
    });

    it('should apply the example text', () => {
        const baseRangeText = 'some text';
        const subtractiveRangeText = 'some text';
        actionMock = {
            payload: {
                baseRangeText,
                subtractiveRangeText
            },
            type: APPLY_TEST_EXAMPLE
        };

        reducedState = reducer(initialState, actionMock);

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
