import Chance from 'chance';
import {
    UPDATE_ERROR
} from '../../../src/actions/list';
import reducer from '../../../src/reducers/has-errors';

const chance = new Chance();

describe('Errors Reducer', () => {
    let actionMock;
    let initialState;
    let reducedState;

    beforeEach(() => {
        initialState = false;
    });

    it('should return the default state if the provided state is undefined', () => {
        reducedState = reducer(undefined, {});

        expect(reducedState).toEqual(initialState);
    });

    it('should return the provided state if action type is not handled', () => {
        reducedState = reducer(initialState, {
            type: 'SOME_FAKE_ACTION'
        });

        expect(reducedState).toEqual(initialState);
    });

    it('should update the error state', () => {
        const payload = chance.bool();

        actionMock = {
            payload,
            type: UPDATE_ERROR
        };

        reducedState = reducer(initialState, actionMock);

        expect(reducedState).toEqual(payload);
    });
});
