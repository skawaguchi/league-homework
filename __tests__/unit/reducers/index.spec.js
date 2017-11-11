import * as indexReducers from '../../../src/reducers';

describe('Reducers index', () => {
    it(`should expose the base range text reducer`, () => {
        expect(indexReducers.baseRangeText).toEqual(expect.any(Function));
    });

    it(`should expose the subtractive range text reducer`, () => {
        expect(indexReducers.subtractiveRangeText).toEqual(expect.any(Function));
    });
});
