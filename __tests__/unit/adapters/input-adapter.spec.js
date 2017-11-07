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
        const someStartRange = '9:00-10:00';
        const someEndRange = '9:30-11:00';

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

    it('should strip whitespace', () => {
        const someStartRange = '9  :    0 0  - 1  0 :   0  0 ';
        const someEndRange = '9:30-11:00';

        baseList = `(  ${someStartRange}  )`;
        subtractiveList = `(${someEndRange})`;

        rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

        const expectedResult = {
            baseList: '(9:00-10:00)',
            subtractiveList: '(9:30-11:00)'
        };

        adaptInput(rangeInputMock);

        sinon.assert.calledWithExactly(adaptTimeRangeStub, expectedResult.baseList);
        sinon.assert.calledWithExactly(adaptTimeRangeStub, expectedResult.subtractiveList);
    });

    describe('Given a string with no dash', () => {
        it('should throw an error', () => {
            baseList = '(9:0)';
            subtractiveList = '(2:00-14:00)';

            rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

            expect(() => adaptInput(rangeInputMock)).toThrowError();
        });
    });

    describe('Given a string with a missing time range', () => {
        it('should throw an error', () => {
            baseList = '(9:00)';
            subtractiveList = '(2:00-14:00)';

            rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

            expect(() => adaptInput(rangeInputMock)).toThrowError();
        });

        it('should throw an error', () => {
            baseList = '(9:00-)';
            subtractiveList = '(2:00-14:00)';

            rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

            expect(() => adaptInput(rangeInputMock)).toThrowError();
        });
    });

    describe('Given a string with a missing parenthesis', () => {
        it('should throw an error', () => {
            baseList = '9:00-9:00)';
            subtractiveList = '(2:00-14:00)';

            rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

            expect(() => adaptInput(rangeInputMock)).toThrowError();

            baseList = '(9:0-9:00';
            subtractiveList = '(2:00-14:00)';

            rangeInputMock = `${baseList} "minus" ${subtractiveList}`;

            expect(() => adaptInput(rangeInputMock)).toThrowError();
        });
    });
});
