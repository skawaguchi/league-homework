import { APPLY_TEST_EXAMPLE } from '../../../src/actions/list';

import * as actions from '../../../src/actions/test-examples';

describe('Test Example Actions', () => {
    describe('When a test example is applied', () => {
        it('should dispatch the example base text and subtractive text', () => {
            const baseText = 'base text';
            const subtractiveText = 'subtractive text';
            const action = actions.applyTestExample(baseText, subtractiveText);

            expect(action.type).toBe(APPLY_TEST_EXAMPLE);
            expect(action.payload.baseRangeText).toBe(baseText);
            expect(action.payload.subtractiveRangeText).toBe(subtractiveText);
        });
    });
});
