import Chance from 'chance';
import sinon from 'sinon';
import { adaptInput } from '../../../src/adapters/input-adapter';

import * as timeRangeAdapter from '../../../src/adapters/time-range-adapter';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

describe('Input Adapter', () => {
    let baseList;
    let subtractiveList;
    let rangeInputMock;
    let adaptTimeRangeStub;

    beforeEach(() => {
        const someStartRange = chance.word();
        const someEndRange = chance.word();

        baseList = `(${someStartRange})`;
        subtractiveList = `(${someEndRange})`;

        rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

        adaptTimeRangeStub = sandbox.stub(timeRangeAdapter, 'adaptTimeRange');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should transform a list string to ranges', () => {
        adaptInput(rangeInputMock);

        sinon.assert.calledWithExactly(adaptTimeRangeStub, baseList);
        sinon.assert.calledWithExactly(adaptTimeRangeStub, subtractiveList);
    });

    it('should extract the two lists of ranges', () => {
        const rangeMock = chance.word();
        const expectedRusult = {
            baseList: rangeMock,
            subtractiveList: rangeMock
        };

        adaptTimeRangeStub.returns(rangeMock);

        const actualResult = adaptInput(rangeInputMock);

        expect(actualResult).toEqual(expectedRusult);
    });
});
