import Chance from 'chance';
import sinon from 'sinon';
import { parseList } from '../../src/list-parser';

import * as rangeParser from '../../src/range-parser';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('List Parser', () => {
    let aList;
    let bList;
    let rangeInputMock;
    let parseRangeStub;

    beforeEach(() => {
        const someStartRange = chance.word();
        const someEndRange = chance.word();

        aList = `(${someStartRange})`;
        bList = `(${someEndRange})`;

        rangeInputMock = `${aList} "minus" ${bList}`;

        parseRangeStub = sandbox.stub(rangeParser, 'parseRange');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should transform a list string to ranges', () => {
        parseList(rangeInputMock);

        sinon.assert.calledWithExactly(parseRangeStub, aList);
        sinon.assert.calledWithExactly(parseRangeStub, bList);
    });

    it('should extract the two lists of ranges', () => {
        const rangeMock = chance.word();
        const expectedRusult = {
            aList: rangeMock,
            bList: rangeMock
        };

        parseRangeStub.returns(rangeMock);

        const actualResult = parseList(rangeInputMock);

        expect(actualResult).toEqual(expectedRusult);
    });
});
