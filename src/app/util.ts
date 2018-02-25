export default class Util {
    
    returnFive(b: boolean): number {
        return b ? 5 : 0;
    }
};

angular.module('testMod').service('util', Util);
