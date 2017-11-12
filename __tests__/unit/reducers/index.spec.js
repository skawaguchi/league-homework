import * as indexReducers from '../../../src/reducers';

import calculatedText from '../../../src/reducers/calculated-text';
import hasErrors from '../../../src/reducers/has-errors';

describe('Reducers index', () => {
    it(`should expose the calculated text reducer`, () => {
        expect(indexReducers.calculatedText).toEqual(calculatedText);
    });

    it(`should expose the calculated text reducer`, () => {
        expect(indexReducers.hasErrors).toEqual(hasErrors);
    });
});
