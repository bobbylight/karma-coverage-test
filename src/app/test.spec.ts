import Test from './test';

describe('test', () => {

    // load the module
    beforeEach(angular.mock.module('testMod'));

    it('returnFive() should return 5', angular.mock.inject((test: Test) => {
        console.error('>>> >>> ' + test.returnFive(true));
        expect(test.returnFive(true)).toBe(5);
    }));
});