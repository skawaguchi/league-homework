import { APPLY_TEST_EXAMPLE } from '../../../src/actions/list';

import * as actions from '../../../src/actions/test-examples';

describe('Test Example Actions', () => {
    describe('When a test example is applied', () => {
        it('should dispatch the example base text and subtractive text', () => {
            const baseRangeText = 'base text';
            const subtractiveRangeText = 'subtractive text';
            const action = actions.applyTestExample(baseRangeText, subtractiveRangeText);

            expect(action.type).toBe(APPLY_TEST_EXAMPLE);
            expect(action.payload.baseRangeText).toBe(baseRangeText);
            expect(action.payload.subtractiveRangeText).toBe(subtractiveRangeText);
        });
    });
});
