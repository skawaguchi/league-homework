import Chance from 'chance';
import sinon from 'sinon';

import { parseTimeRangeInput } from '../../../src/commands/parse-time-range-input';

import * as inputAdapter from '../../../src/adapters/input-adapter';
import * as timeRangeSubtractor from '../../../src/services/subtract-time-ranges';
import * as timeRangeCombiner from '../../../src/services/combine-time-ranges';
import * as outputAdapter from '../../../src/adapters/output-adapter';

const sandbox = sinon.sandbox.create();
const chance = new Chance();

describe('Time Range Parser', () => {
    let adaptInputStub;
    let timeRangeCombinerStub;
    let timeRangeSubtractorStub;
    let adaptOuputStub;

    beforeEach(() => {
        adaptInputStub = sandbox.stub(inputAdapter, 'adaptInput');
        timeRangeCombinerStub = sandbox.stub(timeRangeCombiner, 'combineTimeRanges');
        timeRangeSubtractorStub = sandbox.stub(timeRangeSubtractor, 'subtractTimeRanges');
        adaptOuputStub = sandbox.stub(outputAdapter, 'adaptOutput');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given a base list of time ranges and a subtractive list of time ranges', () => {
        it('should parse the list', () => {
            const inputString = chance.word();
            const timeRangeResponseMock = {
                baseList: chance.word(),
                subtractiveList: chance.word()
            };
            const timeRangeCombinerResponseMock = chance.word();
            const timeRangeSubtractorResponseMock = chance.word();

            adaptInputStub.returns(timeRangeResponseMock);
            timeRangeSubtractorStub.returns(timeRangeSubtractorResponseMock);
            timeRangeCombinerStub.returns(timeRangeCombinerResponseMock);

            const outputMock = chance.word();

            adaptOuputStub.returns(outputMock);

            const actualResult = parseTimeRangeInput(inputString);

            sinon.assert.calledWithExactly(adaptInputStub, inputString);
            sinon.assert.calledWithExactly(
                timeRangeSubtractorStub,
                timeRangeResponseMock.baseList,
                timeRangeResponseMock.subtractiveList
            );
            sinon.assert.calledWithExactly(timeRangeCombinerStub, timeRangeSubtractorResponseMock);
            sinon.assert.calledWithExactly(adaptOuputStub, timeRangeCombinerResponseMock);

            expect(actualResult).toEqual(outputMock);
        });
    });
});
