import Chance from 'chance';
import sinon from 'sinon';
import {
    UPDATE_TEXT,
    UPDATE_TEXT_ERROR
} from '../../../src/actions/list';

import { updateText } from '../../../src/actions/text-input';
import * as parseInputMethods from '../../../src/commands/parse-time-range-input';

const sandbox = sinon.sandbox.create();
const chance = new Chance();

describe('Text Input Actions', () => {
    let dispatchStub;
    let parseInputStub;
    let stateMock;

    beforeEach(() => {
        dispatchStub = sandbox.stub();

        stateMock = {
            calculatedText: {
                baseRangeText: 'initial base range text',
                outputText: 'initial output text',
                subtractiveRangeText: 'initial subtractive text'
            }
        };

        parseInputStub = sandbox.stub(parseInputMethods, 'parseTimeRangeInput');
    });

    afterEach(() => {
        parseInputStub.restore();
    });

    const getStateMock = () => stateMock;

    const testTextInputSuccess = (target, otherTarget) => {
        it('should dispatch the text input', () => {
            const text = 'some text';
            const outputText = 'some output';
            const otherText = stateMock.calculatedText[otherTarget];

            parseInputStub.returns(outputText);

            updateText(target, text)(dispatchStub, getStateMock);

            const dispatchedAction = dispatchStub.getCall(0).args[0];

            expect(dispatchedAction.type).toBe(UPDATE_TEXT);
            expect(dispatchedAction.payload[target]).toBe(text);
            expect(dispatchedAction.payload[otherTarget]).toBe(otherText);
            expect(dispatchedAction.payload.outputText).toBe(outputText);
        });
    };

    const testTextInputFailure = (target, otherTarget) => {
        it('should dispatch the text input with the error message as the output', () => {
            const text = 'some text';
            const errorText = 'some error';
            const otherText = stateMock.calculatedText[otherTarget];

            parseInputStub.throws(new Error(errorText));

            updateText(target, text)(dispatchStub, getStateMock);

            const dispatchedAction = dispatchStub.getCall(0).args[0];

            expect(dispatchedAction.type).toBe(UPDATE_TEXT_ERROR);
            expect(dispatchedAction.payload[target]).toBe(text);
            expect(dispatchedAction.payload[otherTarget]).toBe(otherText);
            expect(dispatchedAction.payload.outputText).toBe(errorText);
        });
    };

    describe('When a text input is changed', () => {
        describe('and it is valid base range input', () => {
            testTextInputSuccess('baseRangeText', 'subtractiveRangeText');
        });

        describe('and it is valid subtractive range input', () => {
            testTextInputSuccess('subtractiveRangeText', 'baseRangeText');
        });

        describe('and it is invalid base range input', () => {
            testTextInputFailure('baseRangeText', 'subtractiveRangeText');
        });

        describe('and it is invalid subtractive range input', () => {
            testTextInputFailure('baseRangeText', 'subtractiveRangeText');
        });
    });
});
