import Util from './util';

export default class Test {

    constructor(private Util: Util) {
    }

    returnFive(doIt: boolean): number {
        return this.Util.returnFive(doIt);
    }
}

angular.module('testMod').controller('test', Test);
