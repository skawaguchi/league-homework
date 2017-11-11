import Chance from 'chance';
import { UPDATE_TEXT } from '../../../src/actions/list';

import { updateText } from '../../../src/actions/text-input';

const chance = new Chance();

describe('Text Input Actions', () => {
    describe('When a text input is changed', () => {
        it('should dispatch the text input', () => {
            const target = chance.pickone(['baseRangeText', 'subtractiveRangeText'])
            const text = 'some text';
            const action = updateText(target, text);

            expect(action.type).toBe(UPDATE_TEXT);
            expect(action.payload.target).toBe(target);
            expect(action.payload.text).toBe(text);
        });
    });
});
