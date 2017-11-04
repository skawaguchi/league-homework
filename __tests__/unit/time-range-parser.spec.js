import Chance from 'chance';
import sinon from 'sinon';

import { parseInput } from '../../src/time-range-parser';

import * as listParser from '../../src/list-parser';
import * as timeRangeSubtractor from '../../src/time-range-subtractor';
import * as outputParser from '../../src/output-parser';

const sandbox = sinon.sandbox.create();
const chance = new Chance();

describe('Time Range Parser', () => {
    let parseListStub;
    let timeRangeSubtractorStub;
    let outputParserStub;

    beforeEach(() => {
        parseListStub = sandbox.stub(listParser, 'parseList');
        timeRangeSubtractorStub = sandbox.stub(timeRangeSubtractor, 'subtractRanges');
        outputParserStub = sandbox.stub(outputParser, 'parseRange');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given a base list of time ranges and a subtractive list of time ranges', () => {
        it('should parse the list', () => {
            const inputString = chance.word();
            const timeRangeResponseMock = {
                aList: chance.word(),
                bList: chance.word()
            };
            const timeRangeSubtractorResponseMock = chance.word();

            parseListStub.returns(timeRangeResponseMock);
            timeRangeSubtractorStub.returns(timeRangeSubtractorResponseMock);

            const outputMock = chance.word();

            outputParserStub.returns(outputMock);

            const actualResult = parseInput(inputString);

            sinon.assert.calledWithExactly(parseListStub, inputString);
            sinon.assert.calledWithExactly(
                timeRangeSubtractorStub,
                timeRangeResponseMock.aList,
                timeRangeResponseMock.bList
            );
            sinon.assert.calledWithExactly(outputParserStub, timeRangeSubtractorResponseMock);

            expect(actualResult).toEqual(outputMock);
        });
    });
});
