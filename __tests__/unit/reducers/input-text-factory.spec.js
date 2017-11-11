import Chance from 'chance';
import {
    APPLY_TEST_EXAMPLE,
    UPDATE_TEXT
} from '../../../src/actions/list';
import { makeReducer } from '../../../src/reducers/input-text-factory';

const chance = new Chance();

describe('Text Input Reducer', () => {
    const initialState = '';
    let actionMock;
    let reducedState;
    let reducer;
    let target;

    beforeEach(() => {
        target = chance.pickone(['baseRangeText', 'subtractiveRangeText']);
        reducer = makeReducer(target);
    });

    it('should return the default state if the provided state is undefined', () => {
        reducedState = reducer(undefined, {});

        expect(reducedState).toBe('');
    });

    it('should return the provided state if action type is not handled', () => {
        reducedState = reducer(initialState, {
            type: 'SOME_FAKE_ACTION'
        });

        expect(reducedState).toBe(initialState);
    });

    it('should update the targeted text', () => {
        actionMock = {
            payload: {
                target,
                text: 'some text'
            },
            type: UPDATE_TEXT
        };

        reducedState = reducer(initialState, actionMock);

        expect(reducedState).toBe(actionMock.payload.text);
    });

    it('should return start if the target does not match', () => {
        actionMock = {
            payload: {
                target: 'some other target',
                text: 'some text'
            },
            type: UPDATE_TEXT
        };

        reducedState = reducer(initialState, actionMock);

        expect(reducedState).toBe(initialState);
    });

    it('should apply the example text', () => {
        const textMock = 'some text';
        actionMock = {
            payload: {
                [target]: textMock
            },
            type: APPLY_TEST_EXAMPLE
        };

        reducedState = reducer(initialState, actionMock);

        expect(reducedState).toBe(textMock);
    });
});
