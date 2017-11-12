import {
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../../../src/actions/list';
import reducer from '../../../src/reducers/has-errors';

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

    describe('Given valid text', () => {
        it('should not an error', () => {
            actionMock = {
                type: UPDATE_TEXT
            };

            reducedState = reducer(initialState, actionMock);

            expect(reducedState).toEqual(false);
        });
    });

    describe('Given a text error', () => {
        it('should show an error', () => {
            actionMock = {
                type: UPDATE_TEXT_ERROR
            };

            reducedState = reducer(initialState, actionMock);

            expect(reducedState).toEqual(true);
        });
    });
});
