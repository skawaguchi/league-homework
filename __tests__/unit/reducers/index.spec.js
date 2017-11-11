import * as indexReducers from '../../../src/reducers';

import calculatedTextReducer from '../../../src/reducers/calculated-text';
import hasErrorsReducer from '../../../src/reducers/has-errors';

describe('Reducers index', () => {
    it(`should expose the calculated text reducer`, () => {
        expect(indexReducers.calculatedTextReducer).toEqual(calculatedTextReducer);
    });

    it(`should expose the calculated text reducer`, () => {
        expect(indexReducers.hasErrorsReducer).toEqual(hasErrorsReducer);
    });
});
