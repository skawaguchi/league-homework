import Chance from 'chance';
import sinon from 'sinon';
import { parseList } from '../../src/list-parser';

import * as rangeParser from '../../src/range-parser';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('List Parser', () => {
    let baseList;
    let subtractiveList;
    let rangeInputMock;
    let parseRangeStub;

    beforeEach(() => {
        const someStartRange = chance.word();
        const someEndRange = chance.word();

        baseList = `(${someStartRange})`;
        subtractiveList = `(${someEndRange})`;

        rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

        parseRangeStub = sandbox.stub(rangeParser, 'parseRange');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should transform a list string to ranges', () => {
        parseList(rangeInputMock);

        sinon.assert.calledWithExactly(parseRangeStub, baseList);
        sinon.assert.calledWithExactly(parseRangeStub, subtractiveList);
    });

    it('should extract the two lists of ranges', () => {
        const rangeMock = chance.word();
        const expectedRusult = {
            baseList: rangeMock,
            subtractiveList: rangeMock
        };

        parseRangeStub.returns(rangeMock);

        const actualResult = parseList(rangeInputMock);

        expect(actualResult).toEqual(expectedRusult);
    });
});
