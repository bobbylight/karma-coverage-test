import UtilService from './util.service';

export default class TestController {

    constructor(private UtilService: UtilService) {
    }

    returnFive(doIt: boolean): number {
        return this.UtilService.returnFive(doIt);
    }
}

angular.module('testMod').controller('TestController', TestController);
